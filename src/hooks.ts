import { Inputs, useEffect, useRef } from "preact/hooks";

const useEffectAsync = (
  // cleanup function is not supported
  effect: () => Promise<void>,
  inputs: Inputs = []
): void => {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    window.addEventListener("keydown", listener);

    return (): void => {
      window.removeEventListener("keydown", listener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useEffectAsync, useCtrlKeyDown };
