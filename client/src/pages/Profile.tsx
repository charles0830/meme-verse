import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Text,
  Grid,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Meme from '../components/Meme';
import { getProfile, getUserMemes } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { loading, user } = useAppSelector((state) => state.profileGet);
  const { userInfo } = useAppSelector((state) => state.auth);

  const {
    loading: memesLoading,
    error: memesError,
    memes,
  } = useAppSelector((state) => state.userMemesGet);

  useEffect(() => {
    dispatch(getProfile(userInfo?._id));
    dispatch(getUserMemes());
  }, [dispatch, userInfo?._id]);
  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Flex alignItems="center" mb="2">
          <Box w="100px" h="100px" borderRadius="full">
            <img
              width="full"
              height="full"
              src="https://picsum.photos/200"
              alt="dp"
              style={{ borderRadius: 50 }}
            />
          </Box>
          <Box
            ml="4"
            textColor={colorMode === 'dark' ? 'gray.100' : 'gray.900'}
          >
            <Text fontSize="2xl" fontWeight="bold">
              @{user?.username}
            </Text>
            <Text fontSize="sm">{user?.email}</Text>
            <Text fontSize="sm">{memes ? memes?.length : 0} memes</Text>
          </Box>
        </Flex>
      )}

      <Box>
        <Text fontSize="xl" pb="1" fontWeight="black">
          Memes
        </Text>
        <hr />
        {memesLoading ? (
          <Loader />
        ) : memesError ? (
          <Alert status="error">
            <AlertIcon />
            {memesError}
          </Alert>
        ) : memes?.length > 0 ? (
          <Grid mt="3" templateColumns="repeat(3, 1fr)" gap={2}>
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
    </Box>
  );
};

export default Profile;
