import { Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { baseUrl } from '../constants/api';
import { ArticleContext } from '../context/Context';
import ErrorMessage from './ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs } from '../types';

const GenerateArticleForm = ({ onClose }: { onClose: () => void }) => {
  const { articles, setArticles } = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const generateArticle: SubmitHandler<Inputs> = async data => {
    setLoading(true);

    try {
      const response = await axios.post(baseUrl, {
        url: data.url,
        minLength: data.minLen,
        maxLength: data.maxLen,
      });

      setArticles([...articles, response.data]);
      onClose();
    } catch (error) {
      setError('An error has occured when calling the API');
      setLoading(false);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(generateArticle)}>
      <fieldset disabled={loading ? true : false}>
        <Flex mt={10} direction={'column'} w={'auto'}>
          <Input variant={'flushed'} placeholder="Article url" defaultValue="" {...register('url', { required: true })} />
          {errors.url && (
            <Text mt={2} color={'red.500'}>
              This field is required
            </Text>
          )}

          <Input
            mt={5}
            variant={'flushed'}
            type="number"
            placeholder="Min length (between 10 - 300)"
            defaultValue=""
            {...register('minLen', { required: true, min: 10, max: 300 })}
          />
          {errors.minLen && (
            <Text mt={2} color={'red.500'}>
              Please provide a number between 10 - 300
            </Text>
          )}

          <Input
            mt={5}
            variant={'flushed'}
            type="number"
            placeholder="Max length (between 10 - 300)"
            defaultValue=""
            {...register('maxLen', { required: true, min: 10, max: 300 })}
          />
          {errors.maxLen && (
            <Text mt={2} color={'red.500'}>
              Please provide a number between 10 - 300
            </Text>
          )}

          <Button isLoading={loading} loadingText="Generating..." type="submit" my={5} colorScheme={'blue'}>
            Generate summary
          </Button>

          {error.length > 0 && <ErrorMessage errorMessage={error} />}
        </Flex>
      </fieldset>
    </form>
  );
};

export default GenerateArticleForm;
