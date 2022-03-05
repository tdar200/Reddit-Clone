import "reflect-metadata"
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer} from "apollo-server-express"
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import {PostResolver} from "./resolvers/post"

const main = async () => {
  try {
    const orm = await MikroORM.init(microConfig);
    orm.getMigrator().up();

    const app = express();

    //  const post = orm.em.create(Post, { title: "first post" });
    //  await orm.em.persistAndFlush(post);
    //  await orm.em.nativeInsert(Post, {title: "first post 2"})
    // const posts = await orm.em.find(Post, {});

  
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver],
        validate: false,
      }),
      context: () => ({em: orm.em})
    })

    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
      console.log("server started on port 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
