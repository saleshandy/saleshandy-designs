import React from "react";

type IProps = {
  firstName: string;
  lastName: string;
  className?: string;
};

const Avatar: React.FC<IProps> = ({ firstName, lastName, className }) => {
  return (
    <span
      className={`bs-avatar bs-avatar-md bs-avatar-circle light-blue-color ${className}`}
    >
      <span className='bs-avatar-string text-primary'>
        {firstName && firstName[0]?.toUpperCase()}
        {lastName && lastName[0]?.toUpperCase()}
      </span>
    </span>
  );
};

export default Avatar;
