/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';

class Container extends React.Component {
  onClick = () => {
    getActions().navigator.navigate(routerPath.trade);
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>{'test'}</button>
        {'user'}
      </div>
    )
  }
}

export const User = Container;
