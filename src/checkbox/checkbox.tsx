import React from "react";
import classNames from "classnames";
import { Modify } from "../types";

type CheckboxProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    label?: React.ReactNode;
    checked?: boolean;
    intermediate?: boolean;
    disabled?: boolean;
    onChange?: (
      checked: boolean,
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
  }
>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { disabled, label, checked, intermediate, className, onChange, ...rest },
    ref
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked, event);
    };

    const labelClass = classNames([
      "bs-checkbox-wrapper",
      {
        "bs-checkbox-wrapper-disabled": disabled,
      },
      className,
    ]);

    const spanClass = classNames([
      "bs-checkbox",
      {
        "bs-checkbox-disabled": disabled,
        "bs-checkbox-indeterminate": intermediate,
      },
    ]);

    return (
      <label className={labelClass}>
        <span className={spanClass}>
          <input
            {...rest}
            type='checkbox'
            className='bs-checkbox-input'
            checked={checked}
            disabled={disabled}
            onChange={onChangeHandler}
            ref={ref}
          />
          <span className='bs-checkbox-inner' />
        </span>
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

Checkbox.defaultProps = {
  intermediate: false,
  disabled: false,
};

export default Checkbox;
