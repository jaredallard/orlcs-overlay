import React from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import _ from 'lodash';

import PlayerDisplay from '../../components/PlayerDisplay/PlayerDisplay';
import Scoreboard from '../../components/Scoreboard/Scoreboard';
import ActivePlayer from '../../components/ActivePlayer/ActivePlayer';
import Replay from '../../components/Replay/Replay';

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

const ws = new W3CWebSocket('ws://localhost:49122');

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
      overtime: false,
      replay: false,
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
      lastGoal: {
        assister: {},
        scorer: {},
        speed: 0,
      },
      enabled: false,
      animations: {
        goal: false,
      }
    }
  }
  render() {
    const main = (<div>
      <Scoreboard goal={this.state.animations.goal}
        score={this.state.score} teams={this.state.teams}
        time={this.state.time} gameInfo={this.state.gameInfo}
        overtime={this.state.overtime} />
      <PlayerDisplay players={this.state.players} />
      {this.state.replay ?
        <Replay assister_name={this.state.lastGoal.assister.name} scorer_name={this.state.lastGoal.scorer.name} speed={this.state.lastGoal.speed} />
        :
        <ActivePlayer player={this.state.activePlayer} />
      }
    </div>)

    return this.state.enabled ? main : (<div />)
  }

  async componentDidMount() {
    // start watcher from controller.js
    window.setInterval(async () => {
      try {
        const body = await (await fetch('http://localhost:3333/')).json()
        this.setState({
          teams: {
            blue: {
              name: body.blue,
            },
            orange: {
              name: body.orange,
            },
          },
          gameInfo: {
            number: body.game,
            bestOf: body.bestOf || 3,
          },
          enabled: body.enabled,
        })
      } catch (err) {
        console.error("failed to ping controller", err)
      }
    }, 500)
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
      /**
       * @type {SOSEvent}
       */
      const jEvent = JSON.parse(event.data);

      if (jEvent.event === "game:goal_scored") {
        if (!this.state.replay) {
          this.setState({
            lastGoal: {
              assister: jEvent.data.assister,
              scorer: jEvent.data.scorer,
              speed: jEvent.data.goalspeed,
            }
          })
        }
        return
      }

      if (jEvent.data.event === "gamestate") {
        /**
         * @type {GameStateEvent}
         */
        const gameState = jEvent.data
        const teamData = gameState.game.teams
        const overtime = gameState.game.isOT
        const replay = gameState.game.isReplay

        const blueTeam = teamData[0]
        const orangeTeam = teamData[1]

        // Update the "spectating" block
        let activePlayer = {};
        if (gameState.game.hasTarget) {
          const activePlayerName = gameState.game.target;
          activePlayer = gameState.players[activePlayerName];
        }

        const playerList = gameState.players;
        const team0 = _.filter(playerList, {
          'team': 0
        })
        const team1 = _.filter(playerList, {
          'team': 1
        })

        const time = fmtMSS(gameState.game.time_seconds)
        const score = {
          blue: blueTeam.score,
          orange: orangeTeam.score,
        }
        const players = _.concat(_.map(team0, p => {
          p.color = 'blue'
          p.name = String(p.name).toUpperCase();
          return p
        }), _.map(team1, p => {
          p.color = 'orange'
          p.name = String(p.name).toUpperCase();
          return p
        }))

        this.setState({ time, score, players, activePlayer, overtime, replay })
        return
      }

      if (jEvent.event === "game:match_ended" || jEvent.event === "game:match_destroyed") {
        this.setState({
          enabled: false,
        })
        return
      }

      if (jEvent.event === "game:round_started_go") {
        this.setState({
          enabled: true,
        })
        return
      }
    }
  }
}

export default Home;