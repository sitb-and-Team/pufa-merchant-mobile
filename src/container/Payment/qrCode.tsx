/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/19
 */
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Card from "@material-ui/core/es/Card/Card";
import {getActions} from "../../core/store";



// css
const styles = theme => ({
  cardMedia: {
    objectFit: 'cover'
  }
});

export interface Props {
  classes?: any;
}

class Container extends React.Component<any, any> {

  componentWillMount(){
    getActions().qrCode.startQuery();
    console.log(getActions().qrCode.startQuery())
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Card component="nav">
          <CardActionArea>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image={require('../../assets/pictureInfo.png')}
                       title="Contemplative Reptile"
            />
          </CardActionArea>
        </Card>
      </div>
    )
  }
}

// @ts-ignore
export const QrCode = withStyles(styles)(Container);
