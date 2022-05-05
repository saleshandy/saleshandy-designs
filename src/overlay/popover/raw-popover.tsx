import React from "react";
import {
  Popover as ReactBootstrapPopover,
  PopoverProps as ReactBootstrapPopoverProps,
} from "react-bootstrap";
import classNames from "classnames";
import { Modify } from "../../types";
import { Theme } from "./enums";

export type RawPopoverProps = Modify<
  ReactBootstrapPopoverProps,
  {
    header?: React.ReactNode;
    content: React.ReactNode;
    theme?: Theme;
  }
>;

export const RawPopover = React.forwardRef<HTMLDivElement, RawPopoverProps>(
  // eslint-disable-next-line
  ({ header, content, className, children, theme, ...rest }, ref) => {
    const popoverClass = classNames([
      "bs-popover-inner",
      className,
      theme?.toString(),
    ]);
    return (
      <ReactBootstrapPopover {...rest} className={popoverClass} ref={ref}>
        {header && (
          <ReactBootstrapPopover.Title as='h3' className='bs-popover-title'>
            {header}
          </ReactBootstrapPopover.Title>
        )}
        <ReactBootstrapPopover.Content>
          <div className='bs-popover-content'>
            <div className='bs-popover-inner-content'>{content}</div>
          </div>
        </ReactBootstrapPopover.Content>
      </ReactBootstrapPopover>
    );
  }
);
