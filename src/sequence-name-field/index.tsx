import React from "react";
import { TooltipWrapper } from "../tooltip-wrapper/tooltip-wrapper";

export type SequenceNameProps = {
  onClick?: () => void;
  name: string;
};

const sequenceNameJSX = ({ onClick, name }: SequenceNameProps) => (
  <div
    className='text-container'
    onClick={() => {
      !!onClick && onClick();
    }}
  >
    {name}
  </div>
);

export const SequenceNameField = ({ name, onClick }: SequenceNameProps) =>
  name.length < 30 ? (
    sequenceNameJSX({ name, onClick })
  ) : (
    <TooltipWrapper text={name}>
      {sequenceNameJSX({ name, onClick })}
    </TooltipWrapper>
  );
