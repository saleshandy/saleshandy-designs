import React from 'react';

export type IconTextProps = {
  text: string;
  icon?: string;
};

const IconText: React.FC<IconTextProps> = (props) => {
  const { text, icon } = props;
  return (
    <div className="icon-text-container">
      {icon && <img src={icon} />}
      <small className="text">{text}</small>
    </div>
  );
};

export default IconText;
