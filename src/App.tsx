import { FunctionComponent, h, JSX } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";
import HtmlPreview from "./HtmlPreview";
import { convert, format, load, save } from "./lib/worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [steam, setSteam] = useState("");

  // see https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
  useLayoutEffect(() => {
    (async (): Promise<void> => {
      const markdown = await load();
      setMarkdown(markdown);
      const [html, steam] = await convert(markdown);
      setHtml(html);
      setSteam(steam);
    })();
  }, []);

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    setMarkdown(e.currentTarget.value);
    const [html, steam] = await convert(e.currentTarget.value);
    setHtml(html);
    setSteam(steam);
  };

  const onKeyDown: JSX.KeyboardEventHandler<HTMLDivElement> = async e => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      save(markdown);
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      navigator.clipboard.writeText(steam);
    } else if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      const formatted = await format(markdown);
      setMarkdown(formatted);
    }
  };

  return (
    <div class="container" onKeyDown={onKeyDown}>
      <textarea class="markdown-edit" value={markdown} onInput={onInput} />
      <HtmlPreview html={html} />
      <pre class="steam-formatting">{steam}</pre>
    </div>
  );
};

export default App;
