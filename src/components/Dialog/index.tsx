import clsx from 'clsx';
import { PropsWithChildren, useCallback, useEffect } from 'react';
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
  const closeOnEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc, false);

    return () => {
      document.removeEventListener('keydown', closeOnEsc, false);
    };
  }, [closeOnEsc]);

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
