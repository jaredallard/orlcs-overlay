/**
 * ActivePlayer shows the current active player, if there is one, in the current
 * spectator view.
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import React from 'react';
import Progress from '../Progress/Progress';

import './ActivePlayer.css';

class ActivePlayer extends React.Component {
  render() {
    const player = this.props.player || {};

    // If we don't have an active player, don't return the actual object
    if (Object.entries(player).length === 0) {
      return (<div className="active-player-container"></div>)
    }

    return (
      <div className="active-player-container">
        <div className="active-player">
          <div className="player-info">
            <div className="player-name">{player.name}</div>
            {/* Score */}
            <div className="player-metric-container">
              <div className="player-metric-value">{player.score}</div>
              <div className="player-metric-name">Score</div>
            </div>

            {/* Goals */}
            <div className="player-metric-container">
              <div className="player-metric-value">{player.goals}</div>
              <div className="player-metric-name">Goals</div>
            </div>

            {/* Shots */}
            <div className="player-metric-container">
              <div className="player-metric-value">{player.shots}</div>
              <div className="player-metric-name">Shots</div>
            </div>

            {/* Assist */}
            <div className="player-metric-container">
              <div className="player-metric-value">{player.assists}</div>
              <div className="player-metric-name">Asst</div>
            </div>

            {/* Saves */}
            <div className="player-metric-container">
              <div className="player-metric-value">{player.saves}</div>
              <div className="player-metric-name">Saves</div>
            </div>
          </div>
          <Progress team={player.color} progress="100" />
        </div>
      </div>
    )
  }
}


export default ActivePlayer;