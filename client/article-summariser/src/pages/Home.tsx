import {
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import ArticleGallery from '../components/ArticleGallery';
import GenerateArticleForm from '../components/GenerateArticleForm';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w={'100%'} alignItems={'center'} direction={'column'}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GenerateArticleForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex mt={5} w={'lg'} direction={{ sm: 'column', md: 'row' }} justifyContent={'space-between'} alignItems={'center'}>
        <Heading my={5} as={'h3'}>
          Articles
        </Heading>
        <Button onClick={onOpen} colorScheme={'blue'}>
          Generate summary
        </Button>
      </Flex>

      <Divider width={{ md: 'lg', sm: '100%' }} m={5} />

      <ArticleGallery />
    </Flex>
  );
};

export default Home;
