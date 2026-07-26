// Shared conversion between blog Markdown documents and the block structure
// consumed by blog.html (data/blog.json).
//
// Body block vocabulary (see blog.html renderBlock):
//   "text"                                  paragraph
//   { h3 }                                  section heading
//   { list: [...] }                         bullet list
//   { callout }                             highlighted aside
//   { code }                                preformatted block
//   { image, alt?, caption?, width? }       centered figure
//   { download, label?, filename?, size? }  download button
//
// Markdown mapping (bijective):
//   paragraph                     plain text, blank-line separated; internal
//                                 newlines allowed (consecutive lines)
//   ### Heading                   h3
//   - item                        list (adjacent items form one block)
//   > line                        callout (multi-line joins with \n)
//   ```\n...\n```                 code
//   ![alt](src "caption")         image; optional {width=...} suffix
//   [download: label | filename | size](url)   download button
//
// Paragraph lines that would parse as one of the above are escaped with a
// leading backslash on serialize and unescaped on parse.

const FRONTMATTER_KEYS = ['title', 'date', 'author', 'tags', 'summary'];

const needsEscape = (line) =>
  /^(#{1,6} |- |> |!\[|\[download: |```|\\)/.test(line);

// An empty line inside a paragraph serializes as a lone backslash so the
// paragraph is not split in two on parse.
const escapeLine = (line) => {
  if (line === '') return '\\';
  return needsEscape(line) ? '\\' + line : line;
};
const unescapeLine = (line) => {
  if (line === '\\') return '';
  return line.startsWith('\\') && needsEscape(line.slice(1)) ? line.slice(1) : line;
};

const quoteYaml = (value) => {
  const str = String(value ?? '');
  if (str === '' || /[:#\[\]{}&*!|>'"%@`,\n]|^\s|\s$|^-|^\?/.test(str)) {
    return JSON.stringify(str);
  }
  return str;
};

export function serializePost(post) {
  const lines = ['---'];
  for (const key of FRONTMATTER_KEYS) {
    const value = post[key];
    if (value === undefined || value === null) continue;
    if (key === 'tags') {
      lines.push('tags:');
      for (const tag of value) lines.push(`  - ${quoteYaml(tag)}`);
    } else {
      lines.push(`${key}: ${quoteYaml(value)}`);
    }
  }
  lines.push('---', '');

  const blocks = (post.body || []).map(serializeBlock);
  lines.push(blocks.join('\n\n'));
  return lines.join('\n') + '\n';
}

function serializeBlock(block) {
  if (typeof block === 'string') {
    return block.split('\n').map(escapeLine).join('\n');
  }
  if (block.h3 !== undefined) return `### ${block.h3}`;
  if (Array.isArray(block.list)) {
    return block.list.map((item) => `- ${item}`).join('\n');
  }
  if (block.callout !== undefined) {
    return block.callout.split('\n').map((line) => `> ${line}`).join('\n');
  }
  if (block.code !== undefined) {
    return '```\n' + block.code + '\n```';
  }
  if (block.download !== undefined) {
    const label = block.label ?? '';
    const filename = block.filename ?? '';
    const size = block.size ?? '';
    return `[download: ${label} | ${filename} | ${size}](${block.download})`;
  }
  if (block.image !== undefined) {
    let line = `![${block.alt ?? ''}](${block.image}`;
    if (block.caption !== undefined) line += ` "${block.caption.replace(/"/g, '\\"')}"`;
    line += ')';
    if (block.width !== undefined) line += ` {width=${block.width}}`;
    return line;
  }
  throw new Error(`Unknown block shape: ${JSON.stringify(block)}`);
}

export function parsePost(markdown) {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) throw new Error('Missing frontmatter');
  const post = parseFrontmatter(match[1]);
  post.body = parseBody(normalized.slice(match[0].length));
  return post;
}

function parseFrontmatter(source) {
  const post = {};
  let currentListKey = null;
  for (const rawLine of source.split('\n')) {
    if (!rawLine.trim()) continue;
    const listItem = rawLine.match(/^\s+-\s(.*)$/);
    if (listItem && currentListKey) {
      post[currentListKey].push(parseYamlScalar(listItem[1]));
      continue;
    }
    const pair = rawLine.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!pair) throw new Error(`Bad frontmatter line: ${rawLine}`);
    const [, key, rest] = pair;
    if (rest === '') {
      post[key] = [];
      currentListKey = key;
    } else {
      post[key] = parseYamlScalar(rest);
      currentListKey = null;
    }
  }
  return post;
}

function parseYamlScalar(value) {
  const trimmed = value.trim();
  if (/^".*"$/.test(trimmed)) return JSON.parse(trimmed);
  if (/^'.*'$/.test(trimmed)) return trimmed.slice(1, -1).replace(/''/g, "'");
  return trimmed;
}

function parseBody(source) {
  const lines = source.split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const code = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push({ code: code.join('\n') });
      continue;
    }

    if (/^### /.test(line)) {
      blocks.push({ h3: line.slice(4) });
      index += 1;
      continue;
    }

    if (/^- /.test(line)) {
      const list = [];
      while (index < lines.length && /^- /.test(lines[index])) {
        list.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push({ list });
      continue;
    }

    if (/^> ?/.test(line)) {
      const callout = [];
      while (index < lines.length && /^> ?/.test(lines[index])) {
        callout.push(lines[index].replace(/^> ?/, ''));
        index += 1;
      }
      blocks.push({ callout: callout.join('\n') });
      continue;
    }

    const download = line.match(/^\[download: (.*)\]\(([^)]+)\)\s*$/);
    if (download) {
      const [label, filename, size] = download[1].split(' | ').map((part) => part.trim());
      const block = { download: download[2] };
      if (label) block.label = label;
      if (filename) block.filename = filename;
      if (size) block.size = size;
      blocks.push(block);
      index += 1;
      continue;
    }

    const image = line.match(
      /^!\[([^\]]*)\]\(([^)"]+?)(?:\s+"((?:[^"\\]|\\.)*)")?\)(?:\s*\{width=([^}]+)\})?\s*$/
    );
    if (image) {
      const block = { image: image[2] };
      if (image[1]) block.alt = image[1];
      if (image[3] !== undefined) block.caption = image[3].replace(/\\"/g, '"');
      if (image[4] !== undefined) {
        const width = Number(image[4]);
        block.width = Number.isNaN(width) ? image[4] : width;
      }
      blocks.push(block);
      index += 1;
      continue;
    }

    // Paragraph: consecutive non-blank lines that are not another block type.
    const paragraph = [];
    while (index < lines.length && lines[index].trim() && startsParagraphLine(lines[index])) {
      paragraph.push(unescapeLine(lines[index]));
      index += 1;
    }
    if (paragraph.length) {
      blocks.push(paragraph.join('\n'));
    } else {
      // Defensive: unrecognized structural line, keep it as text.
      blocks.push(unescapeLine(line));
      index += 1;
    }
  }

  return blocks;
}

function startsParagraphLine(line) {
  return !(
    /^### /.test(line) ||
    /^- /.test(line) ||
    /^> ?/.test(line) ||
    line.startsWith('```') ||
    /^\[download: .*\]\([^)]+\)\s*$/.test(line) ||
    /^!\[[^\]]*\]\([^)]+\)/.test(line)
  );
}
