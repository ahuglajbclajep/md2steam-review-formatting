// see https://github.com/syntax-tree/mdast-util-to-hast/tree/8.2.0 and
// https://github.com/syntax-tree/hast-util-to-html/tree/7.1.0 and
// https://github.com/remarkjs/remark/tree/remark-stringify%408.0.0/packages/remark-stringify

import { Processor } from "unified";
import { Node } from "unist";

// `type` of previous content
type PrevContent = Node["type"] | null;

// block content helper
const block = (tag: string) => (node: Parent): string =>
  `[${tag}]\n${all(node)}[/${tag}]\n`;

// inline content helper
const inline = (tag: string) => (node: Parent): string =>
  `[${tag}]${all(node)}[/${tag}]`;

const paragraph = (node: Parent, prev: PrevContent): string =>
  // `Paragraph should not be adjacent to each other
  `${prev === "paragraph" ? "\n" : ""}${all(node)}\n`;

const heading = (node: Heading): string => {
  // steam does not support `[h4]` or below
  const depth = node.depth < 3 ? node.depth : 3;
  // `Heading` children are only inline content, so line breaks should be at the end only
  return `[h${depth}]${all(node)}[/h${depth}]\n`;
};

const list = (node: List): string =>
  block(node.ordered ? "olist" : "list")(node);

const listItem = (node: Parent): string =>
  // `ListItem` is a wrapper and has only one child content
  // if child content is `Code`, skip it
  node.children[0].children ? `[*]${all(node.children[0] as Parent)}\n` : "";

// see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.2.0/lib/handlers/table.js
const table = (node: Table): string => {
  // `TableRow` and `Table` are block contents
  const tableRows = node.children.map((tr, i) => {
    const tableCells = tr.children.map(inline(i === 0 ? "th" : "tb"));
    return `[tr]\n${tableCells.join("\n")}\n[/tr]\n`;
  });
  return `[table]\n${tableRows.join("")}[/table]\n`;
};

const code = (node: Literal): string => `[code]\n${node.value}\n[/code]\n`;

const text = (node: Literal): string => node.value;

const link = (node: Link): string =>
  // to support widget generation when the URL is directly pasted
  node.children[0].value === node.url
    ? node.url
    : `[url=${node.url}]${all(node)}[/url]`;

// see https://github.com/syntax-tree/mdast/tree/684631f
const visitors: Record<string, (node: any, prev: PrevContent) => string> = {
  // block contents
  root: all,
  paragraph,
  heading,
  blockquote: block("quote"),
  list,
  listItem,
  table,
  code,
  // inline contents
  text,
  emphasis: inline("i"),
  strong: inline("b"),
  delete: inline("strike"),
  link,
};

function one(node: Node, prev: PrevContent): string {
  const visitor = visitors[node.type];
  return visitor ? visitor(node, prev) : "";
}

function all(parent: Parent): string {
  return (
    parent.children
      // you can also pass `parent` and `index` if necessary
      // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/all.js#L16
      // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/all.js#L15
      .map((node, i) => one(node, i === 0 ? null : parent.children[i - 1].type))
      .join("")
  );
}

// see https://github.com/unifiedjs/unified/tree/9.0.0#processorcompiler
export default function stringify(this: Processor): void {
  // `all()` can be substituted, but usually the function based on `one()` is used
  // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/index.js#L101
  // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/index.js#L47
  this.Compiler = (node): string => one(node, null);
}
