// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { createClient } from "prismicio";

import { Post, Posts } from "models/blog/Posts";
import { Tag } from "models/blog/Tag";
import { TAGS } from "utils/constants";
import { TypeTools } from "utils/TypeTools";

let posts: Posts | null = null;

export interface PaginatedResponse<Data> {
  total: number;
  currentPage: number;
  totalPages: number;
  data: Array<Data>;
  hasMore: boolean;
}

export class PaginatedPosts implements PaginatedResponse<Post> {
  total: number;
  currentPage: number;
  totalPages: number;
  data: Array<Post>;
  hasMore: boolean;

  constructor(
    total?: number,
    currentPage?: number,
    totalPages?: number,
    data?: Array<Post>,
    hasMore?: boolean
  ) {
    this.total = total ?? 0;
    this.currentPage = currentPage ?? 0;
    this.totalPages = totalPages ?? 0;
    this.data = data ?? [];
    this.hasMore = hasMore ?? false;
  }
}

function parsePaginationArg(
  arg: string | Array<string>,
  fallback: number
): number {
  let result = typeof arg === "string" ? parseInt(arg) : fallback;

  return isNaN(result) ? fallback : result;
}

function getPaginatedPosts(
  posts: Array<Post>,
  page: string | string[],
  limit: string | string[]
): PaginatedPosts {
  const _page = parsePaginationArg(page, 1);
  const _limit = parsePaginationArg(limit, 10);
  const startIndex = (_page - 1) * _limit;
  const endIndex = _page * _limit;
  const totalPages = Math.ceil(posts.length / _limit);
  const postsSlice = posts.slice(startIndex, endIndex);
  const hasMore = _page >= endIndex;

  return new PaginatedPosts(totalPages, _page, totalPages, postsSlice, hasMore);
}

function getTags(raw: string | null): Array<Tag> {
  if (TypeTools.isNullOrUndefined(raw)) {
    return [];
  }

  return raw!.split(";").reduce((tagsList, currentRawTagName) => {
    if (TAGS[currentRawTagName]) {
      tagsList.push(TAGS[currentRawTagName]);
    }

    return tagsList;
  }, [] as Array<Tag>);
}

function filterPostsWithTags(
  posts: Array<Post>,
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
  const blogPosts = await client.dangerouslyGetAll<Content.BlogpostDocument>({
    filters: [prismic.filter.at("document.type", "blogpost")],
  });

  posts =
    blogPosts?.map((post) => ({
      ...post,
      data: { ...post.data, tags: getTags(post.data?.tags) },
    })) ?? [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedPosts | null>
) {
  const { method, query } = req;
  const { page = "1", limit = "10" } = query;

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

      if (!posts!.length) {
        res.status(200).json(new PaginatedPosts());
      }

      let _posts = cloneDeep(posts) as Posts;

      if (query.tag) {
        _posts = filterPostsWithTags(_posts, query.tag);
      }

      res.status(200).json(getPaginatedPosts(_posts, page, limit));
      break;
    }
    default: {
      res.statusMessage = "Unsupported HTTP method";
      res.status(500);
    }
  }
}
