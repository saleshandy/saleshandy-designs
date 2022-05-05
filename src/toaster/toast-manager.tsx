import React, { ReactElement } from "react";
import ToastComponent, { PartialToastProps } from "./toast";
import produce from "immer";

export enum Position {
  Top = "top",
  Bottom = "bottom",
}

export type ToastManagerOptions = PartialToastProps & { position?: Position };

type Toast = ToastManagerOptions & { id: number };

type ToastManagerState = {
  id: number;
  activeToasts: Toast[];
};

type ToastManagerProps = {
  bindActions: (...args: any[]) => any;
};

class ToastManager extends React.Component<
  ToastManagerProps,
  ToastManagerState
> {
  // The toast fade timeout is 0.15s. so keeping this value anything >= 0.15s
  // would work. here, we're keeping it 500 to be safe.
  // settings this value to < 0.15s would remove the toast element from
  // DOM before the css fade animation finishes.
  removeToastTimeout = 500;

  constructor(props: ToastManagerProps | Readonly<ToastManagerProps>) {
    super(props);

    this.state = {
      id: 0,
      activeToasts: [],
    };

    this.addToast = this.addToast.bind(this);

    this.props.bindActions(this.addToast);
  }

  getNextId(id: number): number {
    return id + 1;
  }

  addToast(options: ToastManagerOptions) {
    const { position = Position.Bottom, ...remainingOptions } = options;

    this.setState(
      produce((draft: ToastManagerState) => {
        draft.id = this.getNextId(draft.id);
        const toast: Toast = {
          id: draft.id,
          position,
          ...remainingOptions,
        };
        draft.activeToasts.push(toast);
      })
    );
  }

  removeToast(toast: Toast) {
    toast.onClose?.();
    setTimeout(() => {
      this.setState(
        produce((draft: ToastManagerState) => {
          draft.activeToasts = draft.activeToasts.filter(
            (activeToast) => activeToast.id !== toast.id
          );
        })
      );
    }, this.removeToastTimeout);
  }

  getToastComponent(toast: Toast): ReactElement {
    return (
      <ToastComponent
        key={toast.id}
        content={toast.content}
        variant={toast.variant}
        delay={toast.delay}
        animation={toast.animation}
        theme={toast.theme}
        onClose={() => this.removeToast(toast)}
      />
    );
  }

  render() {
    const { activeToasts } = this.state;

    const topToasts = activeToasts
      .filter((toast) => toast.position === Position.Top)
      .map((toast) => this.getToastComponent(toast));

    const bottomToasts = activeToasts
      .filter((toast) => toast.position === Position.Bottom)
      .map((toast) => this.getToastComponent(toast));

    return (
      <div className='bs-message-container'>
        <div className='bs-message top'>{topToasts}</div>
        <div className='bs-message bottom'>{bottomToasts}</div>
      </div>
    );
  }
}

export default ToastManager;
