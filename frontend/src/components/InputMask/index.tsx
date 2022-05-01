import { FieldProps } from 'formik';
import { FC } from 'react';
import Mask from 'react-input-mask';

interface Props {
  fieldProps: FieldProps,
  mask: string,
  placeholder: string
}

const InputMask: FC<Props> = ({ fieldProps: { field, form, ...props }, mask, placeholder }) => {
  return (
    <Mask mask={mask} {...field} {...props} placeholder={placeholder} />
  );
}

export default InputMask;