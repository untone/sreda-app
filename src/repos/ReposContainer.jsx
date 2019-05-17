import { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchParams } from '../utils';
import Repos from './Repos';

const mapStateToProps = state => state.repos;

const mapDispatchToProps = dispatch => {
  return {
    onChange: (history, add, remove) => {
      history.push(searchParams(history, add, remove));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(withRouter(Repos)));


