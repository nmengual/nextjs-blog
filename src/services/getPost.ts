import fs from "fs";
import matter from "gray-matter";
import path from "path";

const POSTS_FOLDER = "src/posts";

const getPost = (
  slug: string,
): {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  content: string;
} => {
  const file = fs.readFileSync(path.join(POSTS_FOLDER, `${slug}.mdx`), "utf8");

  const { data, content } = matter(file);

  return {
    ...(data as {
      title: string;
      description: string;
      category: string;
      author: string;
      date: string;
    }),
    content,
  };
};

export default getPost;
