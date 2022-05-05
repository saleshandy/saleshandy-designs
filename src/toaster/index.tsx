import ToasterHelper from './toaster-helper';

const toaster = new ToasterHelper();

export type { ToastOptions } from './toaster-helper';
export type { ToastOptionsWithoutVariant } from './toaster-helper';
export { Position, default as ToastManager } from './toast-manager';
export { Variant, Theme } from './toast';
export default toaster;
