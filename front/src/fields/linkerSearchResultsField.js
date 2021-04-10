import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import NormalButton from '../components/normalButton';

class LinkerSearchResults extends PureComponent {
  render() {
    const {
      data,
      redirectTo,
    } = this.props;

    return (
      <div>
        {data.map((item) => (
          <NormalButton
            key={item.linker_id}
            title={item.text}
            style={{ margin: '4px' }}
            onClick={() => redirectTo(`/linkerData/${item.linker_id}`)}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(LinkerSearchResults);
