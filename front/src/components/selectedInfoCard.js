import React, { PureComponent } from 'react';
import InfoCard from './infoCard';
import NormalButton from './normalButton';
import StockButton from './stockButton';

class SelectedInfoCard extends PureComponent {
  render() {
    const {
      info,
      isSelected,
      redirectTo,
      isShowLinkedInfo,
      isShowLinker,
      isShowMap,
    } = this.props;

    const buttonStyle = {
      marginTop: '4px',
      marginRight: '3px',
    };

    return (
      <InfoCard
        isSelected={isSelected}
      >
        <div>
          {info.text}
        </div>
        <div style={{ borderTop: '1px solid #00f' }}>
          <StockButton
            isStocked={info.is_stocked}
            infoId={info.info_id}
            style={buttonStyle}
          />
          <NormalButton
            title="Edit"
            style={buttonStyle}
            onClick={() => redirectTo(`/edit/${info.info_id}`)}
          />
          <NormalButton
            title="Map"
            style={buttonStyle}
            isHidden={!isShowMap}
            onClick={() => redirectTo(`/map/${info.info_id}`)}
          />
          <NormalButton
            title="All LinkedInfo"
            style={buttonStyle}
            isHidden={!isShowLinkedInfo}
            onClick={() => redirectTo(`/linkedInfo/${info.info_id}`)}
          />
          <NormalButton
            title="All Linkers"
            style={buttonStyle}
            isHidden={!isShowLinker}
            onClick={() => redirectTo(`/linker/${info.info_id}`)}
          />
        </div>
      </InfoCard>
    );
  }
}

export default SelectedInfoCard;
