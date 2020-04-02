// see https://github.com/GoogleChromeLabs/comlink-loader/tree/2.0.0#singleton-mode
/* eslint-disable @typescript-eslint/require-await */

import hastStringify from "rehype-stringify";
import parse from "remark-parse";
import mutate from "remark-rehype";
import unified from "unified";
import { Node } from "unist";
import mdastStringify from "./mdast-stringify";

let formatter: typeof import("prettier/standalone") | undefined;
let plugin: typeof import("prettier/parser-markdown") | undefined;
(async (): Promise<void> => {
  [formatter, plugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/parser-markdown"),
  ] as const);
})();

async function convert(markdown: string): Promise<[string, string]> {
  const mdast = unified().use(parse).parse(markdown);

  const mdast2html = async (mdast: Node): Promise<string> => {
    const hast = await unified().use(mutate).run(mdast);
    return unified().use(hastStringify).stringify(hast);
  };

  return await Promise.all([
    mdast2html(mdast),
    unified().use(mdastStringify).stringify(mdast),
  ]);
}

async function format(markdown: string): Promise<string> {
  return formatter && plugin
    ? formatter.format(markdown, { parser: "markdown", plugins: [plugin] })
    : markdown;
}

export { convert, format };
