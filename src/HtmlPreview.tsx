import morphdom from "morphdom";
import { FunctionComponent, h } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

type Props = { html: string };
const Preview: FunctionComponent<Props> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const request = requestAnimationFrame(() => {
      morphdom(ref.current, `<div>${html}</div>`);
    });

    return (): void => cancelAnimationFrame(request);
  });

  return <div ref={ref} />;
};

export default Preview;
