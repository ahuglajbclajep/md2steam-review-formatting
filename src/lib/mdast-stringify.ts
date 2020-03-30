import { Processor } from "unified";
import { Literal, Node } from "unist";

// see https://github.com/syntax-tree/mdast-util-to-hast/tree/8.1.0 and
// https://github.com/syntax-tree/hast-util-to-html/tree/7.1.0 and
// https://github.com/remarkjs/remark/tree/remark-stringify%408.0.0/packages/remark-stringify

const helper = (tag: string) => (node: Parent): string =>
  `[${tag}]${all(node)}[/${tag}]`;

const paragraph = (node: Parent): string => `\n${all(node)}\n`;

const heading = (node: Heading): string => {
  const depth = node.depth < 3 ? node.depth : 3;
  return helper(`h${depth}`)(node);
};

const blockquote = (node: Parent): string => `[quote]${all(node)}[/quote]`;

const list = (node: Parent): string => `[list]\n${all(node)}[/list]`;

const listItem = (node: Parent): string =>
  // TODO: write the case of `Code` which is `Literal`
  `[*]${all(node.children[0] as Parent)}\n`;

const code = (node: Literal): string => `[code]\n${node.value}\n[/code]`;

const text = (node: Literal): string => node.value as string;

const link = (node: Link): string => `[url=${node.url}]${all(node)}[/url]`;

const TODO = (): string => "";

// see https://github.com/syntax-tree/mdast/tree/684631f
const visitors: Record<string, (node: any) => string> = {
  root: all,
  paragraph,
  heading,
  blockquote,
  list,
  listItem,
  table: TODO,
  tableRow: TODO,
  tableCell: TODO,
  code,
  text,
  emphasis: helper("i"),
  strong: helper("b"),
  delete: helper("strike"),
  link,
};

function one(node: Node): string {
  const visitor = visitors[node.type];
  return visitor ? visitor(node) : "";
}

function all(parent: Parent): string {
  // you can also pass `parent` and `index` if necessary
  // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/all.js#L16
  // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/all.js#L15
  return parent.children.map((node) => one(node)).join("");
}

// see https://github.com/unifiedjs/unified/tree/9.0.0#processorcompiler
export default function stringify(this: Processor): void {
  // `all()` can be substituted, but usually the function based on `one()` is used
  // see https://github.com/syntax-tree/mdast-util-to-hast/blob/8.1.0/lib/index.js#L101
  // and https://github.com/syntax-tree/hast-util-to-html/blob/7.1.0/lib/index.js#L47
  this.Compiler = one;
}
