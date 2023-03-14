import { EditIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <Flex alignItems={'center'} bg={'blue.500'} color={'white'} w={'100%'} p={5}>
        <Link to="/">
          <Heading mr={5} as={'h1'}>
            Article Summariser
          </Heading>
        </Link>
        <EditIcon fontSize={'4xl'} />
      </Flex>
    </header>
  );
};

export default Navbar;
