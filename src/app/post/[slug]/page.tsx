import path from "path";
import fs from "fs";
import { Metadata } from "next";
import posts from "@/posts/posts.json";
import { notFound } from "next/navigation";
import Comment from "@/components/comment";
import markdownit from "markdown-it";
import anchor from "markdown-it-anchor";
import mathjax3 from "markdown-it-mathjax3";
import shiki from "@shikijs/markdown-it";
import tocDoneRight from "markdown-it-toc-done-right";
import uslug from "uslug";
import plantuml from "markdown-it-plantuml";

let metadata: Metadata = {};

export default async function PostRender({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((item) => item.name === params.slug);
  post ? null : notFound();

  metadata = {
    title: `${post?.title} | Moroshima's Blog`,
  };
  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    `${params.slug}.md`
  );

  const markdown = [
    "[TOC]\n",
    fs
      .readFileSync(filePath, "utf8")
      .replace(/```plantuml\n[\s\S]*?\n```/g, (match) => {
        // 移除每个块中的 ```plantuml 和 ``` 标记
        return match.replace(/^\s*```plantuml\s*\n|\s*```\s*$/g, "");
      }),
  ].join("\n");

  const md = markdownit({
    // Enable HTML tags in source
    html: true,
    // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    xhtmlOut: true,
    // Autoconvert URL-like text to links
    linkify: true,
    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
    typographer: true,
  })
    .use(anchor)
    .use(mathjax3)
    .use(plantuml)
    .use(
      await shiki({
        themes: {
          light: "github-light-default",
          dark: "github-dark-default",
        },
      })
    )
    .use(tocDoneRight, { slugify: uslug, level: 2 });
  const result = md.render(markdown);

  return (
    <>
      <div>My Post: {params.slug}</div>
      <div dangerouslySetInnerHTML={{ __html: result }}></div>
      <Comment />
    </>
  );
}

export { metadata };
