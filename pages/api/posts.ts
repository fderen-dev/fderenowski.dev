// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Content } from "@prismicio/client";
import { createClient } from "prismicio";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Content.BlogpostDocument>>
) {
  const client = createClient();

  if (req.method === "GET") {
    client
      .getAllByType("blogpost")
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch(() => {
        res.statusMessage = "Unable to fetch posts data";
        res.status(500);
      });
  } else {
    res.statusMessage = "Unsupported HTTP method";
    res.status(500);
  }
}
