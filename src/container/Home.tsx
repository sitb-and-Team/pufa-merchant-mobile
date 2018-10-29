import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

import '../styles/Home.scss';



/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
export class Home extends React.Component {

  state = {
    value: 3,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <div className="Home">
        <div className="header">
          <Icon className="close">close</Icon>
          <span className="title">我</span>
          <Icon className="more">more_horiz</Icon>
        </div>
        <div className="income">
          <span className="todayIncome">今日收入(元)</span>
          <span className="income-today">0</span>
        </div>
        <div className="content">
          <div className="option downLoad">
            <Icon className="optionIcon cloud_download">cloud_download</Icon>
            <span className="option-text">收款</span>
          </div>
          <div className="option downLoad">
            <Icon className="optionIcon cloRecord">event_note</Icon>
            <span className="option-text">收款记录</span>
          </div>
          <div className="option downLoad">
            <Icon className="optionIcon credit_card">credit_card</Icon>
            <span className="option-text">银行卡</span>
          </div>
        </div>
        <div className="footerBar">
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="聚超市" icon={<ShoppingCartIcon />} />
              <Tab label="聚兜兜" icon={<HomeIcon />} />
              <Tab label="我" icon={<PersonIcon />} />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }

}
