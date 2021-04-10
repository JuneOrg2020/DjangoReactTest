import React, { PureComponent } from 'react';
import { TextField } from '@material-ui/core';

class CommonTextArea extends PureComponent {
  render() {
    const { value, onChange, isDisabled } = this.props;
    return (
      <TextField
        disabled={isDisabled}
        value={value}
        onChange={(e) => onChange(e)}
        InputLabelProps={{ style: { color: '#fff' } }}
        multiline
        rows={4}
        style={{ width: '98%' }}
        inputProps={{ style: { border: '1px solid #fff', color: '#fff' } }}
      />
    );
  }
}

export default CommonTextArea;
