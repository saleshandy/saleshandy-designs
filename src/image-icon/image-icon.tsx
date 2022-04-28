import React from "react";

type IProps = {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  onClick?: () => void;
};

const ImageIcon: React.FC<IProps> = ({
  src,
  alt,
  height,
  onClick,
  ...props
}) => <img {...props} src={src} alt={alt} height={height} onClick={onClick} />;

export default ImageIcon;
