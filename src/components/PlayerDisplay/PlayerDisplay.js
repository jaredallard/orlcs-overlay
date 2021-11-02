/**
 * Player is a container for displaying Player components.
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import react from 'react';
import Player from '../Player/Player';
import './PlayerDisplay.css';

class PlayerDisplay extends react.Component {
  render() {
    const orangePlayers = [];
    const bluePlayers = [];

    for (const player of this.props.players) {
      const jsxPlayer = <Player player={player} key={player.id} />

      player.color === 'orange' ? orangePlayers.push(jsxPlayer) : bluePlayers.push(jsxPlayer)
    }

    return (
      <div className="container-fluid playerdisplay">
        <div className="row">
          <div className="col m-0-4">
            <div className="h-100 d-flex align-items-start flex-column">
              <div className="mt-3">
                {bluePlayers}
              </div>
            </div>
          </div>

          <div className="col m-0-4">
            <div className="h-100 d-flex align-items-end flex-column">
              <div className="mt-3">
                {orangePlayers}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default PlayerDisplay;