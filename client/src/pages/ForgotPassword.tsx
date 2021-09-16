import { Box, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { getPasswordResetLink } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, error, success, message } = useAppSelector(
    (state) => state.resetLinkGet
  );
  const fieldValidationSchema = yup.object({
    email: yup.string().email().required('Email required!'),
  });

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          dispatch(getPasswordResetLink(values.email));
        }}
        validationSchema={fieldValidationSchema}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box d="flex" flexDirection="column" p={3}>
              <InputField
                name="email"
                placeholder="Enter your registered email..."
                label="Email"
              />
              <Button
                mt="2"
                disabled={isSubmitting}
                type="submit"
                colorScheme="green"
                isLoading={loading}
              >
                Get Reset Link
              </Button>
              {error ? (
                <Alert mt="2" status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              {success ? (
                <Alert mt="2" status="success">
                  <AlertIcon />
                  {message.message}
                </Alert>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
