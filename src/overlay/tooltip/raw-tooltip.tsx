import React from 'react';
import {
  Tooltip as ReactBootstrapTooltip,
  TooltipProps as ReactBootstrapTooltipProps,
} from 'react-bootstrap';

export type RawTooltipProps = ReactBootstrapTooltipProps & {
  text: React.ReactNode;
};

export const RawTooltip = React.forwardRef<HTMLDivElement, RawTooltipProps>(
  // eslint-disable-next-line
  ({ text, children, ...rest }, ref) => (
    <ReactBootstrapTooltip {...rest} ref={ref}>
      {text}
    </ReactBootstrapTooltip>
  ),
);
