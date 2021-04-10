import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

class InfoButton extends PureComponent {
  render() {
    const { title, onClick } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => onClick()}
      >
        {title}
      </Button>
    );
  }
}

export default InfoButton;
