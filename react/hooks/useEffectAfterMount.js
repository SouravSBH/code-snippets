import { useEffect, useRef } from "react";

export const useEffectAfterMount = (effect = () => {}, deps = []) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    effect();
  }, deps);
};
