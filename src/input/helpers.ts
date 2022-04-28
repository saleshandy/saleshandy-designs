import classNames from 'classnames';
import { Size, Variant } from './enums';

export const getSizeSubClass = (size: Size): string => {
  return classNames({
    sm: size === Size.Small,
    md: size === Size.Medium,
    lg: size === Size.Large,
  });
};

export const getVariantSubClass = (variant: Variant): string => {
  return classNames({
    error: variant === Variant.Error,
    warning: variant === Variant.Warning,
    success: variant === Variant.Success,
    default: variant === Variant.Default,
    succeeded: variant === Variant.Succeeded,
  });
};
