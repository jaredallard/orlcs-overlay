import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import _ from 'lodash';

import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';

function fmtMSS(s) {   // accepts seconds as Number or String. Returns m:ss
  return (s -         // take value s and subtract (will try to convert String to Number)
    (s %= 60) // the new value of s, now holding the remainder of s divided by 60 
    // (will also try to convert String to Number)
  ) / 60 + (    // and divide the resulting Number by 60 
      // (can never result in a fractional value = no need for rounding)
      // to which we concatenate a String (converts the Number to String)
      // who's reference is chosen by the conditional operator:
      9 < s       // if    seconds is larger than 9
        ? ':'       // then  we don't need to prepend a zero
        : ':0'      // else  we do need to prepend a zero
    ) + s;       // and we add Number s to the string (converting it to String as well)
}

const ws = new W3CWebSocket('ws://192.168.1.48:49122');

let isFirstInit = true;

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      activePlayer: {},
      time: '00:00',
      gameInfo: {
        number: 0,
        bestOf: 0,
      },
      teams: {
        blue: {
          name: '',
        },
        orange: {
          name: '',
        },
      },
      score: {
        blue: 4,
        orange: 2,
      },

      enabled: true,
      animations: {
        goal: false,
      }
    }
  }
  render() {
    const main = (<div>
      <Scoreboard goal={this.state.animations.goal}
        score={this.state.score} teams={this.state.teams}
        time={this.state.time} gameInfo={this.state.gameInfo} />
      <PlayerDisplay players={this.state.players} />
      <ActivePlayer player={this.state.activePlayer} />
    </div>)

    return this.state.enabled ? main : (<div />)
  }

  async componentDidMount() {
    window.onload = () => {
      const urlParams = new URLSearchParams(window.location.search);
      this.setState({
        gameInfo: {
          number: urlParams.get('gameNum') || 1,
          bestOf: urlParams.get('bestOf') || 3,
        },
      })
      return
    }

    ws.onopen = () => {
      console.log("created websocket client")
    }

    ws.onerror = (error) => {
      console.error("websocket error", error)
    }

    ws.onmessage = (event) => {
      const jEvent = JSON.parse(event.data);

      if (jEvent.event === "game:goal_scored") {
        this.setState({
          animations: {
            goal: {
              color: jEvent.data.scorer.teamnum === 0 ? 'blue' : 'orange',
            }
          }
        })

        setTimeout(() => {
          this.setState({
            animations: {
              goal: false,
            }
          })
        }, 5000)
        return
      }

      if (jEvent.data.event === "gamestate") {
        const teamData = jEvent.data.game.teams

        const blueTeam = teamData[0]
        const orangeTeam = teamData[1]

        // TODO: update when changed
        if (isFirstInit) {
          document.documentElement.style.setProperty('--blue-color', '#' + teamData[0].color_primary)
          document.documentElement.style.setProperty('--orange-color', '#' + teamData[1].color_primary)
          isFirstInit = false
        }

        // Update the "spectating" block
        let activePlayer = {};
        if (jEvent.data.game.hasTarget) {
          const activePlayerName = jEvent.data.game.target;
          activePlayer = jEvent.data.players[activePlayerName];
        }

        // TODO: Handle when game has winner.

        const playerList = jEvent.data.players;
        const team0 = _.filter(playerList, {
          'team': 0
        })
        const team1 = _.filter(playerList, {
          'team': 1
        })

        const time = fmtMSS(jEvent.data.game.time_seconds)
        const teams = {
          blue: { name: blueTeam.name },
          orange: { name: orangeTeam.name }
        }
        const score = {
          blue: blueTeam.score,
          orange: orangeTeam.score,
        }
        const players = _.concat(_.map(team0, (p) => { p.color = 'blue'; return p }), _.map(team1, (p) => { p.color = 'orange'; return p }))

        this.setState({ time, teams, score, players, activePlayer })
      }

      if (jEvent.event === "game:match_ended" || jEvent.event === "game:match_destroyed") {
        this.setState({
          enabled: false,
        })
        return
      }

      if (jEvent.event === "game:match_created" || jEvent.event === "game:round_started_go") {
        this.setState({
          enabled: true,
        })
        return
      }
    }
  }
}

export default Home;