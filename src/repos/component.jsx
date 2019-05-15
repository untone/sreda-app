import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ru_RU'
import { Link } from 'react-router-dom';
import Octicon, { ChevronLeft, ChevronRight, Law, Star } from '@githubprimer/octicons-react';

import { maxTotal, perPage } from '../api';
import { setLicense, setPage } from './actions';

import style from './repos.module.css';

const Repos = withRouter(({
  dispatch,
  loading,
  history,
  license,
  licenses,
  items,
  total,
  page
}) => {

const maxDisplay = total > maxTotal ? maxTotal : total;

const displayTotal = num => new Intl.NumberFormat('ru-RU', {style: 'decimal'}).format(num);

const searchParams = (key, value) => {
  let searchQuery = new URLSearchParams(history.location.search);
  if (searchQuery.has(key)) {
    searchQuery.delete(key);
  }
  searchQuery.append(key, value);
  return `?${searchQuery.toString()}`;
}

  const onLicenseChange = ({target: {value}}) => {
    dispatch(setLicense(value));
    const path = searchParams('license', value);
    history.push(path);
  };

  const onPageChange = event => {
    dispatch(setPage(parseInt(event)));
    const path = searchParams('page', event);
    history.push(path);
  };

  const repoItem = ({full_name, id, license = {name: ''}, stargazers_count}) => (
    <li key={id} className={style.item} data={JSON.stringify(license)}>
      <h3 className={style.name}>
        {full_name}
      </h3>
      <span className={style.details}>
        <Octicon key="star" icon={Star} className={style.icon}/>
        <span className={style.label}>
          {stargazers_count}
        </span>
        {license && license.key !== 'other'
          ? <Fragment>
              <Octicon key="law" icon={Law} className={style.icon}/>
              <span className={style.label}>
                {license.spdx_id}
              </span>
            </Fragment>
          : null}
      </span>
    </li>
  );

  const pagerItem = (current, type) => {
    let path = searchParams('page', current);
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
  }

  const licenseItem = ({key, spdx_id}) => {
    return (
      <option key={key} value={key} defaultValue={key === license}>
        {spdx_id}
      </option>
    );
  };

  const reposList = (items) => {
    return (
      <Fragment>
        <h1 className={style.title}>
          Popular Javascript repos from last month
        </h1>
        <header className={style.header}>
          {total ?
            <div className={style.counter}>
              {total > maxTotal ? 'More than ' : ''}
              {displayTotal(maxDisplay)} result{total > 1 ? 's' : ''} 
            </div>
          :
            <div className={style.counter}>
              No results
            </div>
          }
          <div className={style.filter}>
            Filter by license: 
            <select className={style.license} onChange={onLicenseChange}>
              <option value='' defaultValue={!license.length}>
                All
              </option>
              {licenses.map(licenseItem)}
            </select>
          </div>
        </header>
        {items.length ?
          <Fragment>
            <ol className={style.list}>
              {items.map(repoItem)}
            </ol>
            <Pagination
              locale={localeInfo}
              className={style.pagination}
              onChange={onPageChange}
              hideOnSinglePage
              current={page}
              itemRender={pagerItem}
              pageSize={perPage}
              showLessItems
              total={total > maxTotal ? maxTotal : total}
              showPrevNextJumpers={false}
            />
          </Fragment>
        :
          <div className={style.list}>
            <div className={style.empty}>
              {loading ? 'loading' : 'No repos found'}
            </div>
          </div>
        }
      </Fragment>
    );
  };

  return (
    <main className={style.repos}>
      {reposList(items, {page, total})}
    </main>
  );
});

const mapStateToProps = state => state.repos;

export default connect(mapStateToProps)(memo(Repos));

Repos.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  items: PropTypes.array,
};
