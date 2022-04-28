import * as React from "react";
import classNames from "classnames";
import {
  Button as ReactBootstrapButton,
  ButtonProps as ReactBootstrapButtonProps,
  ThemeProvider,
} from "react-bootstrap";
import { Modify } from "../types/modify";

export enum Type {
  Button = "button",
  Reset = "reset",
  Submit = "submit",
}

export enum Theme {
  Solid = "solid",
  Ghost = "ghost",
}

export enum Variant {
  Default = "default",
  Primary = "primary",
  Outlined = "outlined",
  Dashed = "dashed",
  Danger = "danger",
  Light = "light",
}

export enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export type ButtonProps = Modify<
  ReactBootstrapButtonProps,
  {
    type?: Type;
    theme?: Theme;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
    iconOnly?: boolean;
  }
>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size,
      type,
      theme,
      variant,
      onClick,
      className,
      disabled,
      iconOnly,
      ...rest
    },
    ref
  ) => {
    let tempSize;

    // we are keeping size = undefined for ElementSize.Medium.
    // because react bootstrap button has size type = 'sm' | 'lg'.
    // so it won't accept 'md' or even ''.
    // we have to pass undefined because passing undefined is equivalent
    // to not passing the prop.
    switch (size) {
      case Size.Small:
        tempSize = "sm";
        break;
      case Size.Large:
        tempSize = "lg";
        break;
    }

    // one of these two will be undefined. because rbClassName is for
    // only icon button and rbSize is for icon + text button
    let rbSize: any, rbClassName;

    if (iconOnly) {
      rbClassName = `btn-icon`;

      if (tempSize) {
        rbClassName += `-${tempSize}`;
      }
    } else {
      rbSize = tempSize;
    }

    const buttonClass = classNames([rbClassName, className]);

    return (
      <ThemeProvider prefixes={{ btn: `btn-${theme}` }}>
        <ReactBootstrapButton
          {...rest}
          type={type}
          variant={variant}
          disabled={disabled}
          size={rbSize}
          className={buttonClass}
          onClick={onClick}
          ref={ref}
        >
          {children}
        </ReactBootstrapButton>
      </ThemeProvider>
    );
  }
);

Button.displayName = "Button";

Button.defaultProps = {
  type: Type.Button,
  theme: Theme.Solid,
  variant: Variant.Default,
  size: Size.Medium,
  disabled: false,
  iconOnly: false,
};

export default Button;
