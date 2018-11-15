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
  cardItem: {
    marginBottom: 10
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
  label?: string;
  /**
   * 图标type
   */
  icon?: any;
  /**
   * 值
   */
  value: string | Array<string>;
  /**
   * 需要映射展示的object
   */
  mappingObject?: object;

  /**
   * 手动setValue
   */
  setValue?: (any) => void;
  /**
   * 默认值
   */
  defaultValue?: string;
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

  /**
   * 根据对象路径取值
   * @param obj   对象
   * @param path  对象path
   * @returns {any}
   */
  objectPathGet(obj, path) {
    // 设置默认为xx
    let DEFAULT_VALUE: any = '-';
    if (path) {
      // 处理为path 为[]的情况
      path = path.replace(/\[/g, '.');
      path = path.replace(/]/g, '');
      let value = objectPath.get(obj, path);
      // value有为0的情况
      if (typeof value === 'number') {
        return `${value}`;
      }
      if (!value) {
        return DEFAULT_VALUE;
      }
      return value;
    }
    return DEFAULT_VALUE;
  }

  filterValue(dataResource, item) {
    const {value, mappingObject, setValue, defaultValue} = item;

    let RENDER_VALUE: any = `${item}`;
    // 如果是多组string 拼接
    if (Array.isArray(value)) {
      // 临时数组变量
      let DEFAULT_VALUE: any = [];
      value.forEach(stringPath => {
        DEFAULT_VALUE.push(this.objectPathGet(dataResource, stringPath));
      });
      RENDER_VALUE = DEFAULT_VALUE.join('-');
    } else {
      // 默认获取path
      RENDER_VALUE = this.objectPathGet(dataResource, value);
    }

    // 配置默认值
    if (defaultValue) {
      RENDER_VALUE = defaultValue;
    }
    // 对象映射
    if (mappingObject) {
      RENDER_VALUE = mappingObject[RENDER_VALUE]
    }
    // set设置
    if (setValue) {
      RENDER_VALUE = setValue(RENDER_VALUE);
    }
    return RENDER_VALUE;
  }

  render() {
    const {classes, titleIcon, title, config, dataResource} = this.props;
    return (
      <Grid className={classes.cardItem}>
        <Typography gutterBottom
                    variant="h6"
                    component="div"
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
      </Grid>
    )
  }
}

export const CardContent = withStyles(styles)(Container);
