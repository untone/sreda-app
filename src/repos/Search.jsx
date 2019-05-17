import React from 'react';

import style from './repos.module.css';

const Search = ({
  history,
  onChange,
  search,
}) => {
  const handleChange = ({
    nativeEvent: {
      target: { value },
      which
    }
  }) => {
    if (which === 13) {
      onChange(history, ['search', value], 'page');
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
};

export default Search;
