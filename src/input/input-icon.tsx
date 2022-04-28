import { InputIconConfig } from "./types";
import React from "react";
import classNames from "classnames";
import { IconPlace } from "./enums";
import Icon from "../icon";

type InputIconProps = {
  icon: InputIconConfig;
};

const InputIcon: React.FC<InputIconProps> = ({
  icon: { place, className, colorDefault, identifier, onClick },
}) => {
  const iconPlacingSubClass = classNames({
    prefix: place === IconPlace.Left,
    suffix: place === IconPlace.Right,
  });

  const iconPlacingClass = `bs-input-${iconPlacingSubClass}`;

  const spanClass = classNames([
    iconPlacingClass,
    { "color-default": colorDefault },
    className,
  ]);

  return (
    <span className={spanClass} onClick={onClick}>
      <Icon identifier={identifier} />
    </span>
  );
};

export default InputIcon;
