import React from 'react';

import './Progress.css';

class Progress extends React.Component {
  render() {
    return (
      <div className={`progress ${this.props.team === 'orange' ? 'flex-row-reverse' : ''}`}>
        <div className={`progress-bar bg-${this.props.team}-team`} role="progressbar"
          aria-valuemin="0" aria-valuemax="100" style={{
            width: this.props.progress + '%',
          }} />
      </div>
    )
  }
}

export default Progress;