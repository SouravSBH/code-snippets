import { useRouter } from "next/router";
export const useQueryState = () => {
  const router = useRouter();
  const setQuery = (query, { replace = false, shallow = true } = {}) => {
    const allQueries = { ...router.query, ...query };
    const cleanQuery = Object.keys(allQueries).reduce((acc, cur) => {
      if (allQueries[cur] !== null && allQueries[cur] !== undefined) {
        acc[cur] = allQueries[cur];
      }
      return acc;
    }, {});
    if (replace) {
      router.replace({ query: cleanQuery }, undefined, { shallow });
    } else {
      router.push({ query: cleanQuery }, undefined, { shallow });
    }
  };
  return [router.query, setQuery, router];
};
