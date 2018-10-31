/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Form from 'veigar/Form';
import { renderFieldGroup } from '../../component/Form/Input';
import {SitbButton} from '../../component/SitbButton';
import { lang } from '../../locale';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// css
const styles: any = theme => ({
  main: {
    height: '100vh',
    background: theme.palette.background.paper
  },
  mainLogo: {
    fontSize: 100,
    color: theme.palette.primary.main
  },
  mainForm: {
    marginLeft: 32,
    marginRight: 32
  },
  formServiceBtn: {
    marginTop: 10
  },
  formServiceReset: {
    color: theme.palette.text.primary
  },
  mainFootBtn: {
    color: theme.palette.text.primary
  }
});

class Container extends React.Component<any, any> {
  form;

  constructor(props, content) {
    super(props, content);
    this.state = {
      /**
       * 验证码倒计时
       */
      countDown: 0,
      /**
       * 提交按钮禁用
       */
      submitLoading: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const errorFields = this.form.validate();
    // 如果存在表单错误
    if (errorFields) {
      console.error(errorFields);
      return;
    }
    const values: any = this.form.getValue();
    console.log('submit', values);
  }

  handleSand(e) {
    e.preventDefault();
    const values: any = this.form.getValue();
    console.log('send', values);
  }

  render() {
    const {countDown, submitLoading} = this.state;
    const {classes} = this.props;
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
                onClick={e => this.handleSand(e)}
        >
          {countDown === 0 ? '发送验证码' : countDown}
        </SitbButton>
      )
    }];

    const serviceElement: any = (
      <React.Fragment key="content-form-service">
        <Typography component="p"
                    color="textSecondary"
                    align="right"
        >
          <a href="javascript:void(0);"
             className={classes.formServiceReset}
          >
            {'忘记密码'}
          </a>
        </Typography>
        <SitbButton loading={submitLoading}
                key="submit"
                className={classes.formServiceBtn}
                onClick={e => this.handleSubmit(e)}
        >
          {'立即绑定'}
        </SitbButton>
      </React.Fragment>
    );

    return (
      <Grid container
            justify="center"
            className={classes.main}
      >
        <Grid item
              container
              justify="center"
              alignItems="flex-end"
              xs={12}
        >
          <AccountCircle className={classes.mainLogo}/>
        </Grid>
        <Grid item
              xs={12}
              className={classes.mainForm}
        >
          <Form ref={(form: Form) => this.form = form}
                className="content-form"
          >
            {renderFieldGroup(fields, serviceElement)}
          </Form>
        </Grid>
        <Grid item
              xs={12}
              container
              justify="center"
              alignItems="center"
        >
          <Button component="span"
                  color="primary"
                  className={classes.mainFootBtn}
          >
            {'已有账户，选择商户管理'}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export const Binding = withStyles(styles)(Container as any);
