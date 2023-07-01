import { useCallback, useMemo, useState } from "react";

import { Tag } from "models/blog/Tag";

import { BlogPostsListTag } from "../TagsList/models";

function markSelectedTags(
  availableTags: Array<Tag>,
  selectedTags: Array<string>
): Array<BlogPostsListTag> {
  return availableTags.map((tag) => ({
    ...tag,
    isSelected: Boolean(
      selectedTags.find((selectedTag) => selectedTag === tag.path)
    ),
  }));
}

type ToggleTagSelected = (tag: BlogPostsListTag | Tag) => void;

interface ContainerProps {
  blogPostsTags: Array<Tag>;
  renderTagsList: (
    tags: Array<BlogPostsListTag>,
    toggleTagSelected: ToggleTagSelected
  ) => React.ReactNode;
  renderBlogPostsListContainer: (
    selectedTagsPaths: Array<string>,
    toggleTagSelected: ToggleTagSelected
  ) => React.ReactNode;
}

export const BlogContainer = ({
  blogPostsTags,
  renderTagsList,
  renderBlogPostsListContainer,
}: ContainerProps) => {
  const selectedTags: Array<string> = new URLSearchParams(
    window.location.search
  ).getAll("tag");
  const [tags, setTags] = useState<Array<BlogPostsListTag>>(
    markSelectedTags(blogPostsTags, selectedTags)
  );

  const toggleTagSelected = useCallback((tag: BlogPostsListTag | Tag) => {
    setTags((prev) => {
      const selectedTagIndex = prev.findIndex((_tag) => _tag.id === tag.id);

      if (selectedTagIndex === -1) {
        return prev;
      }

      const selectedTag = prev[selectedTagIndex];
      selectedTag.isSelected = !selectedTag.isSelected;

      return structuredClone(prev);
    });
  }, []);

  const selectedTagsPaths = useMemo(() => {
    return tags.reduce((tagsPaths, tag) => {
      if (tag.isSelected) {
        return [...tagsPaths, tag.path];
      }

      return tagsPaths;
    }, [] as Array<string>);
  }, [JSON.stringify(tags)]);

  return (
    <>
      {renderTagsList(tags, toggleTagSelected)}
      {renderBlogPostsListContainer(selectedTagsPaths, toggleTagSelected)}
    </>
  );
};
