import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();

  const [, deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml='auto'>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          onClick={() => {}}
          icon='edit'
          aria-label='Edit Post'
        ></IconButton>
      </NextLink>
      <IconButton
        ml='auto'
        onClick={() => {
          deletePost({ id });
        }}
        variantColor='red'
        icon='delete'
        aria-label='Delete Post'
      ></IconButton>
    </Box>
  );
};
