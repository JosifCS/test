import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home({ data }: { data: string }) {
  const { push, query } = useRouter();
  const p = new URLSearchParams(query as any);
  const ref = useRef<HTMLInputElement>(null);
  const fresh = useRef<boolean>(true);

  return (
    <div>
      Detail <Link href="/">Back</Link>
    </div>
  );
}

const BB = ["nula", "jedna", "dva", "tři", "čtyři"];
const get = (fresh: boolean, init: string, n: number) => {
  if (fresh) return init;
  return BB[n];
};

export async function getServerSideProps() {
  // Pass data to the page via props
  return { props: { data: "server data" } };
}
