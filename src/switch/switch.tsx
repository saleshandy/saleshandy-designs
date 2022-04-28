import React, { useRef } from "react";
import classNames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import composeRefs from "@seznam/compose-react-refs";
import { Modify } from "../types/modify";
import { ForwardRef } from "../types/forward-ref";
import { Placement } from "../types/enum";

export enum Variant {
  Text = "text",
  Icon = "icon",
  Default = "default",
}

export enum State {
  Pending = "pending",
  Default = "default",
}

export enum Size {
  Small = "small",
  Medium = "medium",
}

type SwitchProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    checked?: boolean;
    label?: React.ReactNode;
    state?: State;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    onChange?: (
      checked: boolean,
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    tooltip?: string;
    placement?: Placement;
    overlayTooltipClass?: string;
  }
>;

type SwitchStatic = {
  Variant: typeof Variant;
  State: typeof State;
  Size: typeof Size;
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      label,
      state,
      variant,
      size,
      disabled,
      className,
      onChange,
      tooltip,
      placement,
      overlayTooltipClass,
      ...rest
    },
    ref
  ) => {
    const localRef = useRef<HTMLInputElement>(null);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(event.target.checked, event);

    const labelClickHandler = () =>
      localRef.current && localRef.current.click();

    const sizeClass = classNames([{ "switch-small": size === Size.Small }]);
    const stateClass = classNames([
      { "switch-pending": state === State.Pending },
    ]);
    const variantClass = classNames([
      {
        "switch-text": variant === Variant.Text,
        "switch-icon": variant === Variant.Icon,
      },
    ]);

    const switchClass = classNames([
      "switchToggle",
      sizeClass,
      stateClass,
      variantClass,
      className,
    ]);

    const getTooltip = (text: string) => (
      <Tooltip
        id='popover-basic'
        className={overlayTooltipClass}
        placement={placement || Placement.AutoStart}
      >
        {text}
      </Tooltip>
    );

    const RenderLabelAndTooltip: React.FC<{
      labelTooltip: any;
      children: any;
    }> = ({ labelTooltip, children }) =>
      labelTooltip ? (
        <OverlayTrigger
          placement={placement || Placement.AutoStart}
          overlay={getTooltip(labelTooltip)}
        >
          {children}
        </OverlayTrigger>
      ) : (
        children
      );

    return (
      <div className={switchClass}>
        <input
          {...rest}
          type='checkbox'
          checked={checked}
          disabled={disabled}
          onChange={onChangeHandler}
          ref={composeRefs(ref, localRef)}
          name='Switch'
        />
        <RenderLabelAndTooltip labelTooltip={tooltip}>
          <label htmlFor='Switch' onClick={labelClickHandler}>
            <span>{label}</span>
          </label>
        </RenderLabelAndTooltip>
      </div>
    );
  }
) as ForwardRef<HTMLInputElement, SwitchProps> & SwitchStatic;

Switch.displayName = "Switch";

Switch.Variant = Variant;
Switch.State = State;
Switch.Size = Size;

Switch.defaultProps = {
  state: State.Default,
  variant: Variant.Default,
  size: Size.Medium,
  disabled: false,
  overlayTooltipClass: "bs-tooltip-inner",
};

export default Switch;
