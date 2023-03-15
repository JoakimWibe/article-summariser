import { createContext } from 'react';
import { ContextArticles } from '../types';

export const ArticleContext = createContext<ContextArticles>({
  articles: [],
  setArticles: undefined,
});
