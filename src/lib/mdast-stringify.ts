import { Processor } from "unified";
import { Literal, Node, Parent } from "unist";

export default function stringify(this: Processor): void {
  this.Compiler = compiler;
}

function compiler(node: Node): string {
  return one(node);
}

const visitors: Record<string, (node: any) => string> = {
  root: all,
  paragraph: all,
  heading: heading,
  blockquote: () => "",
  list: () => "",
  listItem: () => "",
  table: () => "",
  tableRow: () => "",
  tableCell: () => "",
  code: () => "",
  text: text,
  emphasis: emphasis,
  strong: strong,
  delete: deleteFn,
  break: () => "",
  link: () => ""
};

function one(node: Node): string {
  const visitor = visitors[node.type];
  return visitor ? visitor(node) : "";
}

function all(parent: Parent): string {
  return parent.children.map(n => one(n)).join("");
}

function helper(tag: string, node: Parent): string {
  const content = all(node);
  return `[${tag}]${content}[/${tag}]`;
}

function heading(node: Heading): string {
  const depth = node.depth < 3 ? node.depth : 3;
  return helper(`h${depth}`, node) + "\n";
}

function text(node: Literal): string {
  return node.value as string;
}

function emphasis(node: Parent): string {
  return helper("i", node);
}

function strong(node: Parent): string {
  return helper("b", node);
}

function deleteFn(node: Parent): string {
  return helper("strike", node);
}
