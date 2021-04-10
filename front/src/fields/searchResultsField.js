import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SelectedInfoCard from '../components/selectedInfoCard';

class SearchResults extends PureComponent {
  render() {
    const {
      data,
      redirectTo,
    } = this.props;

    return (
      <div>
        {data.map((item) => (
          <SelectedInfoCard
            key={item.info_id}
            info={item}
            isSelected={false}
            isEdittable
            isShowMap
            isShowLinkedInfo
            isShowLinker
            redirectTo={(link) => redirectTo(link)}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(SearchResults);
