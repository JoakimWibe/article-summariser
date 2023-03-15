import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { baseUrl } from './constants/api';
import { ArticleContext } from './context/Context';
import ArticleDetails from './pages/ArticleDetails';
import Home from './pages/Home';
import '@fontsource/cabin';
import '@fontsource/roboto-condensed';

export const App = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      const response = await axios.get(baseUrl);
      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <ArticleContext.Provider value={{ articles, setArticles }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Routes>
      </ArticleContext.Provider>
    </ChakraProvider>
  );
};
