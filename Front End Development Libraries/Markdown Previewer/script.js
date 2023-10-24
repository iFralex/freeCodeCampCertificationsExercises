//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/front-end-development-libraries

import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)"
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({
      input: e.target.value
    })
  }
  render() {
    return <div className="row" style={{height: "100vh"}}>  
      <Editor onChange={this.onChange} input={this.state.input}/>
              <Previewer input={this.state.input}/>
        </div>
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="col-md-6 col-12 h-100">
      <textarea id="editor" className="w-100 h-100" onChange={this.props.onChange} value={this.props.input}/>
        </div>
  }
}

class Previewer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let input = marked.parse(this.props.input, {breaks: true})
    console.log(input)
    return <div id="preview" className="col-md-6 col-12" dangerouslySetInnerHTML={{__html: input}}/>
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))