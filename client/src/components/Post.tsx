import React from 'react';
import { Box, Text, Spacer, Flex, Button } from '@chakra-ui/react';
import { BiComment, BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Post: React.FC = () => {
  return (
    <Link to={`/t/meme/${'sdsd'}`}>
      <Box
        w="100%"
        h="100%"
        maxH="500px"
        position="relative"
        borderRadius="xl"
        shadow="sm"
      >
        <Box w="100%" h="100%" position="relative" zIndex="100">
          <img
            alt="dp"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            src="https://picsum.photos/800"
          />
        </Box>
        <Box
          position="absolute"
          opacity="0"
          _hover={{ opacity: 1 }}
          inset="0"
          zIndex="110"
          cursor="pointer"
          bg="rgba(0, 0, 0, 0.5);"
        >
          <Box
            w="full"
            position="absolute"
            bottom="0"
            h="30px"
            d="flex"
            alignItems="center"
            px="2"
            fontSize="xs"
            textColor="white"
            fontWeight="semibold"
          >
            <Flex>
              <Button
                variant="unstyled"
                size="xs"
                d="flex"
                alignItems="center"
                mr="4"
              >
                <BiLike />
                <Text ml="1">6</Text>
              </Button>
              <Box d="flex" alignItems="center">
                <BiComment />
                <Text ml="1">12</Text>
              </Box>
            </Flex>
            <Spacer />
            <Text fontWeight="thin" fontStyle="italic">
              @shihab
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Post;
