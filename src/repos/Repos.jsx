import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './Search';

import Header from './Header';
import List from './List';
import Pager from './Pager';

import style from './repos.module.css';

const Repos = withRouter(({
  loading,
  history,
  license,
  licenses,
  items,
  total,
  page
}) => {

  return (
    <main>
      <Search/>
      <h1 className={style.title}>
        Popular Javascript repos from last month
      </h1>
      <Header {...{license, licenses, history, total}}/>
      <List {...{items, loading, page, total}}/>
      <Pager {...{history, page, total}} display={items.length}/>
    </main>
  );
});

const mapStateToProps = state => state.repos;

export default connect(mapStateToProps)(memo(Repos));

Repos.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array,
};
