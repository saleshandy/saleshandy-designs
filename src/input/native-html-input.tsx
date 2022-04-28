import React from "react";
import classNames from "classnames";
import { getSizeSubClass } from "./helpers";
import { Size } from "./enums";
import { Modify } from "../types";

type NativeHtmlInputProps = Modify<
  React.HTMLProps<HTMLInputElement>,
  {
    size: Size;
  }
>;

const NativeHTMLInput = React.forwardRef<
  HTMLInputElement,
  NativeHtmlInputProps
  // eslint-disable-next-line
>(({ size, children, ...rest }, ref) => {
  const inputSizeSubClass = getSizeSubClass(size);
  const inputSizeClass = `bs-input-${inputSizeSubClass}`;
  const inputClass = classNames([inputSizeClass, "bs-input"]);

  return <input {...rest} className={inputClass} ref={ref} />;
});

export default NativeHTMLInput;
