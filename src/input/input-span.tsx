import React from "react";
import classNames from "classnames";
import { getSizeSubClass, getVariantSubClass } from "./helpers";
import { ClassNameProp } from "../types/class-name-prop";
import { Size, Variant } from "./enums";

type InputSpanProps = ClassNameProp & {
  size: Size;
  variant: Variant;
  disabled: boolean;
  children?: React.ReactNode;
};

const InputSpan: React.FC<InputSpanProps> = ({
  size,
  className,
  variant,
  disabled,
  children,
}) => {
  const sizeSubClass = getSizeSubClass(size);
  const sizeClass = `bs-input-affix-wrapper-${sizeSubClass}`;

  const variantSubClass = getVariantSubClass(variant);
  const variantClass = `input-${variantSubClass}`;

  const spanClass = classNames([
    "bs-input-affix-wrapper",
    sizeClass,
    variantClass,
    { "bs-input-affix-wrapper-disabled": disabled },
    className,
  ]);

  return <span className={spanClass}>{children}</span>;
};

export default InputSpan;
