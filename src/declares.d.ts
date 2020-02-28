declare module "remark-rehype";
declare module "rehype-stringify";

type Heading = import("unist").Parent & {
  type: "heading";
  depth: number;
};
