/**
 * ActivePlayer shows the current active player, if there is one, in the current
 * spectator view.
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import React from 'react';

import './ActivePlayer.css';

class ActivePlayer extends React.Component {
  render() {
    const player = this.props.player || {};

    // If we don't have an active player, don't return the actual object
    if (Object.entries(player).length === 0) {
      return (<div className="active-player"></div>)
    }

    return (
      <div className="active-player">
        <div className={`active-player-info bg-${player.color}-team`}>
          <div className="row">
            <div className="col-md-6 spectating">
              &nbsp;&nbsp;&nbsp;&nbsp;Spectating
            </div>
            <div className="col-md-6">
              {player.name}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ActivePlayer;