import { Box, Flex, Alert, AlertIcon, Button, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { register } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const Register: React.FC = () => {
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
      .max(6, 'maximum 5 character'),
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
                <Alert mt="2" status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
