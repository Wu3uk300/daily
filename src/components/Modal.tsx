"use client";
import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@/styles/modal.module.css";

interface ModalProps {
  message: string;
  onClose: () => void;
  show: boolean;
}

const Modal: FC<ModalProps> = ({ message, onClose, show }) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: styles.modalEnter,
        enterActive: styles.modalEnterActive,
        exit: styles.modalExit,
        exitActive: styles.modalExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className={styles.modalTitle}>Success!</h2>
          <p className={styles.modalMessage}>{message}</p>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
