import * as React from "react";
import Button, { Type, Theme, Variant, Size, ButtonProps } from "./button";
import Icon from "../icon/icon";
import classNames from "classnames";
import { Modify } from "../types/modify";
import { ForwardRef } from "../types/forward-ref";

export enum LoaderPlace {
  Left = "left",
  Right = "right",
}

export type ButtonContainerProps = Modify<
  ButtonProps,
  {
    iconOnly?: React.ReactNode;
    isLoading?: boolean;
    loaderPlace?: LoaderPlace;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  }
>;

type ButtonContainerStatic = {
  Type: typeof Type;
  Theme: typeof Theme;
  Variant: typeof Variant;
  Size: typeof Size;
  LoaderPlace: typeof LoaderPlace;
};

const ButtonContainer = React.forwardRef<
  HTMLButtonElement,
  ButtonContainerProps
>(
  (
    {
      iconOnly,
      isLoading,
      loaderPlace,
      iconLeft,
      iconRight,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    let newChildren = children,
      newIconOnly = iconOnly,
      newIconLeft = iconLeft,
      newIconRight = iconRight,
      btnLoadingClass;

    const iconOnlyProp = !!iconOnly;

    if (isLoading) {
      btnLoadingClass = "btn-loading";
      const loaderIconClass = "icon-loading";

      const loaderIconElement = (
        <Icon
          key='sh-btn-loader-left-12345'
          className={loaderIconClass}
          identifier='spinner-alt'
        />
      );

      const leftLoaderIconElement = (
        <Icon
          key='sh-btn-loader-left-12345'
          className={classNames([loaderIconClass, "icon-left"])}
          identifier='spinner-alt'
        />
      );

      const rightLoaderIconElement = (
        <Icon
          key='sh-btn-loader-right-12345'
          className={classNames([loaderIconClass, "icon-right"])}
          identifier='spinner-alt'
        />
      );

      if (iconOnly) {
        newIconOnly = loaderIconElement;
      } else if (loaderPlace === LoaderPlace.Left) {
        newIconLeft = leftLoaderIconElement;
      } else if (loaderPlace === LoaderPlace.Right) {
        newIconRight = rightLoaderIconElement;
      }
    }

    if (newIconOnly) {
      newIconOnly = <span>{newIconOnly}</span>;
    }

    if (newIconLeft) {
      newIconLeft = <span className='icon-left'>{newIconLeft}</span>;
    }

    if (newIconRight) {
      newIconRight = <span className='icon-right'>{newIconRight}</span>;
    }

    if (newIconOnly) {
      newChildren = newIconOnly;
    } else {
      newChildren = (
        <>
          {newIconLeft}
          {newChildren}
          {newIconRight}
        </>
      );
    }

    const btnClass = classNames([className, btnLoadingClass]);

    return (
      <Button {...rest} className={btnClass} iconOnly={iconOnlyProp} ref={ref}>
        {newChildren}
      </Button>
    );
  }
) as ForwardRef<HTMLButtonElement, ButtonContainerProps> &
  ButtonContainerStatic;

ButtonContainer.displayName = "ButtonContainer";

ButtonContainer.defaultProps = {
  isLoading: false,
  loaderPlace: LoaderPlace.Left,
};

ButtonContainer.Type = Type;
ButtonContainer.Theme = Theme;
ButtonContainer.Variant = Variant;
ButtonContainer.Size = Size;
ButtonContainer.LoaderPlace = LoaderPlace;

export default ButtonContainer;
