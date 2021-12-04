/**
 * ControllerEntry is a mini entry for controlling the scoreboard in the Controller
 *
 * @author Jared Allard <jared@rgst.io>
 * @license MIT
 */

import react from 'react';

class ControllerEntry extends react.Component {
  async setTeam(teams) {
    const teamsStr = teams.join(",")
    const body = await (await fetch(`http://localhost:3333/teams?teams=${teamsStr}`)).json()
    console.info('setTeam', body)
  }

  render() {
    const { teams } = this.props;

    const blue = teams[0]
    const orange = teams[1]
    const bestOf = teams[2]

    return (
      <div className="controller-entry">
        <h3>{blue} vs {orange} (Bo{bestOf})</h3>
        <button type="button" className="btn btn-primary" onClick={(e) => {
          e.preventDefault()
          this.setTeam(teams)
        }}>
          Start Game
        </button>
        <br /><br />
      </div>
    )
  }
}


export default ControllerEntry;