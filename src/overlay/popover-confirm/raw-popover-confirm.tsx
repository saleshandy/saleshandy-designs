import React from 'react';
import { RawPopover, RawPopoverProps } from '../popover';

export type RawPopoverConfirmProps = Omit<RawPopoverProps, 'header'> & {
  footer: React.ReactNode;
};

export const RawPopoverConfirm = React.forwardRef<
  HTMLDivElement,
  RawPopoverConfirmProps
>(({ content: _content, footer, ...rest }, ref) => {
  const content = (
    <div>
      <div className="bs-popover-confirm-desc">
        <div className="bs-popover-confirm-icon icon-warning">
          <i className="sh-exclamation-circle" />
        </div>
        <div>{_content}</div>
      </div>
      <div className="d-flex justify-content-end bs-mt-10">{footer}</div>
    </div>
  );
  return <RawPopover {...rest} content={content} ref={ref} />;
});
