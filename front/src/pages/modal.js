import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { commonActions } from '../reducers/commonReducer';

class ModalWindow extends PureComponent {
  render() {
    const { action } = this.props;
    const { isShow, message } = this.props.state.common;

    const messageBody = (
      <div style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
        backgroundColor: '#333',
        border: '2px solid #fff',
        boxShadow: '10px 10px 10px rgba(0,0,0,0.4)',
        padding: '4px',
      }}
      >
        <h2 id="simple-modal-title">Message</h2>
        <p id="simple-modal-description">
          {message}
        </p>
      </div>
    );

    return (
      <Modal
        open={isShow}
        onClose={() => action.closeModal()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {messageBody}
      </Modal>
    );
  }
}

const mapStateToProp = (state) => (
  {
    state,
  }
);

const mapDispatchToProp = (dispatch) => (
  {
    action: bindActionCreators(commonActions, dispatch),
  }
);

export default connect(mapStateToProp, mapDispatchToProp)(ModalWindow);
