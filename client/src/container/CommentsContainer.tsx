import { Box, Text, Input, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BiSend } from 'react-icons/bi';
import Comment from '../components/Comment';

const CommentsContainer: React.FC = () => {
  return (
    <Box w="full" p="2">
      <Text fontSize="xl" fontWeight="semibold" mb="2">
        Comments (34)
      </Text>
      <hr />
      <Box d="flex" alignItems="center" mt="2">
        <Input
          placeholder="Write a comment..."
          variant="outline"
          fontSize="sm"
          size="sm"
        />
        <IconButton
          ml="2"
          size="sm"
          aria-label="Change theme"
          colorScheme="messenger"
          icon={<BiSend />}
        />
      </Box>
      <Box pl="5" mt="2" w="full" maxH="300px" overflowY="scroll">
        <Comment comment="wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow" />
        <Comment comment="wow" />
        <Comment comment="wow" />
      </Box>
    </Box>
  );
};

export default CommentsContainer;
