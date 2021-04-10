import React, { PureComponent } from 'react';
import InfoCard from './infoCard';
import LinkerCard from './linkerCard';
import NormalButton from './normalButton';
import StockButton from './stockButton';

class SelectableInfoCard extends PureComponent {
  render() {
    const {
      info,
      isSelected,
      isSelectable,
      isSelecting,
      isEdittable,
      toggleShowOthers,
      selectAction,
      redirectTo,
    } = this.props;

    const buttonStyle = {
      marginTop: '4px',
      marginRight: '3px',
    };

    return (
      <InfoCard
        isSelected={isSelected}
      >
        <LinkerCard
          linkers={info.linker}
        />
        <div style={{ paddingTop: '3px', marginTop: '3px', borderTop: '1px solid #00f' }}>
          {info.info_text}
        </div>
        <div style={{ borderTop: '1px solid #00f' }}>
          <NormalButton
            title="OtherInfo"
            isHidden={!isSelectable}
            style={buttonStyle}
            onClick={() => toggleShowOthers()}
          />
          <NormalButton
            title="Select"
            isColored={isSelected}
            isHidden={!isSelecting}
            style={buttonStyle}
            onClick={() => selectAction()}
          />
          <StockButton
            isStocked={info.is_stocked}
            infoId={info.info_id}
            style={buttonStyle}
          />
          <NormalButton
            title="Edit"
            isHidden={!isEdittable}
            style={buttonStyle}
            onClick={() => redirectTo(`/edit/${info.info_id}`)}
          />
          <NormalButton
            title="Map"
            style={buttonStyle}
            onClick={() => redirectTo(`/map/${info.info_id}`)}
          />
        </div>
      </InfoCard>
    );
  }
}

export default SelectableInfoCard;
