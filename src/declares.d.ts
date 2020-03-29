declare module "remark-rehype";
declare module "rehype-stringify";

type Parent = import("unist").Parent;

type Heading = Parent & {
  type: "heading";
  depth: number;
};

type Link = Parent & {
  type: "link";
  url: string;
  title?: string;
};

type ListItem = Omit<Parent, "children"> & {
  type: "listItem";
  checked?: boolean;
  spread?: boolean;
  children: Parent[]; // mostly `Paragraph`
};
