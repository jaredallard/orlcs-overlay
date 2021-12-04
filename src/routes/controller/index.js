import React from 'react';
import ControllerEntry from '../../components/ControllerEntry/ControllerEntry';

const games = require('../../games.json');

class Controller extends React.Component {
  async enable(e) {
    e.preventDefault();

    const body = await (await fetch('http://localhost:3333/enable')).json()
    console.info('enable', body)
  }

  async disable(e) {
    e.preventDefault();

    const body = await (await fetch('http://localhost:3333/disable')).json()
    console.info('disable', body)
  }

  async game(e) {
    e.preventDefault();

    const body = await (await fetch('http://localhost:3333/game')).json()
    console.info('game', body)
  }

  constructor(props) {
    super(props)

    this.state = {
      state: {}
    }
  }

  render() {
    const entries = games.map(teams => {
      return (<ControllerEntry key={teams} teams={teams} />)
    })
    return (<div>
      <div className="active">
        <h1>Active Game</h1>
        <br />
        <pre>{JSON.stringify(this.state.state)}</pre>
        <br /><br />

        <button type="button" className="btn btn-success" onClick={this.enable}>
          Enable Overlay
        </button>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-danger" onClick={this.disable}>
          Disable Overlay
        </button>
        &nbsp;&nbsp;
        <button type="button" className="btn btn-info" onClick={this.game}>
          Game: +1
        </button>
        <hr />
        <br /><br /><br /><br /><br /><br />
      </div>
      <div className="games">
        {entries}
      </div>
    </div >
    )
  }

  async componentDidMount() {
    // start watcher from controller.js
    window.setInterval(async () => {
      try {
        const body = await (await fetch('http://localhost:3333/')).json()
        this.setState({
          state: body
        })
      } catch (err) {
        console.error("failed to ping controller", err)
      }
    }, 500)
  }
}

export default Controller;