import { Box, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as yup from 'yup';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { resetPassword } from '../redux/actions/UserAction';
import { useAppSelector } from '../utils/reduxHook';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();

  const { loading, error, success } = useAppSelector(
    (state) => state.passwordReset
  );

  const fieldValidationSchema = yup.object({
    newPass: yup.string().required('Required!').min(3, 'Min 3 charatcer'),
    conPass: yup.string().required('Required!').min(3, 'Min 3 charatcer'),
  });

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ newPass: '', conPass: '' }}
        onSubmit={async (values) => {
          dispatch(resetPassword(token, values));
        }}
        validationSchema={fieldValidationSchema}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box d="flex" flexDirection="column" p={3}>
              <InputField
                name="newPass"
                placeholder="Choose new password"
                label="New Password"
              />
              <InputField
                name="conPass"
                placeholder="Retype new password"
                label="Confirm Password"
              />
              <Button
                mt="2"
                disabled={isSubmitting}
                type="submit"
                isLoading={loading}
                colorScheme="green"
              >
                Reset
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
                  Password reset successfully.
                </Alert>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ResetPassword;
