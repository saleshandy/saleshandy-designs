import React from 'react';

export type TextStackProps = {
  label: string;
  value: string;
  type?: string;
};

const TextStack: React.FC<TextStackProps> = (props) => {
  const { value, label, type } = props;
  return (
    <div
      className={
        type
          ? 'text-stack-container text-stack-container-report'
          : 'text-stack-container'
      }
    >
      <span className={`value ${type && type}`}>{value}</span>
      <small className="label">{label}</small>
    </div>
  );
};

export default TextStack;
