import React, { useState } from 'react';
import { Overlay, OverlayProps } from '../overlay';
import { Popover, PopoverProps } from './popover';
import { Placement, TriggerType } from '../enums';
import { generatePopoverId } from '../helpers';

export type OverlayPopoverProps = Omit<OverlayProps, 'overlay'> &
  Partial<Pick<PopoverProps, 'id'>> &
  Pick<PopoverProps, 'header' | 'content' | 'rePositionOnChange' | 'className'>;

export const OverlayPopover: React.FC<OverlayPopoverProps> = ({
  id: _id,
  placement,
  trigger,
  header,
  content,
  rePositionOnChange,
  className,
  children,
  ...rest
}) => {
  const [id] = useState(_id || generatePopoverId());
  const popover = (
    <Popover
      id={id}
      header={header}
      content={content}
      rePositionOnChange={rePositionOnChange}
      className={className}
    />
  );
  return (
    <Overlay
      {...rest}
      placement={placement}
      overlay={popover}
      trigger={trigger}
    >
      {children}
    </Overlay>
  );
};

OverlayPopover.defaultProps = {
  placement: Placement.Right,
  trigger: TriggerType.Click,
};
