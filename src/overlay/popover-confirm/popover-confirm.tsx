import React, { useEffect } from 'react';
import {
  RawPopoverConfirm,
  RawPopoverConfirmProps,
} from './raw-popover-confirm';
import { RepositionOnChange } from '../types';
import classNames from 'classnames';

export type PopoverConfirmProps = RawPopoverConfirmProps & RepositionOnChange;

export const PopoverConfirm = React.forwardRef<
  HTMLDivElement,
  PopoverConfirmProps
>(
  (
    { popper, content, footer, rePositionOnChange, className, ...rest },
    ref,
  ) => {
    useEffect(() => {
      rePositionOnChange && popper.scheduleUpdate();
    }, [content, footer, popper, rePositionOnChange]);

    return (
      <RawPopoverConfirm
        {...rest}
        className={classNames(['bs-popover-confirm', className])}
        content={content}
        footer={footer}
        ref={ref}
      />
    );
  },
);

PopoverConfirm.defaultProps = {
  rePositionOnChange: false,
};
