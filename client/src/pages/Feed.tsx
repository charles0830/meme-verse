import {
  Box,
  Grid,
  Input,
  Flex,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Meme from '../components/Meme';
import { getMemes } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const Feed = () => {
  const dispatch = useDispatch();
  const { loading, memes, error } = useAppSelector((state) => state.memesGet);

  useEffect(() => {
    dispatch(getMemes());
  }, [dispatch]);

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : memes?.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {memes.map((meme: any) => (
            <Meme
              key={meme._id}
              meme={meme.meme}
              totalComments={meme.totalComments}
            />
          ))}
        </Grid>
      ) : (
        'No'
      )}
    </Box>
  );
};

export default Feed;
