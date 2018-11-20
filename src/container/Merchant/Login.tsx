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
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import RadioGroup from "@material-ui/core/es/RadioGroup/RadioGroup";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";

// css
const styles: any = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  contentExitValue: {
    paddingRight: 0
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
    getActions().navigator.navigate(routerPath.app);
    this.setState({
      merchantNo: ''
    });
  }


  render() {
    const {merchantNo} = this.state;
    const {classes} = this.props;
    // 取缓存merchants
    const merchants = getOperator() || [];
    return (
      <Grid>
        <BrandTemplate serviceButtonName="绑定新商户"
                       routePath={routerPath.merchantBinding}
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5"
                          component="h3"
                          gutterBottom
              >
                {'已绑定的商户'}
              </Typography>
              <form>
                <FormControl className={classes.formControl}>

                  <RadioGroup aria-label={merchantNo}
                              name={merchantNo}
                              value={merchantNo}
                              onChange={this.handleChange}
                  >
                    {
                      merchants.map(({...merchant}, index) => (
                        <FormControlLabel label={`${merchant.merchantNo}-${merchant.merchantName}`}
                                          key={index}
                                          value={merchant.merchantNo}
                                          control={<Radio color="primary"/>}
                                          labelPlacement={"start"}
                        >
                        </FormControlLabel>
                      ))
                    }
                  </RadioGroup>
                </FormControl>
              </form>
            </CardContent>
          </Card>

          <Button onClick={this.loginSubmit}
                  className={classes.contentExitValue}
                  fullWidth={true}
                  color="primary"
          >
            {"确认"}
          </Button>
        </BrandTemplate>
      </Grid>
    )
  }
}

export const MerchantLogin = withStyles(styles)(Container as any);
