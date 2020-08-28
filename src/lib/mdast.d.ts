// see https://github.com/syntax-tree/mdast

type Parent = import("unist").Parent;

type Literal = import("unist").Literal & {
  value: string;
};

type Heading = Parent & {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
};

type List = Parent & {
  type?: "list";
  ordered?: boolean;
  start?: number;
  spread?: boolean;
};

type Table = Omit<Parent, "children"> & {
  type: "table";
  align?: "left" | "right" | "center" | null;
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
