import { Fragment, FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import { useCtrlKeyDown, useEffectAsync, useStorage } from "./hooks";
import { convert, format } from "./lib/worker";
import Previewer from "./Previewer";

const readme = `# md2steam-formatting
`;

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [steam, setSteam] = useState("");
  const [save, load] = useStorage<string>("md2st-markdown");

  // see https://reactjs.org/docs/hooks-faq.html#how-can-i-do-data-fetching-with-hooks
  useEffectAsync(async () => {
    const markdown = (await load()) || readme;
    const [html, steam] = await convert(markdown);
    setMarkdown(markdown);
    setHtml(html);
    setSteam(steam);
  }, []);

  useCtrlKeyDown("s", () => save(markdown));
  useCtrlKeyDown("d", () => navigator.clipboard.writeText(steam));
  useCtrlKeyDown("f", async () => setMarkdown(await format(markdown)));

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async (e) => {
    // maybe `currentTarget.value` can only be read once?
    const markdown = e.currentTarget.value;
    const [html, steam] = await convert(markdown);
    setMarkdown(markdown);
    setHtml(html);
    setSteam(steam);
  };

  return (
    // see https://github.com/microsoft/TypeScript/issues/20469
    <Fragment>
      <textarea
        class="markdown-edit"
        value={markdown}
        onInput={onInput}
        autoFocus
        spellcheck={false}
      />
      <Previewer html={html} />
      <pre class="steam-formatting">{steam}</pre>
    </Fragment>
  );
};

export default App;
