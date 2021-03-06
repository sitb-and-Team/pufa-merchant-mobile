/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/14
 */
import * as React from 'react';
import Form from 'veigar/Form';
import {connect} from "react-redux";
import {autoBind} from '@sitb/wbs/autoBind';
import {withStyles} from '@material-ui/core/styles';
import {SitbButton} from '../../component/SitbButton';
import {getActions} from '../../core/store';
import {renderFieldGroup} from '../../component/Form/Input';

import {lang} from '../../locale';
import alert from '../../component/Alert';
import {BrandTemplate} from './BrandTemplate';
import {routerPath} from '../../core/router.config';
import URL from "../../constants/URL";
// import URL from "../../constants/URL";

// css
const styles: any = theme => ({
  formServiceBtn: {
    marginTop: 10
  }
});

@connect(({session, binding}) => ({
  hasBinding: session.hasBinding,
  countDown: binding.countDown,
  processing: binding.processing
}))
@autoBind
class Container extends React.Component<any, any> {
  form;

  handleSubmit(e) {
    e.preventDefault();
    const errorFields = this.form.validate();
    // 如果存在表单错误
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    const values: any = this.form.getValue();
    getActions().binding.startQuery(values);
    console.log('submit', values);
  }
  handleExit() {
    location.href = `${URL.session}/auth-server?redirectUri=${encodeURIComponent(location.href)}&appUri=${URL.session}/access-token`;
  }

  /**
   * 发送验证码
   * @param e
   */
  handleSand(e) {
    e.preventDefault();
    const values: any = this.form.getValue();
    // 获取商户号
    const {merchantNo} = values;
    if (!merchantNo) {
      alert('请输入商户号');
      return;
    }
    getActions().binding.sendVerificationCode({merchantNo});
    console.log('send', values);
  }

  render() {
    const {classes, countDown, processing, hasBinding} = this.props;
    //表单配置
    const fields: any = [{
      label: lang.merchantNo,
      name: 'merchantNo',
    }, {
      label: lang.checkValue,
      name: 'checkValue',
      maxLength: 4,
      style: {
        width: '55%'
      },
      after: (
        <SitbButton loading={countDown !== 0}
                    key="submit"
                    fullWidth={false}
                    style={{
                      width: 110,
                      height: 32,
                      pointerEvents: countDown === 0 ? 'auto' : 'none',
                      color: '#fff'
                    }}
                    onClick={this.handleSand}
        >
          {countDown === 0 ? '发送验证码' : countDown}
        </SitbButton>
      )
    }];
    // 绑定按钮
    const serviceElement: any = (
      <React.Fragment>
        <SitbButton loading={processing}
                    key="submit"
                    size="large"
                    className={classes.formServiceBtn}
                    onClick={e => this.handleSubmit(e)}
        >
          {'立即绑定'}
        </SitbButton>
        <SitbButton key="exit"
                    size="large"
                    className={classes.formServiceBtn}
                    onClick={this.handleExit}
        >
          {'退出绑定'}
        </SitbButton>
      </React.Fragment>
    );
    return (
      <BrandTemplate serviceButtonName="返回商户管理"
                     serviceButtonBan={!hasBinding}
                     routePath={routerPath.merchantLogin}
      >
        <Form ref={(form: Form) => this.form = form}
              className="content-form"
        >
          {renderFieldGroup(fields, serviceElement)}
        </Form>
      </BrandTemplate>
    )
  }
}

export const MerchantBinding = withStyles(styles)(Container as any);
