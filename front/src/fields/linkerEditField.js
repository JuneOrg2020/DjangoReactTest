import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NormalButton from '../components/normalButton';
import { linkerTypeName } from '../app/config';

class LinkerEditField extends PureComponent {
  render() {
    const {
      changeType,
      changeText,
      linkerType,
      defaultText,
      onClick,
      isEditMode,
    } = this.props;

    return (
      <div>
        <Select
          style={{ width: '150px', marginTop: '16px', color: '#fff' }}
          value={linkerType}
          onChange={(e) => changeType(e)}
        >
          <MenuItem value={-1}>Select Type</MenuItem>
          {linkerTypeName.map((item, index) => (
            <MenuItem key={item} value={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <TextField
          InputLabelProps={
            { style: { color: '#fff' } }
          }
          inputProps={{ style: { color: '#fff' } }}
          style={{ width: '55%', maxWidth: '475px' }}
          label="Input Linker"
          defaultValue={defaultText}
          onChange={(e) => changeText(e)}
        />
        <NormalButton
          title={isEditMode ? 'Edit Linker' : 'Add Linker'}
          style={{ margin: '4px' }}
          onClick={() => onClick()}
        />
      </div>
    );
  }
}

export default withRouter(LinkerEditField);
