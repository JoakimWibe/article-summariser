import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../constants/api';
import { Article } from '../types';

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: '',
    summary: '',
    imageUrl: '',
    articleUrl: '',
    publishDate: '',
  });

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex pt={32} maxW={'xl'} mx={{ sm: 5, md: 'auto' }} direction={'column'}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link className="link" to="/">
            Home
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Article {article.id}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Image borderRadius={5} mt={3} src={article.imageUrl} />
      <Heading my={3} fontSize={'2xl'} as={'h1'}>
        {article.title}
      </Heading>
      <Text fontWeight={'bold'}>Published: {article.publishDate}</Text>
      <Text my={3}>{article.summary}</Text>
      <Text fontWeight={'bold'} mb={3}>
        Source:
      </Text>
      <Link className="link" to={article.articleUrl}>
        {article.articleUrl}
      </Link>
    </Flex>
  );
};

export default ArticleDetails;
