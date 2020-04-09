// inspired by https://github.com/mizchi/mdbuf/blob/be1581f/src/main/components/organisms/Preview.tsx

import morphdom from "morphdom";
import { FunctionComponent, h } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

type Props = { html: string };
const Previewer: FunctionComponent<Props> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const request = requestAnimationFrame(() => {
      morphdom(ref.current, `<div>${html}</div>`, { childrenOnly: true });
    });

    return (): void => cancelAnimationFrame(request);
  });

  return <div class="html-preview" ref={ref} />;
};

export default Previewer;
