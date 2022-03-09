import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail";
import { User } from "./entities/Users";

const main = async () => {
  try {
    // sendEmail("bob@bob.com", "hello")

    
    const orm = await MikroORM.init(microConfig);


    // await orm.em.nativeDelete(User , {})


    orm.getMigrator().up();
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = createClient();

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    app.use(
      session({
        name: COOKIE_NAME,
        store: new RedisStore({
          client: redisClient,
          disableTouch: true,
        }),

        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
          httpOnly: true,
          sameSite: "lax",
          secure: __prod__,
        },
        saveUninitialized: false,
        secret: "beep boop",
        resave: false,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false,
      }),
      context: ({ req, res }) => ({ em: orm.em, req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
      console.log("server started on port 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
