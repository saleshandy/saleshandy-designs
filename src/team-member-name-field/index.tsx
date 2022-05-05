import React from "react";
import { TooltipWrapper } from "../tooltip-wrapper/tooltip-wrapper";

export type TeamMemberNameProps = {
  name: string;
};

const sequenceNameJSX = ({ name }: TeamMemberNameProps) => (
  <div className='text-container'>{name}</div>
);

export const TeamMemberNameField = ({ name }: TeamMemberNameProps) =>
  name.length < 25 ? (
    sequenceNameJSX({ name })
  ) : (
    <TooltipWrapper text={name}>{sequenceNameJSX({ name })}</TooltipWrapper>
  );
