import React, { Fragment, memo } from 'react';
import Item from './Item';

import style from './repos.module.css';

const List = ({items, loading}) => (
  <Fragment>
    {items.length ?
      <ol className={style.list}>
        {items.map(Item)}
      </ol>
    :
      <div className={style.list}>
        <div className={style.empty}>
          {loading ? 'loading' : 'No repos found'}
        </div>
      </div>
    }
  </Fragment>
);

export default memo(List);
