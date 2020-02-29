// see https://github.com/GoogleChromeLabs/comlink-loader#singleton-mode
/* eslint-disable @typescript-eslint/require-await */

import { get, set } from "idb-keyval";
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
    import("prettier/parser-markdown")
  ] as const);
})();

const readme = `# md2steam-formatting
`;

async function convert(markdown: string): Promise<[string, string]> {
  const mdast = unified()
    .use(parse)
    .parse(markdown);

  const mdast2html = async (mdast: Node): Promise<string> => {
    const hast = await unified()
      .use(mutate)
      .run(mdast);

    return unified()
      .use(hastStringify)
      .stringify(hast);
  };

  return await Promise.all([
    mdast2html(mdast),
    unified()
      .use(mdastStringify)
      .stringify(mdast)
  ]);
}

async function save(markdown: string): Promise<void> {
  set("markdown", markdown);
}

async function load(): Promise<string> {
  return (await get<string | undefined>("markdown")) || readme;
}

async function format(markdown: string): Promise<string> {
  return formatter && plugin
    ? formatter.format(markdown, { parser: "markdown", plugins: [plugin] })
    : markdown;
}

export { convert, save, load, format };