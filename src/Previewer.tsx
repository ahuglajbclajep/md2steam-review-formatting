// inspired by https://github.com/mizchi/mdbuf/blob/be1581f/src/main/components/organisms/Preview.tsx

import morphdom from "morphdom";
import { FunctionComponent, h } from "preact";
import { memo } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

type Props = { html: string };
const Previewer: FunctionComponent<Props> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const request = requestAnimationFrame(() => {
      morphdom(ref.current, `<div>${html}</div>`, { childrenOnly: true });
    });

    return (): void => cancelAnimationFrame(request);
  });

  return <div class="html-preview" ref={ref} />;
};

export default memo(Previewer);
