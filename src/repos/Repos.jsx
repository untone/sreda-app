import React from 'react';
import PropTypes from 'prop-types';

import Search from './Search';
import Header from './Header';
import List from './List';
import Pager from './Pager';

import style from './repos.module.css';

const Title = () => (
  <h1 className={style.title}>
    Popular Javascript repos from last month
  </h1>
);

const Repos = (props) => {
  return (
    <main>
      <Search {...props}/>
      <Title/>
      <Header {...props}/>
      <List {...props}/>
      <Pager {...props}/>
    </main>
  );
};

export default Repos;

Repos.propTypes = {
  props: PropTypes.object
};
