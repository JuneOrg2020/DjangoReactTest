import React, { PureComponent } from 'react';

class PageTitle extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <h1>
        {text}
      </h1>
    );
  }
}

export default PageTitle;
