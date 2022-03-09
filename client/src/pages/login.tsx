import {
  Box,
} from "@chakra-ui/core";
import { Button } from "@chakra-ui/react";
import {  Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";


const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values ,{setErrors}) => {
          const response = await login({options: values});
          //   response.data.register?.user?.id;

          //   return register(values);

          if (response.data?.login.errors) {
            // [{ field: "username", message: "something wrong" }];

            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
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
            Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
