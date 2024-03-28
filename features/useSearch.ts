import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useCallback, useRef } from "react";

export const useSearch = <T extends object = any>(initData: T) => {
  const fresh = useRef<boolean>(true);
  const { push, query } = useRouter();
  let data = initData;

  if (!fresh.current) {
    const params = getParams(query);
    data = DEMO_DATA[params.page] as any;
  }

  const setPage = useCallback((page: number) => {
    fresh.current = false;
    // TODO: Set sor and params
    push(`?page=${page}`, undefined, { shallow: true });
  }, []);

  return {
    data,
    setPage,
  };
};

const getParams = (query: ParsedUrlQuery) => {
  return {
    page: typeof query.page == "string" ? +query.page : 1,
  };
};

export const DEMO_DATA = [
  { id: 1, t: "1 Cupidatat amet id nisi pariatur." },
  {
    id: 2,
    t: "2 Nisi magna reprehenderit adipisicing sunt cillum qui ut pariatur aliquip sint nulla ipsum sit officia.",
  },
  { id: 3, t: "3 Duis proident ex id ex tempor ullamco minim incididunt." },
  {
    id: 4,
    t: "4 Eu commodo ut duis excepteur esse fugiat excepteur deserunt incididunt laborum minim dolore.",
  },
];
