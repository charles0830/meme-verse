import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const Login = () => {
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box d="flex" flexDirection="column" p={3}>
              <InputField
                name="usernameOrEmail"
                placeholder="usernameOrEmail"
                label="Username or Email"
              />

              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Flex alignItems="center">
                <Button
                  mt={4}
                  type="submit"
                  colorScheme="messenger"
                  isLoading={isSubmitting}
                  size="sm"
                >
                  Login
                </Button>
                <Spacer />
                <Link to="/forgot-password">forgot password</Link>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
