import { Article } from "@/types";
import { GetStaticPropsContext, NextPage } from "next";
import path from "path";
import fs from "fs/promises";

interface Props {
  article: Article;
}

async function getAllArticlesSlugs(): Promise<string[]> {
  const dir = path.join(process.cwd(), "/articles-content");
  try {
    const articles = await fs.readdir(dir);
    return articles
      .filter((article) => !article.startsWith("."))
      .map((article) => article.replace(path.extname(article), ""));
  } catch {
    throw `Failed to read ${dir} to generate article slugs`;
  }
}

async function getArticleContentBySlug(slug: string): Promise<Article> {
  const dir = path.join(process.cwd(), "/articles-content");
  const pageLocation = path.join(dir, `${slug}.json`);
  const fileContent = await fs.readFile(pageLocation, { encoding: "utf8" });
  const article = JSON.parse(fileContent) as Article;

  return article;
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  try {
    const article = await getArticleContentBySlug(params?.slug as string);

    return { props: { article } };
  } catch (error) {
    console.error(error);
    return { redirect: { destination: "/500", permanent: false } };
  }
}

export async function getStaticPaths() {
  const slugs = await getAllArticlesSlugs();
  const _paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths: _paths,
    fallback: false,
  };
}

const Page: NextPage<Props> = ({ article }) => (
  <div>
    <h1>{article.title[0]}</h1>
    <p>{article.intro.join(" ")}</p>
  </div>
);

export default Page;
