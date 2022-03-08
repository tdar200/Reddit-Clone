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
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
          //   response.data.register?.user?.id;

          //   return register(values);

          if (response.data?.register.errors) {
            [{ field: "username", message: "something wrong" }];

            setErrors(toErrorMap(response.data.register.errors));
          } 
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
function setErrors(arg0: { username: string }) {
  throw new Error("Function not implemented.");
}
