import React, { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export type TooltipWrapperProps = {
  children: ReactElement;
  text: string;
};

export const TooltipWrapper = (props: TooltipWrapperProps) => (
  <OverlayTrigger placement='auto-start' overlay={getTooltip(props.text)}>
    {props.children}
  </OverlayTrigger>
);

const getTooltip = (text: string) => {
  return (
    <Tooltip id='popover-basic' className='bs-tooltip-inner'>
      {text}
    </Tooltip>
  );
};
