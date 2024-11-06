import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import './Dialog.css';

export const Dialog = ({
  onClose,
  centerX = false,
  centerY = false,
  children
}: PropsWithChildren & {
  onClose: () => void;
  centerX?: boolean;
  centerY?: boolean;
}) => {
  return (
    <dialog
      className={clsx('dialog', centerX && 'center-x', centerY && 'center-y')}
    >
      <span className="close-button" onClick={onClose}>
        ❌
      </span>
      {children}
    </dialog>
  );
};
