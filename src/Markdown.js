import './Markdown.css';
import { marked } from 'marked';

const defaultText = 
      "# Hello\n" +
      "## Hello\n" +
      "There's also [links](https://www.freecodecamp.org)\n\n" + 
      "> Block Quotes!\n\n" +
      "`<div></div>`\n" +
      "```\n" +
      "// this is multi-line code:\n" +
      "function anotherExample(firstLine, lastLine) {\n" +
      "   if (firstLine == '```' && lastLine == '```') {\n" +
      "      return multiLineCode;\n" +
      "   }\n" +
      "}\n" +
      "```\n" +
      "- And of course there are lists.\n\n" +
      "![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n\n" +
      "**Hello**";

const defaultParsed = marked.parse(defaultText);

const TextBox = props => {
  return <textarea id="markdown-editor" name="markdown-editor" rows="4" onInput={LoadText}></textarea>
}

const PreviewBox = props => {
  return <p id="markdown-preview" onLoad={LoadText}></p>
}

function LoadText() {
  document.getElementById("markdown-preview").innerHTML = marked.parse(document.getElementById("markdown-editor").value);
}

// They don't necessarily need to take props
// This one also has an explicit return
export const MarkdownApp = () => {
  return(
    <div id="markdown-parent">
      <div class="markdown-box" id="markdown-box1">
        <TextBox />
      </div>
      <div class="markdown-box" id="markdown-box2">
        <PreviewBox />
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("markdown-editor").innerHTML = defaultText;
});