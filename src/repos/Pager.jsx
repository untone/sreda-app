import React from 'react';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ru_RU'
import { withRouter, Link } from 'react-router-dom';
import Octicon, { ChevronLeft, ChevronRight } from '@githubprimer/octicons-react';

import { maxTotal, perPage } from '../constants';
import { displayTotal, searchParams } from '../utils';

import style from './repos.module.css';

const Pager = withRouter(({display, history, page, total}) => {
  const pagerItem = (current, type) => {
    let path = searchParams(history, ['page', current]);
    let display = displayTotal(current);
    if (type === 'prev') {
      display = <Octicon key="icon" icon={ChevronLeft}/>;
    }
    if (type === 'next') {
      display = <Octicon key="icon" icon={ChevronRight}/>;
    }
    if (current === page || current === 0) {
      return (
        <span className={style.page}>
          {display}
        </span>
      );
    }
    return (
      <Link to={path} className={style.page}>
        {display}
      </Link>
    );
  };

  if (!display) {
    return null;
  }

  return (
    <Pagination
      locale={localeInfo}
      className={style.pagination}
      hideOnSinglePage
      current={page}
      itemRender={pagerItem}
      pageSize={perPage}
      showLessItems
      total={total > maxTotal ? maxTotal : total}
      showPrevNextJumpers={false}
    />
  );
});

export default Pager;
