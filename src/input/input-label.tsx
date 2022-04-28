import React from 'react';
import classNames from 'classnames';

enum Place {
  Before = 'before',
  After = 'after',
}

type InputLabelProps = {
  text: React.ReactNode;
  place: Place;
};

type InputLabelStatic = {
  Place: typeof Place;
};

const InputLabel: React.FC<InputLabelProps> & InputLabelStatic = ({
  text,
  place,
}) => {
  const labelSubClass = classNames({
    prefix: place === Place.Before,
    suffix: place === Place.After,
  });

  const labelClass = `bs-input-label-${labelSubClass}`;

  return <label className={labelClass}>{text}</label>;
};

InputLabel.Place = Place;

export default InputLabel;
