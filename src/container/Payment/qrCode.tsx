/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/19
 */
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



// css
const styles = theme => ({});

export interface Props {
  classes?: any;
}

class Container extends React.Component<any, any> {

  state = {
    selectedIndex: 1,
  };
  handleListItemClick = (event, index) => {
    this.setState({selectedIndex: index});
  };

  render() {

    return (
      <div>
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <ListItemText primary="Trash"/>
          </ListItem>
          <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            <ListItemText primary="Spam"/>
          </ListItem>
        </List>
      </div>
    )
  }
}

export const QrCode = withStyles(styles)(Container);
