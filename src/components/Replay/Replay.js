import React from 'react';

import './Replay.css';

class Replay extends React.Component {
  render() {
    return (
      <div className="replay-container">
        <div className="replay">
          <div className="replay-info">
            <div className="replay-title">REPLAY</div>
            <div className="replay-metric">
              <div className="replay-metric-name">SCORER</div>
              <div className="replay-metric-value">{this.props.scorer_name}</div>
            </div>
            <div className="replay-metric">
              <div className="replay-metric-name">SPEED</div>
              <div className="replay-metric-value">{Math.round(this.props.speed)}kph</div>
            </div>
            {this.props.assister_name ? <div className="replay-metric">
              <div className="replay-metric-name">ASSISTER</div>
              <div className="replay-metric-value">{this.props.assister_name}</div>
            </div> : ""}
            <div className="replay-title">REPLAY</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Replay;