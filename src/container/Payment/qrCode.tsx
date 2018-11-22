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
import Grid from "@material-ui/core/Grid/Grid";


// css
const styles = theme => ({
  main: {
    background: theme.palette.background.paper,
  },
  cardMedia: {
    objectFit: 'cover'
  },
  mainForm: {
    marginLeft: 32,
    marginRight: 32,
    marginTop: 150
  },
  title: {
    marginLeft: 30,
    marginBottom: 0
  }
});

export interface Props {
  classes?: any;
}


class Container extends React.Component<any, any> {

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.main}>
        <Grid xs={12}
              className={classes.mainForm}
        >
          <Card>
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
        </Grid>
      </Grid>
    )
  }
}

// @ts-ignore
export const QrCode = withStyles(styles)(Container);
