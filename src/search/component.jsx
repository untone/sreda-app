import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { setName } from './actions';

import style from './search.module.css';

const Search = withRouter(({
  dispatch,
  history,
  name
}) => {
  const handleChange = ({
    nativeEvent: {
      target: { value },
      which
    }
  }) => {
    if (which === 13) {
      dispatch(setName({value, which}));
      const path = value ? `/?search=${value}` : '/';
      history.push(path);
    }
  };
  return (
    <header className={style.header}>
      <DebounceInput
        autoFocus
        className={style.input}
        minLength={2}
        debounceTimeout={300}
        placeholder="Enter name or part"
        value={name}
        onChange={event => handleChange(event)}
        onKeyUp={event => handleChange(event)}
      />
    </header>
  );
});

const mapStateToProps = state => state.search;

export default connect(mapStateToProps)(memo(Search));
