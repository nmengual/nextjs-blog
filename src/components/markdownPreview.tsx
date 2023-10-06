import { MDXRemote } from "next-mdx-remote/rsc";

const MarkdownPreview = ({ source }: { source: string }) => {
  return (
    <div className="prose-base prose-headings:text-gray-800 text-gray-800 max-w-none prose-a:underline prose-a:text-gray-800 prose-headings:mb-1">
      <MDXRemote source={source} />
    </div>
  );
};

export default MarkdownPreview;
