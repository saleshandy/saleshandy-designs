import * as React from "react";
import classNames from "classnames";
import { Modify, IconPropsShared } from "../types";

type PartialIconProps = IconPropsShared & {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

type IconProps = Modify<React.HTMLProps<HTMLElement>, PartialIconProps>;

const Icon = React.forwardRef<HTMLElement, IconProps>(
  ({ identifier, onClick, className, ...rest }, ref) => {
    // patch for not adding prefix for dot icon.
    const prefix = identifier === "dot" ? "" : "sh-";

    const identifierClass = `${prefix}${identifier}`;
    const iconClass = classNames([identifierClass, className]);

    return <i {...rest} className={iconClass} onClick={onClick} ref={ref} />;
  }
);

export default Icon;
