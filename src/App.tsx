import { FunctionComponent, h, JSX } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";
import HtmlPreview from "./HtmlPreview";
import { format, load, md2html, save } from "./worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  // see https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
  useLayoutEffect(() => {
    (async (): Promise<void> => {
      const markdown = await load();
      const html = await md2html(markdown);
      setMarkdown(markdown);
      setHtml(html);
    })();
  }, []);

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    setMarkdown(e.currentTarget.value);
    setHtml(await md2html(e.currentTarget.value));
  };

  const onKeyDown: JSX.KeyboardEventHandler<HTMLDivElement> = async e => {
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      const formatted = await format(markdown);
      setMarkdown(formatted);
    } else if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      save(markdown);
    }
  };

  return (
    <div class="container" onKeyDown={onKeyDown}>
      <textarea class="edit-area" value={markdown} onInput={onInput} />
      <HtmlPreview html={html} />
      <pre />
    </div>
  );
};

export default App;
