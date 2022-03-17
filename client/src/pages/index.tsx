import {
  Box,
  Button,
  Flex,
  Heading,

  Link,
  Stack,
  Text,

} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";

import {
  useDeletePostMutation,
  usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { useState } from "react";

import { UpdootSection } from "../components/UpdootSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>{error?.message}</div>;
  }

  return (
    <Layout>
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow='md' borderWidth='1px'>
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href='/post/[id]' as={`/post${p.id}`}>
                    <Link>
                      <Heading fontSize='xl'> {p.title} </Heading>
                    </Link>
                  </NextLink>
                  <Text>postedy by{p.creator.username}</Text>
                  <Flex align='center'>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>

                    <EditDeletePostButtons creatorId={p.creator.id} id={p.id} />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m='auto'
            my={4}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
