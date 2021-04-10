import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SelectableInfoCard from '../components/selectableInfoCard';

class AllLinkedInfo extends PureComponent {
  render() {
    const {
      data,
      userId,
      redirectTo,
      selectAction,
      stockAction,
    } = this.props;

    console.log(data.allInfo);
    return (
      <div>
        {data.allInfo.map((item, index) => (
          <SelectableInfoCard
            key={item.info_id}
            info={item}
            isEdittable={item.userId === userId}
            selectAction={() => selectAction(item.info_id)}
            stockAction={() => stockAction(index)}
            redirectTo={(link) => redirectTo(link)}
            isSelected={item.info_id === data.selectLinkedInfoId}
            isSelecting
          />
        ))}
      </div>
    );
  }
}

export default withRouter(AllLinkedInfo);
