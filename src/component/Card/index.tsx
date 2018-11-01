/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardContent as SitbCardContent, Props as CardProps } from './CardContent';
import Grid from '@material-ui/core/Grid';

// css
const styles: any = theme => ({
  main: {
    paddingTop: 12,
    paddingBottom: 12,
    height: '100%'
  },
  main_mode: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  mainCard: {
    marginLeft: 16,
    marginRight: 16
  },
  cardMedia: {
    objectFit: 'cover'
  }
});

export interface Props {
  classes?: any;
  /**
   * 卡片配置
   */
  configs: Array<CardProps>;
}

class Container extends React.Component<Props> {

  render() {
    const {classes, configs} = this.props;
    return (
      <Grid container
            alignItems="center"
            justify="center"
            className={classNames(classes.main, classes.main_mode)}
      >
        <Card className={classes.mainCard}>
          <CardActionArea>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image="http://img.zcool.cn/community/01f9eb5768ee240000018c1b3f524a.jpg"
                       title="Contemplative Reptile"
            />
            <CardContent>
              {
                configs.map((config, index) => (
                  <SitbCardContent key={index}
                                   title={config.title}
                                   config={config.config}
                                   dataResource={config.dataResource}
                  />
                ))
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export const SitbCard = withStyles(styles)(Container);
