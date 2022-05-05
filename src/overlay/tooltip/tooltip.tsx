import React, { useEffect } from 'react';
import { RawTooltip, RawTooltipProps } from './raw-tooltip';
import { RepositionOnChange } from '../types';

export type TooltipProps = RawTooltipProps & RepositionOnChange;

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ popper, text, rePositionOnChange, ...rest }, ref) => {
    useEffect(() => {
      rePositionOnChange && popper.scheduleUpdate();
    }, [text, popper, rePositionOnChange]);

    return <RawTooltip {...rest} text={text} ref={ref} />;
  },
);

Tooltip.defaultProps = {
  rePositionOnChange: false,
};
