/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';
import objectPath from 'object-path';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

// css
const styles: any = theme => ({
  cardTitle: {
    marginTop: 24
  },
  cardItem: {
    marginTop: 5
  },
  itemLabel_mode: {
    color: theme.palette.text.secondary
  },
  itemValue_mode: {
    color: theme.palette.text.primary
  }
});

export interface Item {
  /**
   * 标题
   */
  label: string;
  /**
   * 值
   */
  value: string;
}

export interface Props {
  classes?: any;
  /**
   * 卡片标题
   */
  title?: string;
  /**
   * 卡片信息
   */
  config: Array<Item>;
  /**
   * 后台数据
   */
  dataResource?: any;
  titleIcon?: any;
}

class Container extends React.Component<Props> {

  filterValue(dataResource, item) {
    let value: any = objectPath.get(dataResource, item.value);
    if (item.setValue) {
      value = item.setValue(value);
    }
    // console.log(dataResource, item, value);
    return value;
  }

  render() {
    const {classes, titleIcon, title, config, dataResource} = this.props;
    return (
      <React.Fragment>
        <Typography gutterBottom
                    variant="h5"
                    component="h5"
                    className={classes.cardTitle}
        >
          <Grid item
                container
                alignItems="center"
          >
            {titleIcon}
            {title}
          </Grid>
        </Typography>
        <Typography gutterBottom
                    component="div"
        >
          {
            config.map((values, index) => (
              <Grid item
                    container
                    key={index}
                    justify="space-between"
                    className={classes.cardItem}
              >
                <div className={classes.itemLabel_mode}>{`${values.label}:`}</div>
                <div className={classes.itemValue_mode}>{this.filterValue(dataResource, values)}</div>
              </Grid>
            ))
          }
        </Typography>
        <Divider component="div"/>
      </React.Fragment>
    )
  }
}

export const CardContent = withStyles(styles)(Container);
