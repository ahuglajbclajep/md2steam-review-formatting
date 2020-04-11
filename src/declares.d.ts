declare module "remark-rehype";
declare module "rehype-stringify";
declare module "remark-disable-tokenizers";

type Parent = import("unist").Parent;

type Heading = Parent & {
  type: "heading";
  depth: number;
};

type List = Parent & {
  type?: "list";
  ordered?: boolean;
  start?: number;
  spread?: boolean;
};

type Table = Omit<Parent, "children"> & {
  type: "table";
  align?: "left" | "right" | "center";
  children: TableRow[];
};

type TableRow = Omit<Parent, "children"> & {
  type: "tableRow";
  children: Parent[]; // `TableCell` only
};

type Link = Parent & {
  type: "link";
  url: string;
  title?: string;
};
