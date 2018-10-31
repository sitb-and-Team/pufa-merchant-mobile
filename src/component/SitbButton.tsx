/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const defaultStyle = {
  color: '#FFF'
};

export interface Props extends ButtonProps {
  loading?: boolean
}

export const SitbButton = ({
                  loading = false, disabled,
                  children, fullWidth = true, variant = 'contained',
                  color = 'primary', style = defaultStyle,
                  ...props
                }: Props = {}) => (
  <Button {...props}
          disabled={loading || disabled}
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          style={style}
  >
    {loading && <CircularProgress size={20}/>}
    {children}
  </Button>
);
