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
import {getMerchantId} from "../../core/SessionServices";
import URL from "../../constants/URL";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardContent from '@material-ui/core/CardContent';


// css
const styles = theme => ({
  cardMedia: {
    objectFit: 'cover'
  },
  title: {
    marginLeft: 30
  }
});

export interface Props {
  classes?: any;
}


class Container extends React.Component<any, any> {

  render() {
    const {classes} = this.props;
    // @ts-ignore
    // @ts-ignore
    return (
      <div>
        <Card component="nav">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom
                          variant="h5"
                          component="h2"
                          className={classes.title}
              >
                我的银联收款码
              </Typography>
            </CardContent>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image={`${URL.qrCode}?merchantCode=${getMerchantId()}`}
                       title="Contemplative Reptile"
            />
          </CardActionArea>
        </Card>
        {/*<img className={classes.barcode} src={`${URL.qrCode}/barcode?content=${getMerchantId()}`}/>*/}
      </div>
    )
  }
}

// @ts-ignore
export const QrCode = withStyles(styles)(Container);
