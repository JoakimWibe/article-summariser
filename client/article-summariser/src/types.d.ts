export type Article = {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  articleUrl: string;
  publishDate: string;
};

export type ContextArticles = {
  articles: Article[];
  setArticles: Dispatch<SetStateAction<Article>>;
};

export type Inputs = {
  url: string;
  minLen: number;
  maxLen: number;
};
