import { useEffect } from 'react';
import './Quote.css';

// They don't necessarily need to take props
// This one also has an explicit return
export const QuoteApp = () => {
    const quotes = [
        "You know, Hobbes, some days even my lucky rocketship underpants don\'t help.",
        "― Bill Watterson",
        "Even if we don't have the power to choose where we come from, we can still choose where we go from there.",
        "— Stephen Chbosky",
        "And now that you don't have to be perfect, you can be good.",
        "— John Steinbeck",
        "Outside the windows the day was bright: golden sunshine, blue sky, pleasant wind... I wanted to punch the happy day in the face, grab it by the hair, and beat it until it told me what the hell it was so happy about.",
        "― Ilona Andrews",
        "I haven't had a very good day. I think I might still be hungover and everyone's dead and my root beer's gone.",
        "― Holly Black"
    ];

    var rand = 0;

    const Title = props => (
        <h1 id="quote-author-text" className="title">{props.text}</h1>
    );

    // Doesn't have to be ES6 if you don't want
    const Copy = props => {
        return <p id="quote-text-text">{props.text}</p>
    }

    function NewQuoteButton() {
        //rand = (Math.floor(Math.random() * 5) * 2)
        return (<button class="quote-button" id="quote-new-quote" onClick={() => {
            rand = (Math.floor(Math.random() * 5) * 2);
            document.getElementById("quote-text-text").innerHTML = quotes[rand];
            document.getElementById("quote-author-text").innerHTML = quotes[rand + 1];
        }} >New quote</button>);
    }

    function Tweet() {
        var url = "https://twitter.com/intent/tweet?text=";
        url += quotes[rand]
        url += "  "
        url += quotes[rand + 1]
        url = url.replace(/\s/g, "%20")
        return (
            <div>
                <a class="twitter-share-button" href={url} >Tweet</a>
            </div>
        );
    }

    useEffect(<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>);

    return(
    <div class="quote-box" id="quote-box">
        <div id="quote-text">
        <Copy text={quotes[rand]} />
        </div>
        <div id="quote-author">
        <Title text="Author" text={quotes[rand + 1]} />
        </div>
        <div class="quote-row">
        <div class="quote-center-align">
            <NewQuoteButton />
        </div>
        <div class="twitter-align quote-center-align">
            <Tweet />
        </div>
        </div>
    </div>
    );
}
