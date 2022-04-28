import React from "react";
import classNames from "classnames";
import { getVariantSubClass } from "./helpers";
import { ClassNameProp } from "../types/class-name-prop";
import { Variant } from "./enums";
import InputLabel from "./input-label";

type InputContainerProps = ClassNameProp & {
  variant?: Variant;
  label: React.ReactNode;
  caption: React.ReactNode;
  children?: React.ReactNode;
};

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  variant,
  caption,
  className,
  children,
}) => {
  const variantSubClass = getVariantSubClass(variant);
  const variantClass = `input-${variantSubClass}-container`;

  const containerClass = classNames([
    "bs-input-container",
    variantClass,
    className,
  ]);

  return (
    <div className={containerClass}>
      {label && <InputLabel text={label} place={InputLabel.Place.Before} />}
      {children}
      {caption && <InputLabel text={caption} place={InputLabel.Place.After} />}
    </div>
  );
};

export default InputContainer;
