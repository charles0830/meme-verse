import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface CommentProps {
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Box w="full" h="auto" mb="2" d="flex" alignItems="center" px="2">
      <Text fontSize="sm"> {comment}</Text>
      <Text fontSize="xs" ml="5">
        1h
      </Text>
    </Box>
  );
};

export default Comment;
