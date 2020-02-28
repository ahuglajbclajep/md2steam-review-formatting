import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import HtmlPreview from "./HtmlPreview";
import { md2html } from "./worker";

const App: FunctionComponent = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  const onInput: JSX.GenericEventHandler<HTMLTextAreaElement> = async e => {
    setMarkdown(e.currentTarget.value);
    setHtml(await md2html(e.currentTarget.value));
  };

  return (
    <div class="container">
      <textarea class="edit-area" value={markdown} onInput={onInput} />
      <HtmlPreview html={html} />
      <pre />
    </div>
  );
};

export default App;
