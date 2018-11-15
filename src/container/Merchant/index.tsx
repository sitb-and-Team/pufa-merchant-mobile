/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/15
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { MerchantBinding } from './Binding';
import { MerchantLogin } from './Login';
import { getActions } from '../../core/store';

@connect(({session}) => ({
  hasBinding: session.hasBinding
}))
export class MerchantIndex extends React.Component<any> {

  componentWillMount(){
    // 加载当前用户信息
    getActions().session.startProfile();
  }

  render() {
    const {hasBinding} = this.props;
    return (
      <React.Fragment>
        {
          hasBinding && <MerchantLogin/> || <MerchantBinding/>
        }
      </React.Fragment>
    )
  }
}
