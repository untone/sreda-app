import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchParams } from '../utils';

import style from './repos.module.css';

const Search = withRouter(({
  dispatch,
  history,
  search
}) => {
  const handleChange = ({
    nativeEvent: {
      target: { value },
      which
    }
  }) => {
    if (which === 13 && value !== search) {
      // let params = urlParams(history.location.search);
      // params.set('search', value);
      // params.delete('page');
      // const path = params.toString();
      history.push(searchParams(history, ['search', value], 'page'));
    }
  };
  return (
    <header className={style.search}>
      <input
        autoFocus
        spellCheck={false}
        type='text'
        className={style.input}
        placeholder="Enter name or part"
        defaultValue={search}
        onKeyUp={event => handleChange(event)}
      />
    </header>
  );
});

const mapStateToProps = state => state.repos;

export default connect(mapStateToProps)(memo(Search));
