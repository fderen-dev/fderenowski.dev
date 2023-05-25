// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BlogpostDocumentWithTags } from "models/blog/BlogpostDocumentWithTags";
import { Tag } from "models/blog/Tag";
import { createClient } from "prismicio";

import { TypeTools } from "utils/TypeTools";

const getTags = (raw: string | null): Array<Tag> => {
  if (TypeTools.isNullOrUndefined(raw)) {
    return [];
  }

  return raw!.split(";").map<Tag>((name, idx) => ({
    name,
    url: `blog?tag=${name}`,
    key: `tag-${idx}`,
  }));
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<BlogpostDocumentWithTags>>
) {
  const client = createClient();

  if (req.method === "GET") {
    client
      .getAllByType("blogpost")
      .then((posts) => {
        const postsWithMappedTasks =
          posts?.map((post) => ({
            ...post,
            data: { ...post.data, tags: getTags(post.data?.tags) },
          })) ?? [];

        res.status(200).json(postsWithMappedTasks);
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
