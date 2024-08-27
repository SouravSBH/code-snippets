import { useRouter } from "next/router";
import { useEffect } from "react";

export const useSaveScrollPosition = (key) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    key = key || router.asPath;
    const position = JSON.parse(sessionStorage.getItem(key));
    if (position !== null && position !== undefined) {
      setTimeout(() => {
        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
        sessionStorage.removeItem(key);
      }, 0);
    }
    const handleRouteChange = (url, { shallow }) => {
      if (shallow) {
        return;
      }
      sessionStorage.setItem(key, JSON.stringify(window.scrollY));
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
};
