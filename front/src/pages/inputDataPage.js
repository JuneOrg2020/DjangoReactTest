import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/pageTitle';
import CommonTextArea from '../components/commonTextArea';
import NormalButton from '../components/normalButton';
import SearchResults from '../fields/searchResultsField';
import { actions } from '../reducers/inputDataReducer';
import { commonFetch, locationTo } from '../modules/common';

class InputData extends Component {
  onChange(e) {
    const { action } = this.props;
    action.setText(e.target.value);
  }

  addInfo() {
    const { text } = this.props.state.inputData;
    const { action } = this.props;

    if (text.length === 0) {
      action.openModal('テキストを入力してください。');
      return;
    }

    commonFetch({
      uri: '/api/info/addInfo',
      body: {
        text,
      },
      successCallback: (json) => {
        locationTo(`/edit/${json.id}/`);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  stockAction(itemKey) {
    const { action } = this.props;
    action.stockFromSearch(itemKey);
  }

  render() {
    const { searchResults } = this.props.state.inputData;
    const { userId } = this.props.state.userState;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '160px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <PageTitle text="Input Data" />
          <div>
            <CommonTextArea
              onChange={(e) => this.onChange(e)}
            />
            <div>
              <NormalButton
                style={{ marginTop: '2px' }}
                title="Add Data"
                onClick={() => this.addInfo()}
              />
            </div>
            <h2>Search Result</h2>
            <div style={{ width: '98%', margin: '5px' }}>
              <SearchResults
                data={searchResults}
                userId={userId}
                redirectTo={(link) => this.redirectTo(link)}
                stockAction={(itemKey) => this.stockAction(itemKey)}
              />
            </div>
          </div>
        </div>
      </div>
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
    action: bindActionCreators(actions, dispatch),
  }
);

export default connect(mapStateToProp, mapDispatchToProp)(InputData);
