import { ToastManagerOptions } from "./toast-manager";
import { Variant } from "./toast";
import { ReactNode } from "react";

export type ToastOptions = Omit<ToastManagerOptions, "content">;
export type ToastOptionsWithoutVariant = Omit<ToastOptions, "variant">;

class ToasterHelper {
  private _addToast: any;

  bindActions = (addToast: any) => {
    this._addToast = addToast;
  };

  toast = (content: ReactNode, options?: ToastOptions) =>
    this._addToast({ ...options, content });

  info = (content: ReactNode, options?: ToastOptionsWithoutVariant) =>
    this.toast(content, { ...options, variant: Variant.Primary });

  success = (content: ReactNode, options?: ToastOptionsWithoutVariant) =>
    this.toast(content, { ...options, variant: Variant.Success });

  warning = (content: ReactNode, options?: ToastOptionsWithoutVariant) =>
    this.toast(content, { ...options, variant: Variant.Warning });

  error = (content: ReactNode, options?: ToastOptionsWithoutVariant) =>
    this.toast(content, { ...options, variant: Variant.Error });

  loading = (content: ReactNode, options?: ToastOptionsWithoutVariant) =>
    this.toast(content, { ...options, variant: Variant.Loading });
}

export default ToasterHelper;
