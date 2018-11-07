/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import Form from 'veigar/Form';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {renderFieldGroup} from '../../component/Form/Input';
import {SitbButton} from '../../component/SitbButton';
import {autoBind} from '@sitb/wbs/autoBind';
import {getActions} from '../../core/store';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {lang} from '../../locale';

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  }
});

@autoBind
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
      submitLoading: false,
      /**
       * 打开商户列表
       */
      isMerchantSelect: false,
      merchant: '',
      /**
       * 是否进入绑定页面状态
       */
      isBind: false
    };
  }

  handleChange = name => event => {
    this.setState({[name]: Number(event.target.value)});
  };

  merchantSwitch(status) {
    this.setState({isMerchantSelect: status});
  }

  bindSwitch() {
    this.setState(prefix => ({
      isBind: !prefix.isBind
    }));
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
    getActions().binding.startQuery(values.merchantNo);
    console.log('submit', values);
  }

  handleSand(e) {
    e.preventDefault();
    const values: any = this.form.getValue();
    const {merchantNo} = values;
    if (!merchantNo) {
      alert('请输入商户号');
      return;
    }
    getActions().binding.sendVerificationCode({merchantNo});
    console.log('send', values);
  }

  render() {
    const {countDown, submitLoading, merchant, isBind, isMerchantSelect} = this.state;
    const {classes} = this.props;
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
      <SitbButton loading={submitLoading}
                  key="submit"
                  size="large"
                  className={classes.formServiceBtn}
                  onClick={e => this.handleSubmit(e)}
      >
        {'立即绑定'}
      </SitbButton>
    );
    const merchantList = [{
      merchantNo: '1000',
      merchantName: 'test111'
    }, {
      merchantNo: '1001',
      merchantName: 'test111'
    }, {
      merchantNo: '1002',
      merchantName: 'test111'
    }, {
      merchantNo: '1003',
      merchantName: 'test111'
    }];
    return (
      <Grid container
            justify="center"
            className={classes.main}
      >
        <Grid item
              container
              justify="center"
              alignItems="center"
              xs={12}
        >
          <AccountCircle className={classes.mainLogo}/>
        </Grid>

        <Grid item
              xs={12}
              className={classes.mainForm}
        >
          {
            isBind && (
              <Form ref={(form: Form) => this.form = form}
                    className="content-form"
              >
                {renderFieldGroup(fields, serviceElement)}
              </Form>
            ) || (
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5"
                              component="h3"
                              gutterBottom
                  >
                    {'已绑定的商户'}
                  </Typography>
                  {
                    merchantList.map((merchant, index) => (
                      <Typography key={index}
                                  component="p"
                                  gutterBottom
                      >
                        {`${merchant.merchantNo}-${merchant.merchantName}`}
                      </Typography>
                    ))
                  }
                </CardContent>
                <CardActions>
                  <Button onClick={() => this.merchantSwitch(true)}
                          color="primary"
                  >{'请选择你要管理的商户'}</Button>
                </CardActions>
              </Card>
            )
          }
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
                  onClick={this.bindSwitch}
          >
            {isBind && '返回商户管理' || '绑定新商户'}
          </Button>
        </Grid>
        <Dialog disableBackdropClick
                disableEscapeKeyDown
                open={isMerchantSelect}
                onClose={() => this.merchantSwitch(false)}
        >
          <DialogTitle>{lang.merchant.list}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">{lang.merchantNo}</InputLabel>
                <Select native
                        value={merchant}
                        onChange={this.handleChange('merchant')}
                        input={<Input id="age-native-simple"/>}
                >
                  <option value=""
                          disabled
                  />
                  {
                    merchantList.map((merchant, index) => (
                      <option value={merchant.merchantNo}
                              key={index}
                      >
                        {`${merchant.merchantNo}-${merchant.merchantName}`}
                      </option>
                    ))
                  }
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.merchantSwitch(false)}
                    color="primary"
            >
              {"取消"}
            </Button>
            <Button onClick={() => this.merchantSwitch(false)}
                    color="primary"
            >
              {"确认"}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}

export const Binding = withStyles(styles)(Container as any);
