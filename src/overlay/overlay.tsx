import React from "react";
import { OverlayTrigger, OverlayTriggerProps } from "react-bootstrap";
import { Modify } from "../types";
import { Placement, TriggerType } from "./enums";

export type OverlayProps = Modify<
  OverlayTriggerProps,
  {
    placement?: Placement;
    trigger?: TriggerType | TriggerType[];
  }
>;

export const Overlay: React.FC<OverlayProps> = ({ children, ...rest }) => (
  <OverlayTrigger {...rest}>{children}</OverlayTrigger>
);
