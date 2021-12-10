import React from "react"


class Key extends React.Component{
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(ev) {
    if (this.props.power) {
      const audioElement = ev.target.querySelector("audio");
      audioElement.volume = this.props.volume / 100;
      audioElement.play();
    }
  }
  render() {
    return (
      <button className="drum-pad" id={this.props.name}  onClick={this.handleClick} >
        {this.props.name}
        <audio
          className="clip" src={"https://s3.amazonaws.com/freecodecamp/drums/"+ this.props.soundAddr}>
          <code>audio</code>
        </audio>
      </button>
    )
  }
}

class App extends React.Component{

  constructor() {
    super();
    this.state = {
      instrument: "drum",
      power: false,
      volume:50,
      keys: [
        {
          key: "Q",
          soundDescription: ["Heater-1", "chord-1"],
          soundAddr: ["Heater-1.mp3", "Chord_1.mp3"]
        },
        {
          key: "W",
          soundDescription:["Heater-2","chord-2"], 
          soundAddr: ["Heater-2.mp3", "Chord_2.mp3"]
        },
        {
          key: "E",
          soundDescription:["Heater-3","Chord-3"], 
          soundAddr: ["Heater-3.mp3", "Chord_3.mp3"]
        },
        {
          key: "A",
          soundDescription:["Heater-4","Shaker"], 
          soundAddr: ["Heater-4_1.mp3", "Give_us_a_light.mp3"]
        },
        {
          key: "S",
          soundDescription:["Clap","Open-HHH"], 
          soundAddr: ["Heater-6.mp3", "Dry_Ohh.mp3"]
        },
        {
          key: "D",
          soundDescription:["Open-HH", "Closed-HHH"], 
          soundAddr: ["Dsc_Oh.mp3", "Bld_H1.mp3"]
        },
        {
          key: "Z",
          soundDescription:["Kick-n-Hat", "Punchy-kick"],
          soundAddr: ["Kick_n_Hat.mp3", "punchy_kick_1.mp3"]
        },
        {
          key: "X",
          soundDescription:["Kick", "Side-stick"],
          soundAddr: ["RP4_KICK_1.mp3", "side_stick_1.mp3"]
        },
        {
          key: "C",
          soundDescription: ["Closed-HH", "Snare" ], 
          soundAddr: ["Cev_H2.mp3","Brk_Snr.mp3" ]
        }
      ],
    }
    this.handleSwitchActions = this.handleSwitchActions.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handledisplay = this.handledisplay.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleSwitchActions(ev) {
    const { id: switchID } = ev.target;  // we take the name of the elt that created the event
    switch (switchID) {
      case "power":
        this.setState({ power: !this.state.power });
        if (!this.state.power) this.handledisplay("Power On");
        else this.handledisplay("Power Off");
        break;
      case "instrument":
        if (this.state.instrument === "drum") {
          this.setState({ instrument: "piano" });
          this.handledisplay("Smooth Piano Kit");
        } else {
          this.setState({ instrument: "drum" });
          this.handledisplay("Heater Kit");
        }
        break;    
      default:
        break;
    }
  }

  handledisplay(message) {
    document.getElementById("display").innerText = message;
  }

  handleVolume(ev) {
    const { value: volumeValue } = ev.target;
    this.setState({ volume: volumeValue })
    this.handledisplay("Volume: "+volumeValue)
  }

  handleKeyDown(ev) {
    if (this.state.power) {
      let key = (ev.key).toLocaleUpperCase()
      let allKeys = this.state.keys.map(elt => elt.key)
      if (allKeys.includes(key)) {
        document.getElementById(key).click()
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div id="drum-machine">
          <div id="drum-keys">
            {this.state.keys.map(elt => <Key key={elt.key} name={elt.key} volume={this.state.volume} power={this.state.power} soundAddr={this.state.instrument === "drum"? elt.soundAddr[0]: elt.soundAddr[1]}/>)}
          </div>
          <div id="drum-controls">
              {/* rounded switch for power */}
            <label className="switch">
              <span className="switch-label">Power</span>
              <input type="checkbox"/>
              <span id="power" onClick={this.handleSwitchActions} className="slider round"></span>
            </label>
            <p id="display"></p>

            <input type="range" id="audio-volume" name="volume" min="0" max="100" onChange={this.handleVolume}/>
              {/* rounded switch for bank */}
            <label className="switch">
              <span className="switch-label">Bank</span>
              <input type="checkbox"/>
              <span id="instrument" onClick={this.handleSwitchActions} className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown)
  }
}

export default App;
