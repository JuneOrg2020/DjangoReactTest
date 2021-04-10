import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

class NormalButton extends PureComponent {
  render() {
    const {
      title,
      style,
      isColored,
      isHidden,
      onClick,
    } = this.props;

    if (isHidden) {
      return null;
    }

    const buttonStyle = {
      ...style,
      textTransform: 'none',
      color: isColored ? '#09f' : '#fff',
    };

    return (
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => onClick()}
      >
        {title}
      </Button>
    );
  }
}

export default NormalButton;
