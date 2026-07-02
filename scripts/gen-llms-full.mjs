// Generates static/llms-full.txt: the entire docs content concatenated into
// one file so an AI agent can ingest the whole site in a single fetch.
// Runs before `docusaurus build` (see the "prebuild" npm script), so it is
// always current with the markdown and needs no manual upkeep.
//
// Companion to the curated static/llms.txt (a map of links). This is the
// territory: every page's prose, in reading order.

import {readFileSync, writeFileSync, readdirSync, existsSync} from 'node:fs';
import {join, basename} from 'node:path';

const SITE = 'https://abapctl.github.io';
const DOCS = 'docs';
const OUT = 'static/llms-full.txt';

// Section order + labels, matching the sidebar (by _category_.json position).
const SECTIONS = [
  {dir: null, label: 'Introduction'}, // docs/intro.md (root)
  {dir: 'getting-started', label: 'Getting Started'},
  {dir: 'concepts', label: 'Core Concepts'},
  {dir: 'guides', label: 'Guides'},
  {dir: 'command-reference', label: 'Command Reference'},
  {dir: 'skills-agents', label: 'Skills & Agents'},
  {dir: 'use-cases', label: 'Agentic Use Cases'},
];

// Strip YAML frontmatter and return {title, body}.
function parse(md) {
  let title = null;
  let body = md;
  const fm = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m);
    if (t) title = t[1].trim().replace(/^["']|["']$/g, '');
    body = md.slice(fm[0].length);
  }
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) title = h1[1].trim();
  }
  return {title: title || 'Untitled', body: body.trim()};
}

// Route for a docs file, mirroring routeBasePath /docs and slug: / on intro.
function routeFor(dir, file) {
  const slug = basename(file, '.md');
  if (dir === null) return `${SITE}/docs`; // intro.md has slug: /
  if (slug === 'index') return `${SITE}/docs/${dir}`;
  return `${SITE}/docs/${dir}/${slug}`;
}

// Order files within a section: index first, then alphabetical. (Good enough;
// sidebar_position ordering would need parsing every file, and reading order
// here is for an LLM, not a human clicking through.)
function orderedFiles(dir) {
  const full = join(DOCS, dir);
  if (!existsSync(full)) return [];
  const files = readdirSync(full).filter((f) => f.endsWith('.md'));
  return files.sort((a, b) => {
    if (a === 'index.md') return -1;
    if (b === 'index.md') return 1;
    return a.localeCompare(b);
  });
}

const parts = [];
parts.push('# abapctl documentation (full text)');
parts.push('');
parts.push(
  '> The complete abapctl documentation concatenated into one file for LLM ingestion. abapctl is a standalone CLI for SAP ABAP Development Tools (ADT) and the OData runtime: headless, JSON-first, agent-ready. For a linked index instead, see ' +
    `${SITE}/llms.txt`,
);
parts.push('');
parts.push('Source: ' + SITE + ' | Binaries (MIT-0, open distribution): https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL');
parts.push('');

let pageCount = 0;
for (const section of SECTIONS) {
  parts.push('');
  parts.push('='.repeat(78));
  parts.push(`SECTION: ${section.label}`);
  parts.push('='.repeat(78));

  const files =
    section.dir === null ? ['intro.md'] : orderedFiles(section.dir);
  const baseDir = section.dir === null ? DOCS : join(DOCS, section.dir);

  for (const file of files) {
    const raw = readFileSync(join(baseDir, file), 'utf8');
    const {title, body} = parse(raw);
    const url = routeFor(section.dir, file);
    parts.push('');
    parts.push(`## ${title}`);
    parts.push(`Source: ${url}`);
    parts.push('');
    parts.push(body);
    parts.push('');
    pageCount++;
  }
}

const output = parts.join('\n') + '\n';
writeFileSync(OUT, output);
console.log(
  `[gen-llms-full] wrote ${OUT}: ${pageCount} pages, ${(output.length / 1024).toFixed(0)} KB`,
);
