/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';
import classNames from 'classnames';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {CardContent as SitbCardContent, Props as CardProps} from './CardContent';
import Grid from '@material-ui/core/Grid';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";

// css
const styles: any = theme => ({
  main: {
    height: '100%',
    minHeight: '100vh'
  },
  main_mode: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  cardMedia: {
    objectFit: 'cover'
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: '80%',
    flexShrink: 0,
    lineHeight: '2'
  },
  content: {
    marginBottom: 70
  },
  service: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    paddingLeft: 0,
    flexBasis: '80%',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper
  },
  serviceTel: {
    fontSize: theme.typography.pxToRem(16),
    textAlign: 'center',
    display: 'block',
    textDecoration: 'none',
  }
});

export interface Props {
  classes?: any;
  /**
   * 卡片配置
   */
  configs: Array<CardProps>;
  /**
   * 后台数据
   */
  dataResource: any;

  /**
   * 判断是否包裹折叠面板
   */
  isExpansionPanel?: boolean;

  /**
   * 判断是否有电话
   */
  isTel?: boolean;
}

class Container extends React.Component<Props> {

  /**
   * 渲染内容
   * @param configItem    config配置,见CardProps
   * @param index         下标
   * @param dataResource  数据源
   */
  renderContent({configItem, index, dataResource}) {
    const {isExpansionPanel = false, classes} = this.props;
    const {title, config, titleIcon, ActionIcon} = configItem;

    /*let props = {
      key: {index},
      title: {title},
      titleIcon: {titleIcon},
      config: {config},
      dataResource: {dataResource}
    }

    if (!isExpansionPanel) {
      props = {
        ...props,
        title: {title},
        titleIcon: {titleIcon},
      }
    }*/

    // 内容模板
    const template = (
      <SitbCardContent key={index}
                       title={title}
                       config={config}
                       titleIcon={titleIcon}
                       dataResource={dataResource}
      />
    );

    // 折叠内容模板
    const templateExpansion = (
      <SitbCardContent key={index}
                       config={config}
                       dataResource={dataResource}
      />
    );

    return isExpansionPanel && (
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary expandIcon={<ActionIcon/>}>
          <Typography>{titleIcon}</Typography>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {templateExpansion}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) || template;
  }

  render() {
    const {classes, configs, dataResource, isTel = false} = this.props;
    return (
      <Grid container
            justify="center"
            className={classNames(classes.main, classes.main_mode)}
      >
        <Card>
          <CardActionArea>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image={require('../../assets/pictureInfo.png')}
                       title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardContent className={classes.content}>
            {
              (configs.length === 0 || dataResource.length === 0) && '无数据' ||
              configs.map((config: CardProps, index) => {
                let newDataResource: any = dataResource;
                if (Array.isArray(dataResource)) {
                  newDataResource = dataResource[index];
                }
                return this.renderContent({configItem: config, index, dataResource: newDataResource});
              })
            }
          </CardContent>
          <CardContent className={classes.service}>
            {
              isTel
                ?
                <a href='tel: *********'
                  className={classes.serviceTel}>
                  服务热线：***-*******
                </a>
                :
                <br/>
            }
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export const SitbCard = withStyles(styles)(Container);
