import React from 'react';
import PropTypes from 'prop-types';
import { maxTotal } from '../constants';
import { displayTotal } from '../utils';
import style from './repos.module.css';


const Header = ({
  history,
  license,
  licenses,
  onChange,
  total
}) => {
  const onLicenseChange = ({target: {value}}) => {
    onChange(history, ['license', value]);
  };
  const licenseItem = ({key, spdx_id}) => (
    <option key={key} value={key}>
      {spdx_id}
    </option>
  );
  return (
    <header className={style.header}>
      {total ?
        <div className={style.counter}>
          {total > maxTotal ? 'More than ' : ''}
          {displayTotal(total > maxTotal ? maxTotal : total)} result{total > 1 ? 's' : ''} 
        </div>
      :
        <div className={style.counter}>
          No results
        </div>
      }
      {licenses.length 
        ? <div className={style.filter}>
          Filter by license: 
          <select
            className={style.license}
            onChange={onLicenseChange}
            defaultValue={license}>
            {licenses.map(licenseItem)}
          </select>
        </div>
      : null}
    </header>
  );
};

export default Header;

Header.propTypes = {
  props: PropTypes.object
};
