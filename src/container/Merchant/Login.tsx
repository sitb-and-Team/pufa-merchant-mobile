/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {autoBind} from '@sitb/wbs/autoBind';
import {getActions} from '../../core/store';

import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {routerPath} from "../../core/router.config";
import {getOperator, setMerchantId} from "../../core/SessionServices";
import alert from '../../component/Alert';
import {BrandTemplate} from './BrandTemplate';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import {SitbButton} from "../../component/SitbButton";

// css
const styles: any = theme => ({
  formControl: {
    width: '100%'
  },
  labelControl: {
    // margin: theme.spacing.unit,
    margin: 0,
    borderColor: '#ddd',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 4
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  contentExitValue: {
    paddingRight: 0
  },
  formServiceBtn: {
    marginTop: 10
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
      merchantNo: ''
    };
  }

  /**
   * 保存商户号
   * @returns {(event) => void}
   * @param e
   * @param checked
   */
  handleChange(e, checked) {
    this.setState({merchantNo: checked});
  };


  /**
   * 选择商户登录
   */
  loginSubmit() {
    const {merchantNo} = this.state;
    console.log(merchantNo);
    if (!merchantNo) {
      alert('请选择商户');
      return;
    }
    setMerchantId(merchantNo.toString());
    getActions().navigator.navigate(`${routerPath.app}/Home`);
    this.setState({
      merchantNo: ''
    });
  }

  /**
   * 渲染radio
   * @param merchants 商户信息
   */
  renderRadioGroup(merchants) {
    const {classes} = this.props;
    return merchants.merchants.map((merchant, index) => (
      <FormControlLabel label={`${merchant.merchantNo}-${merchant.merchantName}`}
                        key={index}
                        value={merchant.merchantNo}
                        control={<Radio color="primary" className={classes.radio}/>}
                        labelPlacement={"end"}
                        className={classes.labelControl}
      >
      </FormControlLabel>
    ));
  }


  render() {
    const {merchantNo} = this.state;
    const {classes} = this.props;
    // 取缓存merchants
    const merchants: any = getOperator() || [];
    return (
      <Grid>
        <BrandTemplate serviceButtonName="绑定新商户"
                       routePath={routerPath.merchantBinding}
        >
          <Typography variant="h5"
                      component="h3"
                      gutterBottom
          >
            {'已绑定的商户'}
          </Typography>
          <form>
            {
              (merchants && merchants.length !== 0) && (
                <FormControl className={classes.formControl}>
                  <RadioGroup aria-label={merchantNo}
                              name={merchantNo}
                              value={merchantNo}
                              onChange={this.handleChange}
                  >
                    {
                      this.renderRadioGroup(merchants)
                    }
                  </RadioGroup>
                </FormControl>
              ) || <p>{'获取数据失败'}</p>
            }
          </form>
          <SitbButton key="submit"
                      size="large"
                      className={classes.formServiceBtn}
                      onClick={this.loginSubmit}
          >
            {'确认'}
          </SitbButton>
        </BrandTemplate>
      </Grid>
    )
  }
}

export const MerchantLogin = withStyles(styles)(Container as any);
