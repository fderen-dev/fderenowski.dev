import { Tag } from "models/blog/Tag";

export interface BlogPostsListTag extends Tag {
  id: string;
  url: string;
  name: string;
  isSelected: boolean;
}
