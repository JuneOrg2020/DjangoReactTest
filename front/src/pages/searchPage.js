import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/searchReducer';
import NormalButton from '../components/normalButton';
import SearchResults from '../fields/searchResultsField';
import LinkerSearchResults from '../fields/linkerSearchResultsField';
import { commonFetch } from '../modules/common';

class SearchPage extends Component {
  onChange(e) {
    const { action } = this.props;
    action.changeWord(e.target.value);
  }

  onKeyDown(e) {
    const { beforeSearchWord, searchWord } = this.props.state.search;
    const { searchOpt } = this.props.state.search;

    if (e.key === 'Enter' && beforeSearchWord !== searchWord) {
      this.search(searchOpt);
    }
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  search(opt) {
    const { searchWord } = this.props.state.search;
    const { action } = this.props;

    commonFetch({
      uri: `/api/info/search/${opt}/`,
      body: {
        searchWord,
      },
      successCallback: (json) => {
        action.setResult(searchWord, opt, json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  changeResult(opt) {
    const { action } = this.props;
    const { searchOpt } = this.props.state.search;

    this.search(opt);

    if (searchOpt !== opt) {
      action.changeResultOpt(opt);
    }
  }

  render() {
    const { search } = this.props.state;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '160px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ width: '100%' }}
            label="Search"
            onChange={(e) => this.onChange(e)}
            onKeyDown={(e) => this.onKeyDown(e)}
          />

          <NormalButton
            title="Info"
            isColored={search.searchOpt === 'info'}
            style={{ margin: '4px' }}
            onClick={() => this.changeResult('info')}
          />
          <NormalButton
            title="Linker"
            isColored={search.searchOpt === 'linker'}
            style={{ margin: '4px' }}
            onClick={() => this.changeResult('linker')}
          />
          <NormalButton
            title="Relation"
            isColored={search.searchOpt === 'relation'}
            style={{ margin: '4px' }}
            onClick={() => this.changeResult('relation')}
          />
        </div>
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>
            Result
          </h2>
          <div style={{ display: search.searchOpt === 'info' ? 'block' : 'none' }}>
            <SearchResults
              data={search.infoResults}
              redirectTo={(link) => this.redirectTo(link)}
            />
          </div>
          <div style={{ display: search.searchOpt === 'linker' ? 'block' : 'none' }}>
            <LinkerSearchResults
              data={search.linkerResults}
              redirectTo={(link) => this.redirectTo(link)}
            />
          </div>
          <div style={{ display: search.searchOpt === 'relation' ? 'block' : 'none' }}>
            <SearchResults
              data={search.relResults}
              redirectTo={(link) => this.redirectTo(link)}
            />
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

export default connect(mapStateToProp, mapDispatchToProp)(SearchPage);
