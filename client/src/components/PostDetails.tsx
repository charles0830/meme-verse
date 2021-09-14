import { Box, Image, Flex, Button, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { BiLike, BiTimeFive } from 'react-icons/bi';
import CommentsContainer from '../container/CommentsContainer';

const PostDetails: React.FC = () => {
  return (
    <Box w="full" border="1px solid #ddd" borderRadius="10px" p="2">
      <Box w="full" h="400px" maxH="500px">
        <Image
          maxW="full"
          maxH="full"
          src="https://picsum.photos/1920/1080"
          alt="mem"
        />
      </Box>
      <Flex mt="2" alignItems="center">
        <Button leftIcon={<BiLike />} size="sm" variant="solid">
          233
        </Button>
        <Spacer />
        <Text d="flex" alignItems="center" fontSize="sm">
          <BiTimeFive />
          <Text ml="1">1d</Text>
        </Text>
        <Spacer />
        <Text fontSize="sm">posted by @sjiasias</Text>
      </Flex>
      <CommentsContainer />
    </Box>
  );
};

export default PostDetails;
