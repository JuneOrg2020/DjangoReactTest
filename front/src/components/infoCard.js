import React, { PureComponent } from 'react';

class InfoCard extends PureComponent {
  render() {
    return (
      <div
        role="none"
        style={{
          margin: '4px',
          maxWidth: '100%',
          backgroundColor: this.props.isSelected ? '#a9ceec' : '#fff',
          color: '#000',
          padding: '15px 10px 15px 10px',
          borderRadius: '5px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default InfoCard;
