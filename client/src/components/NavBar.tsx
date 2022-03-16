import { Box, Flex, Heading, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const [{ data, fetching }] = useMeQuery({});

   let body = null;

   // data is loading
   if (fetching) {
     // user not logged in
   } else if (!data?.me) {
     body = (
       <>
         <NextLink href='/login'>
           <Link mr={2}>login</Link>
         </NextLink>
         <NextLink href='/register'>
           <Link>register</Link>
         </NextLink>
       </>
     );
     // user is logged in
   } else {
     body = (
       <Flex align='center'>
         <NextLink href='/create-post'>
           <Button as={Link} mr={4}>
             create post
           </Button>
         </NextLink>
         <Box mr={2}>{data.me.username}</Box>
         <Button
           onClick={async () => {
             await logout();
            
           }}
           isLoading={logoutFetching}
           variant='link'
         >
           logout
         </Button>
       </Flex>
     );
   }

  return (
    <Flex zIndex={1} position='sticky' top={0} bg='pink' p={4}>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <NextLink href='/'>
          <Link>
            <Heading>Reddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
