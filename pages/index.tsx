import { useSearch } from "@/features/useSearch";
import Link from "next/link";

export default function Home({ init }: { init: string }) {
  const { data, setPage } = useSearch({ id: 1, t: init });

  return (
    <div>
      <div>{data.id}</div>
      <div>{data.t}</div>
      <input
        type="number"
        defaultValue={1}
        onChange={(e) => setPage(+e.currentTarget.value)}
      />
      <Link href="/detail">Detail</Link>
    </div>
  );
}

const BB = ["nula", "jedna", "dva", "tři", "čtyři"];
const get = (fresh: boolean, init: string, n: number) => {
  if (fresh) return init;
  return BB[n];
};

export async function getServerSideProps() {
  console.log("SERVER");
  // Pass data to the page via props
  return { props: { init: "server data" } };
}
