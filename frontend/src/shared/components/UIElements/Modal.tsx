import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import styles from "./Modal.module.scss";

const ModalOverlay: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  headerClass?: string;
  header?: string;
  contentClass?: string;
  footerClass?: string;
  footer?: React.JSX.Element;
  nodeRef?: React.MutableRefObject<null>;
  onSubmit?: () => void;
}> = (props) => {
  const content = (
    <div
      ref={props.nodeRef}
      className={`${styles.modal} ${props.className}`}
      style={props.style}
    >
      <header className={`${styles.modal__header} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (event: React.FormEvent) => event.preventDefault()
        }
      >
        <div className={`${styles.modal__content} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${styles.modal__footer} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

const Modal: React.FC<{
  header?: string;
  contentClass?: string;
  onCancel: () => void;
  show: boolean;
  footerClass?: string;
  footer?: React.JSX.Element;
  children: React.ReactNode;
}> = (props) => {
  const nodeRef = React.useRef(null);

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={{
          enter: styles["modal-enter"],
          enterActive: styles["modal-enter-active"],
          exit: styles["modal-exit"],
          exitActive: styles["modal-exit-active"],
        }}
      >
        <ModalOverlay nodeRef={nodeRef} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
