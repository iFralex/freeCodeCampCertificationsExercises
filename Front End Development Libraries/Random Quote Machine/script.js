//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/front-end-development-libraries

import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

let bgColor = "#5ea9ff"

let quotations = [
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Life is what happens when you're busy making other plans.", "John Lennon"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["In three words I can sum up everything I've learned about life: it goes on.", "Robert Frost"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["The only thing we have to fear is fear itself.", "Franklin D. Roosevelt"],
    ["The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", "Jordan Belfort"],
    ["The best way to predict the future is to create it.", "Peter Drucker"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["Don't cry because it's over, smile because it happened.", "Dr. Seuss"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["I have not failed. I've just found 10,000 ways that won't work.", "Thomas Edison"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["It is during our darkest moments that we must focus to see the light.", "Aristotle Onassis"],
    ["The only true wisdom is in knowing you know nothing.", "Socrates"],
    ["A person who never made a mistake never tried anything new.", "Albert Einstein"],
    ["The future starts today, not tomorrow.", "Pope John Paul II"],
    ["It's not the years in your life that count. It's the life in your years.", "Abraham Lincoln"]
]

class App extends React.Component {
        constructor(props) {
            super(props)
            this.randomQuote = this.randomQuote.bind(this)
            this.state = {
                quotation: "",
                author: "",
                index: -1,
                Switch: this.randomQuote,
            }
        }
        randomQuote() {
            let index = Math.floor(Math.random() * 20)
            if (index === this.state.index)
                return this.randomQuote()
            else {
                this.setState({
                    quotation: quotations[index][0],
                    author: quotations[index][1],
                    index: index,
                })

                bgColor = "rgb(".concat(Math.floor(Math.random() * 255), ",", Math.floor(Math.random() * 255), ",", Math.floor(Math.random() * 255), ")")
                return quotations[index]
            }
        }
        render() {
            return ( < div className = "container-fluid"
                style = {
                    { "height": "100%", "minHeight": "100vh", backgroundColor: bgColor } } >
                <
                QuoteBox data = { this.state }
                /> <
                /div>)
            }
        }

        class QuoteBox extends React.Component {
                constructor(props) {
                    super(props)
                }
                render() {
                    return ( < div className = "row d-fluid align-items-center justify-content-center"
                        style = {
                            { "height": "100%", minHeight: "100vh" } } >
                        <
                        div id = "quote-box"
                        className = "col-11 col-lg-9 bg-light py-4 my-5"
                        style = {
                            { "maxWidth": 1200, "border-radius": 20 } } >
                        <
                        Quote quotation = { this.props.data.quotation }
                        author = { this.props.data.author }
                        /> <
                        div className = "d-flex justify-content-center text-center" > {
                            this.props.data.index !== -1 ? < div > < Sharing / >
                            <
                            div style = {
                                { "max-width": 200, "width": "5vw" } }
                            /></div > : null
                        } <
                        Switch func = { this.props.data.Switch }
                        index = { this.props.data.index }
                        /> <
                        /div> <
                        /div> <
                        /div>)
                    }
                }

                class Quote extends React.Component {
                        constructor(props) {
                            super(props)
                        }

                        render() {
                            return <div > {
                                this.props.quotation !== "" ? < div style = {
                                    { "maxWidth": "80%", "width": 1000 } }
                                className = "mx-auto" >
                                <
                                p id = "text"
                                className = "display-4"
                                style = {
                                    { "textShadow": "2px 2px 5px " + bgColor } } > < em > { this.props.quotation } < /em></p >
                                <
                                p id = "author"
                                style = {
                                    { "text-align": "right" } } > { this.props.author } < /p> <
                                /div> : <div className="text-center"><h1 id="text">Read a famous quote!</h
                                1 >
                                <
                                p id = "author" > Click "Start"
                                and read one of our most beautiful quotes. < br / > Then share it on social media too! < /p> <
                                /div>} <
                                /div>
                            }
                        }

                        class Sharing extends React.Component {
                                constructor(props) {
                                    super(props)
                                }

                                render() {
                                    return ( < div >
                                        <
                                        a id = "tweet-quote"
                                        href = "twitter.com/intent/tweet"
                                        target = "_blank"
                                        className = "btn p-0"
                                        style = {
                                            { color: bgColor } } > < i class = "fa-brands fa-square-twitter fa-2x" / > < /a> <
                                        /div>)
                                    }
                                }

                                class Switch extends React.Component {
                                    constructor(props) {
                                        super(props)
                                    }

                                    render() {
                                        return <div >
                                            <
                                            button id = "new-quote"
                                        onClick = { this.props.func }
                                        className = "btn text-light"
                                        style = {
                                                { backgroundColor: bgColor } } > { this.props.index !== -1 ? "New Quote" : "Start" } < /button> <
                                            /div>
                                    }
                                }

                                ReactDOM.render( < App / > , document.getElementById("root"))