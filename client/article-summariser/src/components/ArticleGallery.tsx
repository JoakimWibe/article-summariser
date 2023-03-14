import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardFooter, Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../constants/api';
import { ArticleContext } from '../context/Context';
import { Article } from '../types';

const ArticleGallery = () => {
  const { articles, setArticles } = useContext(ArticleContext);
  const [inputValue, setInputValue] = useState('');

  const deleteArticle = async (id: number) => {
    console.log(id);
    try {
      await axios.delete(baseUrl + '/' + id);
      setArticles(articles.filter((summary: Article) => summary.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {articles.length < 1 && <Text textAlign={'center'}>No articles yet! Fill out the form to generate one.</Text>}
      {articles.length > 0 && <Input onChange={e => setInputValue(e.target.value)} w={{ md: 'lg', sm: '100%' }} mb={10} placeholder="Search..." />}

      <Flex direction={'column'}>
        {articles
          .filter(article => article.title.toLowerCase().includes(inputValue))
          .map((article: Article) => (
            <Card mx={5} mb={5} key={article.id} direction={{ md: 'row', sm: 'column' }} overflow="hidden" variant="outline">
              <Image objectFit="cover" maxW={{ sm: '100%', md: '200px' }} src={article.imageUrl} />

              <Stack>
                <CardBody>
                  <Heading size="md">{article.title}</Heading>
                </CardBody>

                <CardFooter display={'flex'} alignItems={'center'}>
                  <Link to={`/articles/${article.id}`}>
                    <Button colorScheme={'blue'} variant={'solid'}>
                      Go to summary
                    </Button>
                  </Link>

                  <Button ml={5} onClick={() => deleteArticle(article.id)} colorScheme={'red'} variant={'outline'}>
                    Delete summary
                    <DeleteIcon ml={3} />
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))}
      </Flex>
    </>
  );
};

export default ArticleGallery;
