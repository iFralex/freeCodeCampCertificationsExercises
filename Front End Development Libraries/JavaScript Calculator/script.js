//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/front-end-development-libraries

import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import { evaluate } from "https://cdn.skypack.dev/mathjs@11.8.0";

const boxStyle = {height: 80, color: "white", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5, border: "1px solid #fff8", margin: 3, fontSize: 30}
const numberStyle = {backgroundColor: "#222", width: "calc(33% - 6px)"}
const operatorStyle = {backgroundColor: "orange", width: "calc(100% - 6px)", fontWeight: "bold"}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {input: "", expression: "", newCalc: false, opInput: false}
    this.display = this.display.bind(this)
  }
  display(value, type="") {
    console.log(/\./.test("9.3"), "start ", value, this.state.expression, this.state.input)
    if (value === "")
      this.setState(s => ({
      input: !isNaN(s.expression[s.expression.length - 1]) ? evaluate(s.expression).toString() : evaluate(s.expression.slice(0, -1)).toString(),
      expression: !isNaN(s.expression[s.expression.length - 1]) ? evaluate(s.expression).toString() : evaluate(s.expression.slice(0, -1)).toString(),
    }))
    else if (value === ".") {
      if (!/\./.test(this.state.input))
      this.setState(s => ({
      input: s.input === "" ? "0." : s.input.toString().concat(value),
      expression: s.expression === "" ? "0." : s.expression.toString().concat(value)
    }))
      console.log(/\./.test(this.state.input))
  }
    else {
      if (type === "") {
      this.setState(s => ({
      input: s.newCalc || s.opInput || s.input === "" || s.input.toString() === "0" ? value : s.input.toString().concat(value.toString()),
      expression: !s.newCalc ? s.expression.concat(value) : value.toString(),
      opInput: false
    }))
      }
    else if (type === "op") {
      if (!this.state.opInput || value === "-")
        this.setState(s => ({
      input: value,
      expression: s.expression !== "" ? s.expression.concat(value) : "0" + value,
      opInput: true
    }))
      else 
        this.setState(s => ({
      input: value,
      expression: s.expression.slice(0, s.input[s.input.length - 1] !== "-" ? -1 : -2).concat(value),
      opInput: true
    }))
      console.log(value, true)
    }
      this.setState({newCalc: false})
    }
        console.log("end ", value, this.state.expression, this.state.input)
  }
  render() {
    return <div className="container-fluid" >
      <div className="row no-gutters">
      <div className="col-12 p-0 m-0">
      <Display input={this.state.input}/>
      </div>
      </div>
      <div className="row no-gutters">
        <div className="col-10 d-flex flex-wrap justify-content-center p-0 m-0">
      {["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"].map((i, idx) => <Number id={i} text={idx < 9 ? idx + 1 : 0} onClick={this.display}/>)}
          <ActionBtn id="decimal" text="." style={{backgroundColor: "#052", width: "calc(66% - 6px)"}} onClick={() => this.display(".")}/>
        </div>
        <div className="col-2 d-flex flex-wrap justify-content-center p-0 m-0">
          {[["add", <i class="fa-solid fa-plus"/>, "+"], ["subtract", <i class="fa-solid fa-minus"/>, "-"], ["multiply", <i class="fa-solid fa-xmark"/>, "*"], ["divide", <i class="fa-solid fa-divide"/>, "/"]].map(i => <Operator id={i[0]} text={i[1]} value={i[2]} onClick={this.display}/>).reverse()}
        </div>    
    </div>
      <div class="row no-gutters">
      <div className="col-12 d-flex p-0">
        <ActionBtn id="clear" text={<i class="fa-solid fa-trash"/>} style={{backgroundColor: "#c22", width: "calc(50% - 6px)"}} onClick={() => {this.setState({input: "", expression: ""})}}/>
        <ActionBtn id="equals" text="=" style={{backgroundColor: "#05c", width: "calc(50% - 6px)", fontWeight: "bold"}} onClick={() => {this.display("");this.setState({newCalc: true}) }}/>
        </div>
        </div>
      </div>
  }
}

const Display = props => {
  return <div style={{backgroundColor: "black", border: "2px solid white", textAlign: "right"}}>
    <span id="display" style={{color: "yellow", fontSize: 50, marginRight: 15}}>{props.input !== "" ? props.input : "0"}</span>
    </div>
}

const Number = props => {
  return <button id={props.id} style={Object.assign({}, boxStyle, numberStyle)} className="btn" onClick={() => {props.onClick(props.text)}} onMouseEnter={e => changeColor(e, "gray", "black")} onMouseOut={e => changeColor(e, numberStyle.backgroundColor, "white")}>{props.text}</button>
}

const Operator = props => {
  return <button id={props.id} style={Object.assign({}, boxStyle, operatorStyle)} className="btn" onClick={() => {props.onClick(props.value, "op")}}onMouseEnter={e => changeColor(e, "yellow", "black")} onMouseOut={e => changeColor(e, operatorStyle.backgroundColor, "white")}>{props.text}</button>
}

const ActionBtn = props => {
  return <button id={props.id} style={Object.assign({}, boxStyle, props.style)} className="btn" onClick={props.onClick} onMouseEnter={e => changeColor(e, "white", "black")} onMouseOut={e => changeColor(e, props.style.backgroundColor, "white")}>{props.text}</button>
}

const changeColor = (e, bgCol, color) => {
  e.target.style.backgroundColor = bgCol
  e.target.style.color = color
}

ReactDOM.render(<App/>, document.getElementById("root"))