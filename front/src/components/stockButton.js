import React, { Component } from 'react';
import NormalButton from './normalButton';
import { commonFetch } from '../modules/common';

class StockButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStocked: props.isStocked,
      infoId: props.infoId,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.infoId !== this.state.infoId) {
      this.setState({
        isStocked: nextProps.isStocked,
        infoId: nextProps.infoId,
      });
      return true;
    }

    if (nextState.isStocked !== this.state.isStocked) {
      return true;
    }

    return false;
  }

  stockAction() {
    const { infoId, isStocked } = this.state;

    commonFetch({
      uri: '/api/info/stock/',
      body: {
        infoId,
        toStockState: !isStocked,
      },
    });

    this.setState({
      isStocked: !isStocked,
    });
  }

  render() {
    const {
      style,
      isHidden,
    } = this.props;

    if (isHidden) {
      return null;
    }

    const buttonStyle = {
      ...style,
      textTransform: 'none',
    };

    return (
      <NormalButton
        title={this.state.isStocked ? 'Stocked' : 'Stock'}
        isColored={this.state.isStocked}
        style={buttonStyle}
        onClick={() => this.stockAction()}
      />
    );
  }
}

export default StockButton;
