import React from "react";
import {
  Toast as ReactBootstrapToast,
  ToastProps as ReactBootstrapToastProps,
} from "react-bootstrap";
import classNames from "classnames";
import { Modify } from "../types";
import { Icon } from "../icon";
import { Images } from "../utils/images";

export enum Variant {
  Success = "success",
  Warning = "warning",
  Error = "error",
  Primary = "primary",
  Loading = "loading",
}

export enum Theme {
  New = "new",
  Old = "old",
}

type ToastState = {
  showToast: boolean;
};

export type PartialToastProps = {
  variant?: Variant;
  content: React.ReactNode;
  delay?: number;
  animation?: boolean;
  theme?: Theme;
  onClose?: () => void;
};

type ToastProps = Modify<ReactBootstrapToastProps, PartialToastProps>;

class Toast extends React.Component<ToastProps, ToastState> {
  static Variant = Variant;

  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    variant: Variant.Primary,
    delay: 3000,
    animation: true,
    theme: Theme.Old,
  };

  constructor(props: ToastProps | Readonly<ToastProps>) {
    super(props);
    this.state = { showToast: true };
    this.hideToast = this.hideToast.bind(this);
  }

  hideToast() {
    const { onClose } = this.props;
    this.setState({ showToast: false });
    onClose?.();
  }

  render() {
    const {
      variant,
      content,
      delay,
      animation,
      className,
      theme,
      // we aren't using onClose directly as a prop to ReactBootstrapToast,
      // but if we don't extract onClose here, then it would be in rest array,
      // which will add the onClose prop to ReactBootstrapToast.
      // if you keep the ...rest before providing any props to ReactBootstrapToast,
      // then the provided onClose will override the onClose provided by rest array.
      // but still, for safekeeping, we should extract onClose here.
      // eslint-disable-next-line
      onClose,
      ...rest
    } = this.props;

    const { showToast } = this.state;

    const iconWrapperClass = classNames([
      {
        "icon-basic": variant === Variant.Primary,
        "icon-success": variant === Variant.Success,
        "icon-warning": variant === Variant.Warning,
        "icon-error": variant === Variant.Error,
        "icon-loading": variant === Variant.Loading,
      },
      "message-icon",
    ]);

    const iconIdentifier = classNames([
      {
        "check-o": variant === Variant.Success,
        danger: variant === Variant.Primary || variant === Variant.Warning,
        "close-o": variant === Variant.Error,
        "spinner-alt": variant === Variant.Loading,
      },
    ]);

    const toastClass = classNames([
      "message-container",
      className,
      {
        "theme-new": theme === Theme.New,
        "variant-basic": variant === Variant.Primary,
        "variant-success regular-2": variant === Variant.Success,
        "variant-warning": variant === Variant.Warning,
        "variant-error": variant === Variant.Error,
        "variant-loading": variant === Variant.Loading,
      },
    ]);

    return (
      <ReactBootstrapToast
        {...rest}
        className={toastClass}
        animation={animation}
        autohide={!!delay}
        delay={delay}
        show={showToast}
        onClose={this.hideToast}
      >
        <div className={iconWrapperClass}>
          {theme === Theme.New && variant === Variant.Success ? (
            <img src={Images.ChecksGreen} alt='Success' />
          ) : (
            <Icon identifier={iconIdentifier} />
          )}
        </div>
        <div className='message-desc'>{content}</div>
      </ReactBootstrapToast>
    );
  }
}

export default Toast;
