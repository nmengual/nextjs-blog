import fs from "fs";
import matter from "gray-matter";
import path from "path";

const POSTS_FOLDER = "src/posts";

const getPosts = (): {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  content: string;
}[] => {
  const files = fs.readdirSync(path.join(POSTS_FOLDER));

  return files
    .map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(POSTS_FOLDER, filename),
        "utf8",
      );

      const { data, content } = matter(fileContent);

      return {
        ...(data as {
          title: string;
          description: string;
          category: string;
          date: string;
          author: string;
        }),
        slug: filename.replace(".mdx", ""),
        content,
      };
    })
    .reverse();
};

export default getPosts;
