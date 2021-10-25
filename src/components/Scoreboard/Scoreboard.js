/**
 * Scoreboard implements a Rocket League scoreboard
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import React from 'react';
import logo from './logo.png';
import './Scoreboard.css';

class Scoreboard extends React.Component {

  render() {
    return (
      <div className="scorebox">
        <div className="meta-info">
          <div className="tournament-info">
            <div className="tournament-name-container">
              <span className="info-title">Outreach Rocket League Championship Series 2021</span>
            </div>
            <div className="tournament-info-container">
              <span>GAME <span id='tournament-game-number'>{this.props.gameInfo.number}</span></span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>BEST OF <span id='tournament-best-of'>{this.props.gameInfo.bestOf}</span></span>
            </div>
          </div>
        </div>
        {this.props.goal ?
          <div className="scorebox-main">
            <div className={`goal-notification bg-${this.props.goal.color}-team`}>
              <div className="goal-text">GOAL</div>
            </div>
          </div> :
          <div className="scorebox-main">
            <img className="logo" alt="ORLCS" src={logo} />
            <div className="blue-team">
              <div className="team-name">
                {this.props.teams.blue.name}
              </div>
            </div>
            <div className="score">
              <span className="display-6">{this.props.score.blue}</span>
              <span className="display-6">-</span>
              <span className="display-6">{this.props.score.orange}</span>
            </div>
            <div className="orange-team">
              <div className="team-name">
                {this.props.teams.orange.name}
              </div>
            </div>
            <div className="timer">
              <span id="timer">{this.props.time}</span>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Scoreboard;