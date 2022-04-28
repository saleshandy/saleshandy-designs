import React from "react";
import { IconPropsShared, ClassNameProp } from "../types";
import { IconPlace } from "./enums";

export type InputIconConfig = IconPropsShared &
  ClassNameProp & {
    place: IconPlace;
    colorDefault?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    component?: JSX.Element;
  };

export type InputButtonConfig = ClassNameProp & {
  buttonTitle: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
