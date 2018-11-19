/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/19
 */
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Grid from "@material-ui/core/Grid/Grid";


// css
const styles = theme => ({});

export interface Props {
  classes?: any;
}

class Container extends React.Component<any, any> {

  render() {
    const {classes} = this.props;
    return (
      <Grid container
            justify="center"
            className={classNames(classes.main, classes.main_mode)}
      >
        <Card className={classes.mainCard}>
          <CardActionArea>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image={require('../../assets/pictureInfo.png')}
                       title="Contemplative Reptile"
            />
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export const QrCode = withStyles(styles)(Container);
