import React from 'react';
import { InputButtonConfig } from './types';

type InputButtonConfigProps = {
  button: InputButtonConfig;
};

const InputButton: React.FC<InputButtonConfigProps> = ({ button }) => (
  <span role="button" className="blue-txt-11" onClick={button.onClick}>
    {button.buttonTitle}
  </span>
);

export default InputButton;
