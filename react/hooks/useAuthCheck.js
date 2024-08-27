import GlobalDataContext from "components/hooks/GlobalContext";
import { useSessionStorage } from "components/hooks/useSessionStorage";
import { message } from "config/Message";
import { AuthModalType } from "lib/constants/enum/AuthModalType";
import StorageKeys from "lib/constants/enum/StorageKeys";
import { isEmptyString, isNull } from "lib/constants/utils/ObjectUtils";
import { useQueryState } from "lib/hooks/useQueryState";
import { useContext, useEffect, useState } from "react";

export const useAuthCheck = () => {
  const [query, setQuery, router] = useQueryState();
  const { isLoggedIn } = useContext(GlobalDataContext);
  const [callbackState, setCallbackState] = useState();
  const [, setPrevUrl] = useSessionStorage(StorageKeys.PREV_URL);

  useEffect(async () => {
    if (!isLoggedIn) {
      return;
    }

    if (!isEmptyString(query.authCallback) && isEmptyString(query.authState)) {
      if (!isNull(callbackState)) {
        const { fn } = callbackState;
        await fn();
      }
      setQuery({
        authCallback: null,
      });
    }

    return () => {};
  }, [isLoggedIn, query, callbackState]);

  const withAuthCheck = (callback) => {
    if (isNull(callback) || typeof callback !== "function") {
      throw new Error(message.error.CALLBACK_IS_REQUEIRED);
    }
    if (isLoggedIn) {
      callback();
    } else {
      setPrevUrl(router.asPath);
      setCallbackState({ fn: callback });
      setQuery(
        {
          authState: AuthModalType.LOGIN,
          authCallback: true,
        },
        { replace: true }
      );
    }
  };

  return [withAuthCheck, { isLoggedIn, query, setQuery, router }];
};
