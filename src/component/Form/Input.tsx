/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import { AbstractInput, BaseProps } from 'veigar/Input/AbstractInput';
import field from 'veigar/Form/field';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

interface BaseInputProps extends BaseProps {
}

export type InputProps = BaseInputProps & TextFieldProps;

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
@field
export class Input extends AbstractInput<InputProps, any> {

  handleChange(event) {
    const {onChange} = this.props;
    const value = event.target.value;
    this.setState({value});
    this.valid();
    onChange && onChange(event);
  }

  render() {
    const {error, mismatch, miss} = this.state;

    const {missMsg, mismatchMsg, errorMsg, ...props} = this.props;

    const newProps: InputProps = {...props};

    const isError = miss || mismatch || error;
    if (isError) {
      if (miss) {
        newProps.helperText = missMsg;
      } else if (mismatch) {
        newProps.helperText = mismatchMsg;
      } else {
        newProps.helperText = errorMsg;
      }
    }

    return (
      <TextField {...newProps}
                 error={miss || mismatch || error}
                 onChange={this.handleChange}
                 onBlur={this.handleChange}
                 value={this.state.value}
      />
    )
  }
}

/**
 * 渲染form表单组
 * @param fields        表单配置
 * @param afterElement  表单后面的元素
 * @returns {any}
 */
export function renderFieldGroup(fields, afterElement) {
  const children: any = fields.map((field, index) => {
    const {after} = field;
    return (
      <Grid container
            key={index}
            justify="space-between"
            alignItems="center"
            style={{
              minHeight: 90
            }}
      >
        <Input {...field}
               fullWidth
               required
               key={index}
        />
        {after}
      </Grid>
    )
  });
  children.push(afterElement);
  return children;
}
