import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';

import '../styles/Home.scss';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
export class Home extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <div className="Home">
        <div className="header">
          <Tab icon={<CloseIcon />} />
          <span className="title">我</span>
          <Tab icon={<MoreIcon />} />
        </div>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>
          <div className="income">
            <span className="todayIncome">今日收入(元)</span>
            <span className="income-today">0</span>
          </div>
          <div className="content">
            <Tab label="收款" icon={<CloudDownloadIcon />} />
            <Tab label="收款记录" icon={<EventNoteIcon />} />
            <Tab label="银行卡" icon={<CreditCardIcon />} />
          </div>
        </TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
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
              <Tab selected={true} label="聚超市" icon={<ShoppingCartIcon />} />
              <Tab label="聚兜兜" icon={<HomeIcon />} />
              <Tab label="我" icon={<PersonIcon />} />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }

}
