//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/front-end-development-libraries

import React, { useRef, useEffect } from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: "Click a button to play!", power: true, volume: 5}
    this.display = this.display.bind(this)
    this.onChangePow = this.onChangePow.bind(this)
    this.onChangeVol = this.onChangeVol.bind(this)
  }
  display(text) {
    this.setState({text: text})
  }
  onChangeVol(e) {
    this.setState({volume: e.target.value > 10 ? 10 : (e.target.value < 0 ? 0 : e.target.value)})
  }
  onChangePow(e) {
    this.setState({power: e.target.checked})
  }
  render() {
    return (<div id="drum-machine" className="row text-center d-flex align-items-center" style={{height: "100vh"}}>
      <div>
        <h1>Play the Drum Machine</h1>
        <div className="row">
          <div className="col-6">
        <Power power={this.state.power} onChangePow={this.onChangePow}/>
          </div>
          <div className="col-6">
        <Volume volume={this.state.volume} onChangeVol={this.onChangeVol}/>
            </div>
          </div>
        <Display text={this.state.text}/>
      <div className="d-flex flex-wrap justify-content-center">
        {[["Heater 1", "Q", "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"], ["Heater 2", "W", "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"], ["Heater 3", "E", "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"], ["Heater 4", "A", "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"], ["Clap", "S", "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"], ["Open-HH", "D", "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"], ["Kick-n'-Hat", "Z", "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"], ["Kick", "X", "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"], ["Closed-HH", "C", "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"]].map(i => <DrumPad id={i[0]} text={i[1]} url={i[2]} key={i[0]} display={this.display} volume={this.state.power ? this.state.volume / 10 : 0}/>)}
        </div></div>
        </div>)
  }
}

const Display = props => {
  return <div id="display">
    <h1>{props.text}</h1>
  </div>
}

const Power = props => {
  console.log(props.power)
  return <div className="form-group d-flex justify-content-center">
    <label for="power">Power</label>
    <div className="mx-2"/>
    <label class="switch">
      <input id="toggle" type="checkbox" checked={props.power} onChange={props.onChangePow} className="form-control"/>
  <span class="slider round"></span>
</label>
  </div>
}
          
const Volume = props => {
  return <div className="form-group d-flex justify-content-center">
    <label for="volume">Volume:</label>
    <div className="mx-2"/>
    <input id="volume" type="number" value={props.volume} onChange={props.onChangeVol} min="0" max="10" className="form-control" style={{maxWidth: 100}}/>
  </div>
}

const DrumPad = props => {
const handleKeyDown = event => {
  if (event.key.toUpperCase() === props.text)
    btRef.current.click()
}
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  let audioRef = useRef(null)
  let btRef = useRef(null)
    return <button ref={btRef} className="drum-pad btn btn-primary m-2" id={props.id} onClick={() => { 
        audioRef.current.volume = props.volume
        audioRef.current.play()
        props.display(props.id)
      }} style={{width: "30%", height: 50}}>
      {props.text}
      <audio ref={audioRef} src={props.url} className="clip" id={props.text} />
    </button>
}

ReactDOM.render(<App/>, document.getElementById("root"))