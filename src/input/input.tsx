import React from "react";
import { InputButtonConfig, InputIconConfig } from "./types";
import { IconPlace, Size, Variant } from "./enums";
import InputIconList from "./input-icon-list";
import InputContainer from "./input-container";
import InputSpan from "./input-span";
import InputButton from "./input-button";
import NativeHTMLInput from "./native-html-input";
import { ClassNameProp, Modify } from "../types";
import { ForwardRef } from "../types/forward-ref";

// Overriding the same properties (className and disabled) from the HTMLProps
// just because we use it outside the html input element too.
// You can remove those properties from the type and it would work just fine.
type InputProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  ClassNameProp & {
    variant?: Variant;
    label?: React.ReactNode;
    caption?: React.ReactNode;
    size?: Size;
    disabled?: boolean;
    icons?: InputIconConfig[];
    button?: InputButtonConfig;
    onChange?: (
      value?: string,
      event?: React.ChangeEvent<HTMLInputElement>
    ) => void;
  }
>;

type InputStatic = {
  IconPlace: typeof IconPlace;
  Size: typeof Size;
  Variant: typeof Variant;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icons,
      caption,
      variant,
      label,
      disabled,
      size,
      className,
      button,
      onChange,
      ...rest
    },
    ref
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onChange?.(value, event);
    };

    let leftIconsList, rightIconsList, rightButton;

    if (icons) {
      const leftIcons = icons.filter((icon) => icon.place === IconPlace.Left);
      const rightIcons = icons.filter((icon) => icon.place === IconPlace.Right);

      leftIconsList = <InputIconList icons={leftIcons} />;
      rightIconsList = <InputIconList icons={rightIcons} />;
    }

    if (button) {
      rightButton = <InputButton button={button} />;
    }

    const addContainer = !!(label || caption);

    let input = (
      <InputSpan
        className={!addContainer && className}
        variant={variant}
        size={size}
        disabled={disabled}
      >
        {leftIconsList}
        <NativeHTMLInput
          {...rest}
          size={size}
          disabled={disabled}
          onChange={onChangeHandler}
          ref={ref}
        />
        {rightButton}
        {rightIconsList}
      </InputSpan>
    );

    if (addContainer) {
      input = (
        <InputContainer
          className={className}
          variant={variant}
          label={label}
          caption={caption}
        >
          {input}
        </InputContainer>
      );
    }

    return input;
  }
) as ForwardRef<HTMLInputElement, InputProps> & InputStatic;

Input.displayName = "Input";

Input.defaultProps = {
  disabled: false,
  variant: Variant.Default,
  size: Size.Medium,
};

Input.IconPlace = IconPlace;
Input.Size = Size;
Input.Variant = Variant;

export default Input;
