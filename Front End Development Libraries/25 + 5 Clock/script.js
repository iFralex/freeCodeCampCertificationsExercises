//See my original web Certification: https://www.freecodecamp.org/certification/ifralex/front-end-development-libraries

import React, {useRef} from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const PLAYING = "PLAYING"
const PAUSE = "PAUSE"
const breakLDef = 300
const sessionLDef = 1500
const orangeC = "#ff820d"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {breakL: breakLDef, sessionL: sessionLDef, timeLeft: sessionLDef, state: PAUSE, stateSes: true}
  }
  render() {
    return <div className="row">
      <div className="col-12">
      <Timer time={this.state.timeLeft} text={this.state.stateSes ? "Session" : "Break"} playPauseText={this.state.state !== PLAYING ? "play" : "pause"} reset={stopAudio => {stopAudio(); this.setState({breakL: breakLDef, sessionL: sessionLDef, timeLeft: sessionLDef, state: PAUSE, stateSes: true})}} play={playAudio => {
          if (this.state.state === PLAYING) {
            this.setState({state: PAUSE}) 
            return
          }
          else
            this.setState({state: PLAYING}) 
          const f = () => setTimeout(() => {
             if (this.state.state === PLAYING) {
               if (this.state.timeLeft > 0)
             this.setState(s => ({timeLeft: s.timeLeft - 1}))
               else {
                 this.setState(s => ({timeLeft: s.stateSes ? s.breakL : s.sessionL, stateSes: !s.stateSes}))
                 playAudio()
               }
               f()
             }
             }, 1000)
          f()
        }}/>
      </div>
      <div className="col-md-6 col-12">
      <Parameter id="break" text="Break Length" time={this.state.breakL} dec={() => 
    this.setState(s => ({breakL: Math.max(s.breakL - 60, 60), timeLeft: !s.stateSes && s.state === PLAYING ? Math.max(s.breakL - 60, 60) : s.timeLeft}
                       ))} incr={() => this.setState(s => (
          {breakL: Math.min(s.breakL + 60, 3600), timeLeft: !s.stateSes && s.state === PLAYING ? Math.min(s.breakL + 60, 3600) : s.timeLeft}))}/>
      </div>
      <div className="col-md-6 col-12">
      <Parameter id="session" text="Session Length" time={this.state.sessionL} dec={() => this.setState(s => (
          {sessionL: Math.max(s.sessionL - 60, 60), timeLeft: s.stateSes && s.state === PAUSE ? Math.max(s.sessionL - 60, 60) : s.timeLeft}
        ))} incr={() => this.setState(s => (
          {sessionL: Math.min(s.sessionL + 60, 3600), timeLeft: s.stateSes && s.state === PAUSE ? Math.min(s.sessionL + 60, 3600) : s.timeLeft}))}/>
      </div>
      </div>
  }
}

const Timer = props => {
  const audioRef = useRef(null)
  const audioPlay = () => audioRef != null ? audioRef.current.play() : console.log("err")
  const audioStop = () => {if (audioRef != null){audioRef.current.pause();audioRef.current.currentTime = 0}else console.log("err2")}
  return <div>
    <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
    <em style={{fontSize: 25}}>Made by <strong style={{color: orangeC}}>Alessio Antonucci</strong></em>
    <h1 className="display-1" style={{marginBottom: 40, color: orangeC}}>The <snap style={{color: "white"}}>BEST</snap> Timer</h1>
    <h3 id="timer-label" className="display-3">{props.text}</h3>
    <span id="time-left" className="display-1" style={{fontWeight: "bold", fontSize: 110}}>{convertSecMin(props.time)}</span>
    <Control id="start_stop" text={<i class={"fa-solid fa-" + props.playPauseText}/>} onClick={() => props.play(audioPlay)} style={{backgroundColor: orangeC, color: "black", borderRadius: "50%", border: "none", width: 170, height: 170, fontSize: 70, margin: "auto", display: "block"}}/>
    <Control id="reset" text="Reset" onClick={() => props.reset(audioStop)} style={{backgroundColor: "black", color: orangeC, border: "solid 2px white", width: 150, height: 60, fontSize: 30, borderRadius: 20, marginTop: 30}}/>
    </div>
}

const Parameter = props => {
  let boxStyle = {border: "solid 4px " + orangeC, backgroundColor: "black", width: 70, height: 70, fontSize: 20, color: "white"}
  return <div style={{marginTop: 100}}>
    <h3 id={props.id.concat("-label")} className="display-5 mb-3">{props.text}</h3>
    <div className="d-flex align-items-center justify-content-center">
    <Control id={props.id.concat("-decrement")} text={<i class="fa-solid fa-minus"></i>} onClick={props.dec}  style={boxStyle}/>
    <span id={props.id.concat("-length")} className="display-2">{convertSecMin(props.time, true)}</span>
    <Control id={props.id.concat("-increment")} text={<i class="fa-solid fa-plus"></i>} onClick={props.incr} style={boxStyle}/>
    </div>
    </div>
}

const Control = props => {
  return <button id={props.id} onClick={() => props.onClick()} style={Object.assign({borderRadius: 5, margin: "0 30px"}, props.style)}>{props.text}</button>
}

function convertSecMin(sec, onlyMin=false) {
  if (onlyMin)
    return Math.floor(sec / 60);
  let minutes = Math.floor(sec / 60);
         let extraSeconds = sec % 60;
         minutes = minutes < 10 ? "0" + minutes : minutes;
         extraSeconds = extraSeconds< 10 ? "0" + extraSeconds : extraSeconds;
  return minutes + ":" + extraSeconds
      }

ReactDOM.render(<App/>, document.getElementById("root"))