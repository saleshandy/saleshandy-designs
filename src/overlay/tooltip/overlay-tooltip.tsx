import React, { useState } from 'react';
import { Overlay, OverlayProps } from '../overlay';
import { Tooltip, TooltipProps } from './tooltip';
import { Placement, TriggerType } from '../enums';
import { generateTooltipId } from '../helpers';

type OverlayTooltipProps = Omit<OverlayProps, 'overlay' | 'trigger'> &
  Partial<Pick<TooltipProps, 'id'>> &
  Pick<TooltipProps, 'text' | 'rePositionOnChange' | 'className'>;

export const OverlayTooltip: React.FC<OverlayTooltipProps> = ({
  id: _id,
  placement,
  text,
  rePositionOnChange,
  className,
  children,
  ...rest
}) => {
  const [id] = useState(_id || generateTooltipId());
  const tooltip = (
    <Tooltip
      id={id}
      text={text}
      rePositionOnChange={rePositionOnChange}
      className={className}
    />
  );
  return (
    <Overlay
      {...rest}
      placement={placement}
      overlay={tooltip}
      trigger={[TriggerType.Hover, TriggerType.Focus]}
    >
      {children}
    </Overlay>
  );
};

OverlayTooltip.defaultProps = {
  placement: Placement.Bottom,
};
