import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Button } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

const REGISTER_MUT = `
mutation Register($username: String!, $password:String!){
    register(options:{username: $username, password: $password}){
        errors {
            field
            message
        }
        user {
            id
            username
        }
    }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
        //   const response = await register(values)
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            ></InputField>
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              ></InputField>
            </Box>
            <Button mt={4} type='submit' isLoading={isSubmitting} color='teal'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
