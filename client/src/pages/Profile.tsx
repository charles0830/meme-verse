import React, { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../utils/reduxHook';
import { getProfile } from '../redux/actions/UserAction';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, user } = useAppSelector((state) => state.profileGet);
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfile(userInfo?._id));
  }, [dispatch, userInfo?._id]);
  return (
    <Box>
      {loading ? (
        'Loading'
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
          <Box ml="4">
            <Text fontSize="2xl" fontWeight="bold">
              @{user?.username}
            </Text>
            <Text color="gray.600" fontSize="sm">
              {user?.email}
            </Text>
          </Box>
        </Flex>
      )}

      <Box>
        <Text fontSize="xl" pb="1" fontWeight="black">
          Posts
        </Text>
        <hr />
      </Box>
    </Box>
  );
};

export default Profile;
