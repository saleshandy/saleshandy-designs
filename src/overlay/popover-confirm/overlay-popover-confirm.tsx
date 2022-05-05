import React, { useState } from 'react';
import { Overlay, OverlayProps } from '../overlay';
import { PopoverConfirm, PopoverConfirmProps } from './popover-confirm';
import { Placement, TriggerType } from '../enums';
import { generatePopoverConfirmId } from '../helpers';

type OverlayPopoverConfirmProps = Omit<OverlayProps, 'overlay'> &
  Partial<Pick<PopoverConfirmProps, 'id'>> &
  Pick<
    PopoverConfirmProps,
    'content' | 'footer' | 'rePositionOnChange' | 'className'
  >;

export const OverlayPopoverConfirm: React.FC<OverlayPopoverConfirmProps> = ({
  id: _id,
  placement,
  trigger,
  content,
  footer,
  rePositionOnChange,
  className,
  children,
  ...rest
}) => {
  const [id] = useState(_id || generatePopoverConfirmId());
  const popoverConfirm = (
    <PopoverConfirm
      id={id}
      content={content}
      footer={footer}
      rePositionOnChange={rePositionOnChange}
      className={className}
    />
  );
  return (
    <Overlay
      {...rest}
      placement={placement}
      overlay={popoverConfirm}
      trigger={trigger}
    >
      {children}
    </Overlay>
  );
};

OverlayPopoverConfirm.defaultProps = {
  placement: Placement.Right,
  trigger: TriggerType.Click,
};
