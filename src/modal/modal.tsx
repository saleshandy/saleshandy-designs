import React, { ReactNode, useEffect } from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import classNames from "classnames";

import { Button } from "../button";
import { Icon } from "../icon";
import eventBus from "../utils/event-bus";
import { constants } from "../types/enum";
import { Variant } from "../button/button";

const { Header, Title, Body, Footer } = BootstrapModal;

type IProps = {
  // modal configurations
  show: boolean;
  onClose?: () => void;
  onSubmit?: (e?: any) => void;
  onCancel?: (e?: any) => void;
  onHide?: () => void;
  className?: string;
  backdrop?: "static" | boolean;

  extraModalProps?: Record<string, unknown>;

  // modal title
  titleContent?: ReactNode;
  showCloseIcon?: boolean;
  hideHeader?: boolean;

  // modal body
  children: ReactNode;

  // modal footer
  hideFooter?: boolean;
  hideCancelButton?: boolean;
  hideSubmitButton?: boolean;
  submitButtonText?: ReactNode;
  cancelButtonText?: ReactNode;
  isSubmitDisabled?: boolean;
  isSubmitLoading?: boolean;
  isCancelLoading?: boolean;
  isCancelDisabled?: boolean;
  footerContent?: ReactNode;
  showSidebar?: boolean;
  sidebarTitle?: ReactNode;
  sidebarContent?: ReactNode;
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
  cancelButtonVarient?: Variant;
} & ({ backdrop: "static" | boolean } | { onHide: () => void });

const Modal: React.FC<IProps> = ({
  show,
  onClose,
  onSubmit,
  onCancel,
  onHide,
  className = "",
  backdrop,
  extraModalProps,
  titleContent,
  showCloseIcon = false,
  hideHeader = false,
  children,
  hideFooter = false,
  hideCancelButton = false,
  hideSubmitButton = false,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  isSubmitDisabled = false,
  isSubmitLoading = false,
  isCancelLoading = false,
  isCancelDisabled = false,
  footerContent = false,
  showSidebar = false,
  sidebarTitle,
  sidebarContent,
  submitButtonClassName,
  cancelButtonClassName,
  cancelButtonVarient = Button.Variant.Primary,
}) => {
  const onCloseHandler = () => {
    onClose();
    eventBus.dispatch(constants.MODAL_HANDLER, { isModalOpened: false });
  };

  const onCancelHandler = () => {
    if (onCancel) {
      onCancel();
    } else {
      onCloseHandler();
    }
  };

  const onSubmitHandler = (e: any) => {
    onSubmit(e);
    eventBus.dispatch(constants.MODAL_HANDLER, { isModalOpened: false });
  };

  useEffect(() => {
    if (show) {
      eventBus.dispatch(constants.MODAL_HANDLER, { isModalOpened: true });
    }
  }, [show]);

  const isHiddenButton = hideSubmitButton && hideCancelButton;

  const modalClasses = classNames([
    "bs-modal-container",
    className,
    { "modal-with-sidebar": showSidebar },
  ]);

  const modalFooterClasses = classNames([
    "bs-modal-footer",
    { "footer-with-content": !isHiddenButton && footerContent },
  ]);

  return (
    <BootstrapModal
      show={show}
      className={modalClasses}
      centered
      aria-labelledby='contained-modal-title-vcenter'
      onHide={onHide}
      backdrop={backdrop}
      {...extraModalProps}
    >
      <div className='modal-content-container'>
        {!hideHeader && (
          <Header className='bs-modal-header'>
            <Title>{titleContent}</Title>
            {showCloseIcon && (
              <Button className='close' onClick={onCloseHandler}>
                <Icon identifier='close' />
              </Button>
            )}
          </Header>
        )}

        <Body className='bs-modal-body'>{children}</Body>

        {!hideFooter && (
          <Footer className={modalFooterClasses}>
            {footerContent && (
              <div className='bs-modal-footer-content'>{footerContent}</div>
            )}

            {!isHiddenButton && (
              <div className='bs-modal-footer-action-buttons'>
                {!hideCancelButton && (
                  <Button
                    variant={cancelButtonVarient}
                    theme={Button.Theme.Ghost}
                    onClick={onCancelHandler}
                    isLoading={isCancelLoading}
                    disabled={isCancelDisabled}
                    className={cancelButtonClassName}
                  >
                    {cancelButtonText}
                  </Button>
                )}
                {!hideSubmitButton && (
                  <Button
                    variant={Button.Variant.Primary}
                    onClick={onSubmitHandler}
                    isLoading={isSubmitLoading}
                    disabled={isSubmitDisabled}
                    className={submitButtonClassName}
                  >
                    {submitButtonText}
                  </Button>
                )}
              </div>
            )}
          </Footer>
        )}
      </div>
      {showSidebar && (
        <div className='modal-sidebar'>
          <Header className='bs-modal-header'>
            <Title>{sidebarTitle}</Title>
          </Header>
          <Body className='bs-modal-body'>{sidebarContent}</Body>
        </div>
      )}
    </BootstrapModal>
  );
};

export default Modal;
