import React, { PureComponent } from 'react';

class LinkerLine extends PureComponent {
  render() {
    return (
      <div style={{ borderBottom: '1px solid #00f' }}>
        {this.props.linker.type}
        {this.props.linker.text}
      </div>
    );
  }
}

export default LinkerLine;
