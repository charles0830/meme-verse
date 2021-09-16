import {
  Box,
  Grid,
  Input,
  Flex,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Meme from '../components/Meme';
import { createMeme, getMemes } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const Feed = () => {
  const [newMemeLink, setNewMeme] = useState('');
  const dispatch = useDispatch();
  const { loading, memes, error, createMemeError } = useAppSelector(
    (state) => state.memesGet
  );

  useEffect(() => {
    dispatch(getMemes());
  }, [dispatch]);

  const submitMemeHandler = () => {
    if (newMemeLink !== '') {
      dispatch(createMeme(newMemeLink));
      setNewMeme('');
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitMemeHandler();
    }
  };

  return (
    <Box w="full" h="auto">
      <Box w="full" bg="gray.100" p="2" mb="2">
        <Flex alignItems="center">
          <Box flex={1}>
            <Input
              value={newMemeLink}
              onChange={(e) => setNewMeme(e.target.value)}
              variant="flushed"
              placeholder="Meme link..."
              fontSize="xs"
              onKeyPress={keyPressHandler}
            />
          </Box>
          <Button
            onClick={submitMemeHandler}
            colorScheme="messenger"
            size="sm"
            fontSize="sm"
            mr="2"
          >
            Post
          </Button>
          <Button
            leftIcon={<AiOutlineUpload />}
            colorScheme="teal"
            size="sm"
            variant="solid"
            onClick={submitMemeHandler}
          >
            Upload
          </Button>
        </Flex>
      </Box>
      {createMemeError ? <Alert>{error}</Alert> : null}
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
              key={meme?.meme?._id}
              meme={meme?.meme}
              totalComments={meme?.totalComments}
            />
          ))}
        </Grid>
      ) : (
        'No memes!'
      )}
    </Box>
  );
};

export default Feed;
