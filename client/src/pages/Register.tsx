import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const Register = () => {
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
          console.log(values);
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
