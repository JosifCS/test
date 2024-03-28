// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { post } from "@ceskysoftware/components/client";
import { UseSearchOffset } from "@ceskysoftware/components/hooks";
import type { NextApiRequest, NextApiResponse } from "next";

export type Comment = {
  name: string;
  postId: number;
  id: number;
  email: string;
  body: string;
};

export type GraphQlResponse<TData> = {
  items: TData[];
  totalCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GraphQlResponse<Comment>>
) {
  const { skip, take }: UseSearchOffset<any> = req.body;

  const data = await post<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments"
  );

  const s = skip ?? 0;
  const t = take ?? 10;

  data?.slice(s, s + t);

  res.status(200).json({
    items: data?.slice(s, s + t) ?? [],
    totalCount: data?.length ?? 0,
  });
}
