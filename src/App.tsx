import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <pre />
    </div>
  );
};

export default App;
