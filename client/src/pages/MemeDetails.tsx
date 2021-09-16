import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BiLike } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Loader from '../components/Loader';
import CommentsContainer from '../container/CommentsContainer';
import { deleteMeme, getMeme, likeMeme } from '../redux/actions/MemeAction';
import { useAppSelector } from '../utils/reduxHook';

const MemeDetails: React.FC = () => {
  const { memeId } = useParams<{ memeId: string }>();
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, meme, error, likeError, deleteLoading, deleteSuccess } =
    useAppSelector((state) => state.memeGet);
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMeme(memeId));

    if (deleteSuccess) {
      history.push('/t/profile');
    }
  }, [history, dispatch, memeId, deleteSuccess]);

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
            <Spacer />
            {userInfo?._id === meme?.user?._id ? (
              <IconButton
                isLoading={deleteLoading}
                aria-label="delete meme"
                icon={<RiDeleteBin6Line />}
                size="sm"
                colorScheme="red"
                onClick={() => dispatch(deleteMeme(memeId))}
              />
            ) : null}
          </Flex>
        </>
      ) : null}
      <CommentsContainer memeId={memeId} />
    </Box>
  );
};

export default MemeDetails;
