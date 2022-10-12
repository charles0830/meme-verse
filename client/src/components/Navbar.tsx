import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { IoSunnyOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { devSignout } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const Navbar: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <Flex shadow="sm" p="1" alignItems="center">
      <Box p="2">
        <Link to="/">
          <Heading size="lg" fontWeight="extrabold">
            Meme
            <Text d="inline-block" color="messenger.500">
              Verse
            </Text>
          </Heading>
        </Link>
      </Box>
      <Spacer />
      <Flex>
        {!isAuthenticated ? (
          <Link to="/login">
            <Button
              size="sm"
              d="flex"
              alignItems="center"
              colorScheme="messenger"
              mr="2"
            >
              <BiLogIn /> <Text ml="1"> Login</Text>
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            d="flex"
            alignItems="center"
            colorScheme="red"
            mr="2"
            onClick={() => {
              dispatch(devSignout());
            }}
          >
            <BiLogOut /> <Text ml="1"> Logout</Text>
          </Button>
        )}
        <IconButton
          onClick={toggleColorMode}
          size="sm"
          aria-label="Change theme"
          icon={<IoSunnyOutline />}
        />
        <a
          href="https://github.com/saifulshihab/meme-verse"
          target="_blank"
          rel="noreferrer"
        >
          <IconButton
            ml="2"
            size="sm"
            aria-label="repo link"
            icon={<AiFillGithub />}
          />
        </a>
      </Flex>
    </Flex>
  );
};

export default Navbar;
