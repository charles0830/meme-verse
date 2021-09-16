import { Flex, Text, Spacer, Box, Image } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { CommentType } from '../types';

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Flex w="full" h="auto" mb="2" d="flex" alignItems="center" px="2">
      <Box w="20px" h="20px" borderRadius="full" mr="2">
        <Image
          src="https://picsum.photos/100"
          w="full"
          h="full"
          borderRadius="full"
          border="1px solid #ddd"
        />
      </Box>
      <Text fontSize="sm"> {comment.comment}</Text>
      <Spacer />
      <Text fontSize="xs" color="gray.500" fontStyle="italic" ml="5">
        {moment(comment.createdAt).fromNow(true)}
      </Text>
    </Flex>
  );
};

export default Comment;
