import getPosts from "@/services/getPosts";
import { readFileSync, readdirSync } from "fs";
import path from "path";

function searchText(obj: any, text: string) {
  let found = false;

  function traverse(obj: any) {
    if (typeof obj === "object") {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          traverse(obj[key]);
        }
      }
    } else if (String(obj).includes(text)) {
      found = true;
    }
  }

  traverse(obj);
  return found;
}

const tasks = [
  {
    title: "Create a home page",
    subTasks: [
      {
        title: "Create a page.tsx",
        description: "On the app folder, create a page.tsx file",
        validateTask: () => {
          try {
            const files = readdirSync(path.join("src/app"));

            return files.includes("page.tsx");
          } catch {
            return false;
          }
        },
      },
      {
        title: "Create a component",
        description:
          "Inside app/page.tsx, create a component and export it as default",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/page.tsx"));

            return file.toString().includes("export default");
          } catch {
            return false;
          }
        },
      },
      {
        title: "Show a list of posts",
        description:
          "Use the getPosts service inside of your component to render a list of posts with the title and description",
        validateTask: () => {
          try {
            const component = require("@/app/page");
            if (component) {
              const componentObject = component.default();

              const posts = getPosts();

              return posts.every((post) => {
                return (
                  searchText(componentObject, post.title) &&
                  searchText(componentObject, post.description)
                );
              });
            }

            return false;
          } catch {
            return false;
          }
        },
        exampleTitle: "src/app/page.tsx",
        example: `
        const HomePage = () => {
      const posts = getPosts();

      return (
        <div className="flex flex-col space-y-2">
          {posts.map(post => (
            <div key={post.slug} className="flex flex-col">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>
          ))}
        </div>
      );
    };

  export default HomePage;`.trim(),
      },
      {
        title: "Link title to post page",
        description:
          "In the post map, you have to wrap the title with the <Link /> component and use the post slug as href",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/page.tsx"));
            const fileText = file.toString();

            return (
              fileText.includes("<Link") &&
              fileText.includes("href=") &&
              fileText.includes("post.slug")
            );
          } catch {
            return false;
          }
        },
        exampleTitle: "src/app/page.tsx",
        example: `
  import Link from "next/link";

  const Component = () => {
    return (
      <Link href={post.slug}>
        <h2>{post.title}</h2>
      </Link>
    )
  }`.trim(),
      },
    ],
  },
  {
    title: "Create a post page",
    subTasks: [
      {
        title: "Create a page.tsx",
        description: "On the app/[slug] folder, create a page.tsx file",
        validateTask: () => {
          try {
            const files = readdirSync(path.join("src/app/[slug]"));

            return files.includes("page.tsx");
          } catch {
            return false;
          }
        },
        exampleTitle: "app/[slug]/page.tsx",
        example: `src/
  ├── app/
  │   ├── [slug]/
  │   │   ├── page.tsx
  │   └── ...
  └── ...`,
      },
      {
        title: "Create a component",
        description:
          "Inside app/[slug]/page.tsx, create a component and export it as default",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/[slug]/page.tsx"));

            return file.toString().includes("export default");
          } catch {
            return false;
          }
        },
        exampleTitle: "app/[slug]/page.tsx",
        example: `
  const PostPage = () => {
  };

  export default PostPage;`.trim(),
      },
      {
        title: "Show post",
        description:
          "Use the getPost service inside of your component to render the title, category, author, date and content",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/[slug]/page.tsx"));
            const fileContent = file.toString();

            return (
              fileContent.includes("title") &&
              fileContent.includes("category") &&
              fileContent.includes("author") &&
              fileContent.includes("date")
            );
          } catch {
            return false;
          }
        },
        exampleTitle: "",
        example: `
          const PostPage = ({ params: { slug } }: { params: { slug: string } }) => {
    const post = getPost(slug);

    return (
      <div className="flex flex-col space-y-2">
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <MarkdownPreview source={post.content} />
      </div>
    );
  };

  export default PostPage;`.trim(),
      },
    ],
  },
  {
    title: "Create an API endpoint",
    subTasks: [
      {
        title: "Create a route.ts",
        description: "On the app/api/posts folder, create a route.ts file",
        validateTask: () => {
          try {
            const files = readdirSync(path.join("src/app/api/posts"));

            return files.includes("route.ts");
          } catch {
            return false;
          }
        },
        exampleTitle: "app/api/posts/route.ts",
        example: `src/
├── app/
│   ├── api/
│   │   ├── posts/
│   │   │   ├── route.ts
│   └── ...
└── ...`,
      },
      {
        title: "Create a route handler",
        description: "export a GET function",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/api/posts/route.ts"));

            return (
              file.toString().includes("export async function GET") ||
              file.toString().includes("export {GET}") ||
              file.toString().includes("export { GET }")
            );
          } catch {
            return false;
          }
        },
        exampleTitle: "app/api/posts/route.ts",
        example: `export async function GET(request: Request) {}`,
      },
      {
        title: "Return a list of posts",
        description:
          "Using the same home service, return the list of posts in json format",
        validateTask: () => {
          try {
            const file = readFileSync(path.join("src/app/api/posts/route.ts"));

            return file.toString().includes("return Response.json(posts)");
          } catch {
            return false;
          }
        },
        exampleTitle: "app/api/posts/route.ts",
        example: `export async function GET(request: Request) {}`,
      },
    ],
  },
];

export default tasks;
