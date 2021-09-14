import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const Register = () => {
  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
        }}
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
                  isLoading={isSubmitting}
                  size="sm"
                >
                  Register
                </Button>
                <Spacer />
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
