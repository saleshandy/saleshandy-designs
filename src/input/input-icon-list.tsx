import React from 'react';
import { InputIconConfig } from './types';
import InputIcon from './input-icon';

type InputIconListProps = {
  icons: InputIconConfig[];
};

const InputIconList: React.FC<InputIconListProps> = ({ icons }) => (
  // wrap the children inside a fragment to keep the correct return type of
  // a functional component.
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006
  <>
    {icons.map((icon, index) => (
      <span className="mx-1 d-flex" key={index}>
        {icon.component ? (
          icon.component
        ) : (
          <InputIcon key={index} icon={icon} />
        )}
      </span>
    ))}
  </>
);

export default InputIconList;
