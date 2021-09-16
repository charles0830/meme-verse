import React from 'react';
import { Box, Text, Spacer, Flex, Button, Image } from '@chakra-ui/react';
import { BiComment, BiLike } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { MemeType } from '../types';

interface MemeProps {
  meme: MemeType;
  totalComments: number;
}

const Meme: React.FC<MemeProps> = ({ meme, totalComments }) => {
  return (
    <Link to={`/t/meme/${meme?._id}`}>
      <Box
        w="100%"
        h="100%"
        maxH="500px"
        position="relative"
        borderRadius="xl"
        shadow="sm"
      >
        <Box w="100%" h="100%" position="relative" zIndex="100">
          <Image alt="meme image" w="full" h="full" src={meme?.image} />
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
                <Text ml="1">{meme?.like}</Text>
              </Button>
              <Box d="flex" alignItems="center">
                <BiComment />
                <Text ml="1">{totalComments}</Text>
              </Box>
            </Flex>
            <Spacer />
            <Text fontWeight="thin" fontStyle="italic">
              @{meme?.user?.username}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default Meme;
