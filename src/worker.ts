// see https://github.com/GoogleChromeLabs/comlink-loader#singleton-mode
/* eslint-disable @typescript-eslint/require-await */

import stringify from "rehype-stringify";
import parse from "remark-parse";
import mutate from "remark-rehype";
import unified from "unified";

async function md2html(markdown: string): Promise<string> {
  return unified()
    .use(parse)
    .use(mutate)
    .use(stringify)
    .processSync(markdown)
    .toString();
}

export { md2html };
