// NOTE: This hook is copied from https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-hotkeys/use-hotkeys.ts
import { useEffect } from 'react';
import { getHotkeyHandler, getHotkeyMatcher, type HotkeyItemOptions } from './parse-hotkey';

export type { HotkeyItemOptions };
export { getHotkeyHandler };

export type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?];

function shouldFireEvent(
  event: KeyboardEvent,
  tagsToIgnore: string[],
  triggerOnContentEditable = false,
) {
  if (event.target instanceof HTMLElement) {
    if (triggerOnContentEditable) {
      return !tagsToIgnore.includes(event.target.tagName);
    }

    return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName);
  }

  return true;
}

export function useHotkeys(
  hotkeys: HotkeyItem[],
  tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
  triggerOnContentEditable = false,
) {
  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      hotkeys.forEach(
        ([hotkey, handler, options = { preventDefault: true, usePhysicalKeys: false }]) => {
          if (
            getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
            shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
          ) {
            if (options.preventDefault) {
              event.preventDefault();
            }

            handler(event);
          }
        },
      );
    };

    document.documentElement.addEventListener('keydown', keydownListener);
    return () => document.documentElement.removeEventListener('keydown', keydownListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotkeys]);
}
