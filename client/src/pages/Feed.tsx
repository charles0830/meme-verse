import { Box, Grid, Input, Flex, Button } from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import Post from '../components/Post';

const Feed = () => {
  return (
    <Box w="full" h="auto">
      <Box w="full" bg="gray.100" p="2" mb="2">
        <Flex alignItems="center">
          <Box flex={1}>
            <Input variant="flushed" placeholder="Meme link..." fontSize="xs" />
          </Box>
          <Button colorScheme="messenger" size="sm" fontSize="sm" mr="2">
            Post
          </Button>
          <Button
            leftIcon={<AiOutlineUpload />}
            colorScheme="teal"
            size="sm"
            variant="solid"
          >
            Upload
          </Button>
        </Flex>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </Box>
  );
};

export default Feed;
