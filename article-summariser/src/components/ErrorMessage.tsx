import { Text } from '@chakra-ui/react';

type ErrorProp = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: ErrorProp) => {
  return (
    <Text border={'1px'} borderRadius={5} textAlign={'center'} mb={5} p={2} color={'red.400'}>
      {errorMessage}
    </Text>
  );
};

export default ErrorMessage;
