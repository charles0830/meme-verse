import {
  Box,
  Spacer,
  Heading,
  Flex,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { IoSunnyOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { devSignout } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const Navbar = () => {
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
          size="sm"
          aria-label="Change theme"
          icon={<IoSunnyOutline />}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
