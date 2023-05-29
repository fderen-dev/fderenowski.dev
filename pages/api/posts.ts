// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { createClient } from "prismicio";

import { Posts } from "models/blog/Posts";
import { Tag } from "models/blog/Tag";
import { TypeTools } from "utils/TypeTools";

let posts: Posts | null = null;

function getTags(raw: string | null): Array<Tag> {
  if (TypeTools.isNullOrUndefined(raw)) {
    return [];
  }

  return raw!.split(";").map<Tag>((name, idx) => ({
    name,
    url: `blog?tag=${name}`,
    key: `tag-${idx}`,
  }));
}

function filterPostsWithTags(
  posts: Posts,
  tags: string | Array<string>
): Posts {
  if (TypeTools.isString(tags)) {
    return posts.filter((post) =>
      post.data.tags.some((tag) => tag.name === tags)
    );
  } else if (TypeTools.isNonEmptyArray(tags)) {
    return posts.filter((post) => {
      const postTags = post.data.tags.map((postTag) => postTag.name);

      return isEqual(postTags, tags as Array<string>);
    });
  }

  return posts;
}

async function fetchBlogPostsFromCMS(): Promise<void> {
  const client = createClient();
  const blogPosts = await client.getAllByType("blogpost");

  posts =
    blogPosts?.map((post) => ({
      ...post,
      data: { ...post.data, tags: getTags(post.data?.tags) },
    })) ?? [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Posts | null>
) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      if (posts === null) {
        try {
          await fetchBlogPostsFromCMS();
        } catch {
          res.statusMessage = "Unable to fetch posts data";
          res.status(500);
          break;
        }
      }

      let response = cloneDeep(posts);

      if (response && query.tag) {
        response = filterPostsWithTags(response, query.tag);
      }

      res.status(200).json(response);
      break;
    }
    default: {
      res.statusMessage = "Unsupported HTTP method";
      res.status(500);
    }
  }
}
