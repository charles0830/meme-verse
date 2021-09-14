import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const Login = () => {
  const fieldValidationSchema = yup.object({
    usernameOrEmail: yup.string().required('Username or email required!'),
    password: yup.string().required('Password requied!'),
  });

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
        }}
        validationSchema={fieldValidationSchema}
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
