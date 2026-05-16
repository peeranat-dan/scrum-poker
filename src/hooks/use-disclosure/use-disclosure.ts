import { useCallback, useState } from 'react';

export interface UseDisclosureOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseDisclosureHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export type UseDisclosureReturnValue = [boolean, UseDisclosureHandlers];

export function useDisclosure(
  initialState = false,
  options: UseDisclosureOptions = {}
): UseDisclosureReturnValue {
  const [opened, setOpened] = useState(initialState);

  const { onOpen, onClose } = options;

  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen?.();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose?.();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    if (opened) {
      close();
    } else {
      open();
    }
  }, [close, open, opened]);

  return [opened, { open, close, toggle }];
}