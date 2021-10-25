/**
 * Player implements a player display component. This shows boost information
 * as well as the player's name.
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import react from 'react';
import Progress from '../Progress/Progress';
import './Player.css';

class Player extends react.Component {
  render() {
    const player = this.props.player;

    return (
      <div className={`player-box bg-${player.color}-team border border-dark mt-2`}>
        <div className="player-info">
          <h5 className="player-name">{player.name}</h5>
          <span className="player-boost-text-v2">{player.boost}%</span>
        </div>
        <Progress progress={player.boost} />
      </div>
    )
  }
}


export default Player;