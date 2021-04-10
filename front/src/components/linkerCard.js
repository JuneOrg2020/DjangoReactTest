import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

class LinkerCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linkers: props.linkers,
      linkerKey: 0,
    };
  }

  changeLink() {
    let { linkerKey } = this.state;
    linkerKey += 1;
    if (this.state.linkers.length <= linkerKey) {
      linkerKey = 0;
    }
    this.setState({
      linkerKey,
    });
  }

  render() {
    const { linkers, style } = this.props;
    let buttonText;

    const buttonStyle = {
      ...style,
      marginRight: '5px',
      textTransform: 'none',
    };

    if (linkers.length === 0) {
      return (
        <Button
          variant="outlined"
          color="primary"
          style={buttonStyle}
        >
          No Linker
        </Button>
      );
    }

    const {
      type,
      rType,
      text,
      rText,
    } = linkers[this.state.linkerKey];

    let linkerType = type;
    let linkerText = text;

    if (type === null) {
      if (rType === 0) {
        linkerType = 1;
      } else if (rType === 1) {
        linkerType = 0;
      }
    }

    if (rType !== null) {
      linkerText = rText;
    }

    if (linkerType === 0) {
      buttonText = 'From';
    } else if (linkerType === 1) {
      buttonText = 'To';
    } else if (linkerType === 2) {
      buttonText = 'Equal';
    } else {
      buttonText = 'No Linker';
    }

    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          style={buttonStyle}
          onClick={() => this.changeLink()}
        >
          {buttonText}
        </Button>
        {linkerText}
      </>
    );
  }
}

export default LinkerCard;
