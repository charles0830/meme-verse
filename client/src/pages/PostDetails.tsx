import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import CommentsContainer from '../container/CommentsContainer';
import { getMeme, likeMeme } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const PostDetails: React.FC = () => {
  const { memeId } = useParams<{ memeId: string }>();
  const dispatch = useDispatch();
  const { loading, meme, error, likeError } = useAppSelector(
    (state) => state.memeGet
  );
  console.log(meme);

  useEffect(() => {
    dispatch(getMeme(memeId));
  }, [dispatch, memeId]);

  const likeHandler = () => {
    dispatch(likeMeme(memeId));
  };
  return (
    <Box w="full" border="1px solid #ddd" borderRadius="10px" p="2">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : likeError ? (
        <Alert status="error">
          <AlertIcon />
          {likeError}
        </Alert>
      ) : meme ? (
        <>
          <Box w="full" h="400px" maxH="500px">
            <Image maxW="full" maxH="full" src={meme?.image} alt="mem" />
          </Box>
          <Flex mt="2" alignItems="center">
            <Button
              leftIcon={<BiLike />}
              size="sm"
              colorScheme={meme?.likeStatus === 1 ? 'messenger' : 'gray'}
              onClick={likeHandler}
            >
              {meme?.like}
            </Button>
            <Spacer />
            <Text fontSize="sm">posted by @{meme?.user?.username}</Text>
          </Flex>
        </>
      ) : null}
      <CommentsContainer memeId={memeId} />
    </Box>
  );
};

export default PostDetails;
