import React, { useEffect } from "react";
import { RawPopover, RawPopoverProps } from "./raw-popover";
import { RepositionOnChange } from "../types";
import { Theme } from "./enums";
import { ForwardRef } from "../../types";

export type PopoverProps = RawPopoverProps & RepositionOnChange;

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ popper, header, content, rePositionOnChange, ...rest }, ref) => {
    useEffect(() => {
      rePositionOnChange && popper.scheduleUpdate();
    }, [header, content, popper, rePositionOnChange]);

    return <RawPopover {...rest} header={header} content={content} ref={ref} />;
  }
) as ForwardRef<HTMLDivElement, PopoverProps> & {
  Theme: typeof Theme;
};

Popover.defaultProps = {
  rePositionOnChange: false,
};

Popover.Theme = Theme;
