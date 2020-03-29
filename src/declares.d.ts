declare module "remark-rehype";
declare module "rehype-stringify";

type Heading = import("unist").Parent & {
  type: "heading";
  depth: number;
};

type Link = import("unist").Parent & {
  type: "link";
  url: string;
  title: string;
};
