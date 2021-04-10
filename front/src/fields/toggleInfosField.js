import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SelectableInfoCard from '../components/selectableInfoCard';

class ToggleInfosField extends PureComponent {
  render() {
    const {
      groupId,
      userId,
      data,
      changeOtherInfo,
      redirectTo,
      toggleShowOthers,
      stockAction,
    } = this.props;

    if (data.isShowOthers) {
      return (
        <div
          style={{
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: '#339',
          }}
        >
          {data.infos.map((item, index) => (
            <SelectableInfoCard
              key={item.info_id}
              info={item}
              isEdittable
              isSelected={data.selectOtherKey === index}
              toggleShowOthers={() => {}}
              selectAction={() => changeOtherInfo(groupId, index)}
              stockAction={() => stockAction(groupId, index)}
              redirectTo={(link) => redirectTo(link)}
              isSelecting
            />
          ))}
        </div>
      );
    }

    const selectedInfo = data.infos[data.selectOtherKey];

    return (
      <div>
        <SelectableInfoCard
          info={selectedInfo}
          isSelectable={data.infos.length !== 1}
          isSelecting={false}
          isEdittable
          isStocked={selectedInfo.isStocked}
          toggleShowOthers={() => toggleShowOthers(groupId)}
          stockAction={() => stockAction(groupId, data.selectOtherKey)}
          redirectTo={(link) => redirectTo(link)}
        />
      </div>
    );
  }
}

export default withRouter(ToggleInfosField);
