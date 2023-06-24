import './Markdown.css';
import { marked } from 'marked';

// They don't necessarily need to take props
// This one also has an explicit return
export const MarkdownApp = () => {

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
        return (<textarea id="markdown-editor" name="markdown-editor" rows="10" onInput={LoadText} defaultValue={defaultText}></textarea>)
    }

    const PreviewBox = props => {
        return (<p id="markdown-preview" onLoad={LoadText} defaultValue={LoadText}></p>)
    }

    function LoadText() {
        document.getElementById("markdown-preview").innerHTML = marked.parse(document.getElementById("markdown-editor").value);
    }
    console.log(document.readyState);
    return(
    <div id="markdown-parent">
        <div class="markdown-box" id="markdown-box1">
        <TextBox text={defaultText} />
        </div>
        <div class="markdown-box" id="markdown-box2">
        <PreviewBox />
        </div>
    </div>
    );
}