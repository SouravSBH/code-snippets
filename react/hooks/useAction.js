import { useCallback, useState } from "react";

export function useActionDispatcher(initialState) {
  let [state, setState] = useState(initialState);
  const dispatch = useCallback(
    async (action, payload) => {
      if (!action || !(action instanceof Function)) {
        return;
      }
      let newState = action(payload, state, dispatch);
      if (newState instanceof Promise) {
        newState = await newState;
      }
      if (newState !== undefined) {
        setState(newState);
      }
    },
    [state]
  );
  return [state, dispatch];
}
