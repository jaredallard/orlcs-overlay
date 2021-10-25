import React from 'react';

import './Progress.css';

class Progress extends React.Component {
  render() {
    return (
      <div className="progress">
        <div className="progress-bar bg-dark" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{ width: this.props.progress + '%' }} />
      </div>
    )
  }
}

export default Progress;