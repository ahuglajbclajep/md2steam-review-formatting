/* eslint-disable react-hooks/exhaustive-deps */

import { get, set } from "idb-keyval";
import { Inputs, useCallback, useEffect, useRef } from "preact/hooks";

const useStorage = <T>(
  key: string
): [(value: T) => Promise<void>, () => Promise<T | null>] => {
  const save = useCallback((value: T) => set(key, value), []);
  const load = useCallback(() => get<T | null>(key), []);

  return [save, load];
};

const useEffectAsync = (
  effect: () => Promise<void>, // cleanup function is not supported
  inputs?: Inputs
): void => {
  useEffect(() => {
    effect();
  }, inputs);
};

type Handler = (e: KeyboardEvent) => void | Promise<void>;
const useCtrlKeyDown = (key: string, handler: Handler): void => {
  // see https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  const ref = useRef<Handler>(null);
  ref.current = handler;

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      if (e.ctrlKey && e.key === key) {
        e.preventDefault();
        ref.current(e);
      }
    };

    document.addEventListener("keydown", listener);

    return (): void => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
};

export { useStorage, useEffectAsync, useCtrlKeyDown };
