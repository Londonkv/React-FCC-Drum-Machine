import React from "react"


class Key extends React.Component{

  constructor(props) {
    super(props)
    this.state = {...props}
  }
  
  render() {
    return (
      <button className="drum-pad">
        {this.state.name}
        <audio
          className="clip">
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
      power:false,
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
  }

  handleSwitchActions(ev) {
    const { id: switchID } = ev.target;  // we take the name of the elt that created the event
    console.log(switchID)
    switch (switchID) {
      case "power":
        this.setState({power: !this.state.power})
        break;
      case "instrument":
        if (this.state.instrument === "drum") {
          this.setState({instrument: "piano"})          
        } else {
          this.setState({ instrument: "drum" })
        }
        break;    
      default:
        break;
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <div id="drum-machine">
          <div id="drum-keys">
            {this.state.keys.map(elt => <Key key={elt.key} name={elt.key} />)}
          </div>
          <div id="drum-controls">
              {/* rounded switch for power */}
            <label className="switch">
              <input type="checkbox"/>
              <span id="power" onClick={this.handleSwitchActions} className="slider round"></span>
            </label>
            <p id="display"></p>

            <input type="range" id="audio-volume" name="volume" min="0" max="100"/>
              {/* rounded switch for bank */}
            <label className="switch">
              <input type="checkbox"/>
              <span id="instrument" onClick={this.handleSwitchActions} className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
