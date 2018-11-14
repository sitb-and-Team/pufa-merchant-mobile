/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';

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

import { lang } from '../../locale';
import { connect } from "react-redux";
import { routerPath } from "../../core/router.config";
import { setMerchantId } from "../../core/SessionServices";
import alert from '../../component/Alert';
import { BrandTemplate } from './BrandTemplate';

// css
const styles: any = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  }
});

@connect(({session, binding}) => ({
  hasBinding: session.hasBinding,
  merchants: session.merchants,
  countDown: binding.countDown
}))
@autoBind
class Container extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      isMerchantSelect: false,
      merchantNo: ''
    };
  }

  /**
   * 保存商户号
   * @param name
   * @returns {(event) => void}
   */
  handleChange = name => event => {
    this.setState({[name]: Number(event.target.value)});
  };

  /**
   * 登录select
   * @param status
   */
  loginSwitch(status) {
    this.setState({isMerchantSelect: status});
  }

  /**
   * 选择商户登录
   */
  loginSubmit() {
    const {merchantNo} = this.state;
    if (!merchantNo) {
      alert('请选择商户');
      return;
    }
    setMerchantId(merchantNo.toString());
    getActions().navigator.navigate(routerPath.app);
  }

  render() {
    const {merchantNo, isMerchantSelect} = this.state;
    const {classes, merchants, hasBinding} = this.props;
    return (
      <Grid>
        <BrandTemplate serviceButtonName="绑定新商户"
                       routePath={routerPath.merchantBinding}
        >
          <Card>
            <CardContent>
              <Typography variant="h5"
                          component="h3"
                          gutterBottom
              >
                {'已绑定的商户'}
              </Typography>
              {
                merchants.map((merchant, index) => (
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
              <Button onClick={() => this.loginSwitch(true)}
                      disabled={!hasBinding}
                      color="primary"
              >{'请选择你要管理的商户'}</Button>
            </CardActions>
          </Card>
        </BrandTemplate>
        <Dialog disableBackdropClick
                disableEscapeKeyDown
                open={isMerchantSelect}
                onClose={() => this.loginSwitch(false)}
        >
          <DialogTitle>{lang.merchant.list}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">{lang.merchantNo}</InputLabel>
                <Select native
                        displayEmpty={false}
                        value={merchantNo}
                        onChange={this.handleChange('merchantNo')}
                        input={<Input id="age-native-simple"/>}
                >
                  <option value=""
                          disabled
                  />
                  {
                    merchants.map(({...merchant}, index) => (
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
            <Button onClick={() => this.loginSwitch(false)}
                    color="primary"
            >
              {"取消"}
            </Button>
            <Button onClick={this.loginSubmit}
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

export const MerchantLogin = withStyles(styles)(Container as any);
