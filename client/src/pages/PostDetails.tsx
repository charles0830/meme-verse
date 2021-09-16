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
import moment from 'moment';
import React, { useEffect } from 'react';
import { BiLike, BiTimeFive } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Loader from '../components/Loader';
import CommentsContainer from '../container/CommentsContainer';
import { getMeme } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const PostDetails: React.FC = () => {
  const { memeId } = useParams<{ memeId: string }>();
  const dispatch = useDispatch();
  const { loading, meme, error } = useAppSelector((state) => state.memeGet);

  useEffect(() => {
    dispatch(getMeme(memeId));
  }, [dispatch, memeId]);
  return (
    <Box w="full" border="1px solid #ddd" borderRadius="10px" p="2">
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : meme ? (
        <>
          <Box w="full" h="400px" maxH="500px">
            <Image maxW="full" maxH="full" src={meme?.image} alt="mem" />
          </Box>
          <Flex mt="2" alignItems="center">
            <Button leftIcon={<BiLike />} size="sm" variant="solid">
              {meme?.like}
            </Button>
            <Spacer />
            <Text d="flex" alignItems="center" fontSize="sm">
              <BiTimeFive />
              <Text ml="1">{moment(meme?.createdAt).fromNow()}</Text>
            </Text>
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
