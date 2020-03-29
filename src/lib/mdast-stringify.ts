import { Processor } from "unified";
import { Literal, Node } from "unist";

// see https://github.com/syntax-tree/hast-util-to-html/tree/7.1.0 and
// https://github.com/remarkjs/remark/tree/remark-stringify%407.0.4/packages/remark-stringify

const all = (parent: Parent): string =>
  parent.children.map((node) => one(node)).join("");

const helper = (tag: string) => (node: Parent): string =>
  `[${tag}]${all(node)}[/${tag}]`;

const paragraph = (node: Parent): string => `\n${all(node)}\n`;

const heading = (node: Heading): string => {
  const depth = node.depth < 3 ? node.depth : 3;
  return helper(`h${depth}`)(node);
};

const blockquote = (node: Parent): string => `[quote]${all(node)}[/quote]`;

const list = (node: Parent): string => `[list]\n${all(node)}[/list]`;

const listItem = (node: ListItem): string => `[*]${all(node.children[0])}\n`;

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

// see https://github.com/unifiedjs/unified/tree/8.4.2#processorcompiler
export default function stringify(this: Processor): void {
  this.Compiler = one;
}
