/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Grid,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { baseURL } from '../baseURL';
import Loader from '../components/Loader';
import Meme from '../components/Meme';
import { createMeme, getMemes } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const Feed: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const { colorMode } = useColorMode();

  const [newMemeLink, setNewMeme] = useState('');
  const dispatch = useDispatch();
  const { loading, memes, error, createMemeError } = useAppSelector(
    (state) => state.memesGet
  );

  useEffect(() => {
    dispatch(getMemes());
  }, [dispatch]);

  const submitMemeHandler = () => {
    if (
      newMemeLink !== '' &&
      newMemeLink.includes('/') &&
      newMemeLink.includes('.')
    ) {
      dispatch(createMeme(newMemeLink));
      setNewMeme('');
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitMemeHandler();
    }
  };

  const uploadMemeFileHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        `${baseURL}/api/upload`,
        formData,
        config
      );
      if (data) {
        setUploading(false);
        dispatch(createMeme(data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box w="full" h="auto">
      <Box
        w="full"
        bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
        p="2"
        mb="2"
      >
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

          {uploading ? (
            <Loader />
          ) : (
            <>
              <input
                onChange={uploadMemeFileHandler}
                type="file"
                id="actual-btn"
                hidden
              />
              <label className="uploadBtnLabel" htmlFor="actual-btn">
                Upload
              </label>
            </>
          )}
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
