import { Box, Flex, Text, Button, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { register } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, success, error } = useAppSelector((state) => state.register);

  useEffect(() => {
    if (success) history.push('/t');
  }, [history, success]);

  const fieldValidationSchema = yup.object({
    email: yup.string().email().required('Email required!'),
    username: yup
      .string()
      .required('Username required!')
      .min(3, 'atleast 3 character')
      .max(5, 'maximum 5 character'),
    password: yup
      .string()
      .required('Password requied!')
      .min(3, 'atleast 3 character')
      .max(8, 'maximum 5 character'),
  });

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values) => {
          dispatch(register(values));
        }}
        validationSchema={fieldValidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box d="flex" flexDirection="column" p={3}>
              <InputField name="email" placeholder="Your email" label="Email" />
              <InputField
                name="username"
                placeholder="Choose a username"
                label="Username"
              />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
              <Flex alignItems="center">
                <Button
                  mt={4}
                  type="submit"
                  colorScheme="messenger"
                  disabled={isSubmitting}
                  isLoading={loading}
                  size="sm"
                >
                  Register
                </Button>
                <Spacer />
              </Flex>
              {error ? (
                <Box
                  mt="2"
                  w="full"
                  p="2"
                  px="4"
                  bg="red.100"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="red.500"
                  d="flex"
                  alignItems="center"
                >
                  <BiErrorAlt />
                  <Text ml="2">{error}</Text>
                </Box>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
