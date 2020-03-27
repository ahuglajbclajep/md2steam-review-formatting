import { FunctionComponent, h, JSX } from "preact";
import { useLayoutEffect, useState } from "preact/hooks";
import { useCtrlKeyDown } from "./hooks";
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
      const [html, steam] = await convert(markdown);
      setMarkdown(markdown);
      setHtml(html);
      setSteam(steam);
    })();
  }, []);

  useCtrlKeyDown("s", () => save(markdown));
  useCtrlKeyDown("d", () => navigator.clipboard.writeText(steam));
  useCtrlKeyDown("f", async () => setMarkdown(await format(markdown)));

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    // maybe `currentTarget.value` can only be read once?
    const markdown = e.currentTarget.value;
    const [html, steam] = await convert(markdown);
    setMarkdown(markdown);
    setHtml(html);
    setSteam(steam);
  };

  return (
    <div class="container">
      <textarea
        class="markdown-edit"
        value={markdown}
        spellcheck={false}
        onInput={onInput}
      />
      <HtmlPreview html={html} />
      <pre class="steam-formatting">{steam}</pre>
    </div>
  );
};

export default App;
