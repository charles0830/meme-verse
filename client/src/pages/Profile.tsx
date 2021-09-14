import { Box, Flex, Text } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box>
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
            Saiful Islam
          </Text>
          <Text fontSize="sm" fontWeight="thin">
            @saifulshihab
          </Text>
          <Text color="gray.600" fontSize="sm">
            saifulshihab29@gmail.com
          </Text>
        </Box>
      </Flex>

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
