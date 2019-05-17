import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Octicon, { Law, Star } from '@githubprimer/octicons-react';

import style from './repos.module.css';

const Item = ({full_name, id, html_url, license = {name: ''}, stargazers_count}) => (
  <li key={id} className={style.item} data={JSON.stringify(license)}>
    <h3 className={style.name}>
      <a href={html_url} target='_blank' rel='noopener noreferrer'>{full_name}</a>
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

export default Item;

Item.propTypes = {
  props: PropTypes.object
};
