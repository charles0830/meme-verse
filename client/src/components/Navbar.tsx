import {
  Box,
  Spacer,
  Heading,
  Flex,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { IoSunnyOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex shadow="sm" p="1" alignItems="center">
      <Box p="2">
        <Link to="/">
          <Heading size="lg" fontWeight="extrabold">
            Meme
            <Text d="inline-block" color="messenger.400">
              Verse
            </Text>
          </Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/register">
          <Button size="sm" colorScheme="teal" mr="2">
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button size="sm" colorScheme="messenger" mr="2">
            Log in
          </Button>
        </Link>
        <IconButton
          size="sm"
          aria-label="Change theme"
          icon={<IoSunnyOutline />}
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
