import { Button, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ArticleGallery from '../components/ArticleGallery';
import GenerateArticleForm from '../components/GenerateArticleForm';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex pt={20} w={'100%'} alignItems={'center'} direction={'column'}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={'heading'}>Generate summary</ModalHeader>
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

      <ArticleGallery />
    </Flex>
  );
};

export default Home;
