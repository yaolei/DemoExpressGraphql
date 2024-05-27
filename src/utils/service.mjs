import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
// import {startStandaloneServer} from '@apollo/server/standalone'
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import app from '../../app.js'
import {typeDefs, resolvers} from './schema.js'
import GetUserApi from './getUserApi.js'

const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                randomUserApi: new GetUserApi({ cache }),
            },
        }
    }
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);


// no express moddleware
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

// const { url } = await startStandaloneServer(server, {
//     context: async () => {
//         const { cache } = server;
//         return {
//             dataSources: {
//                 randomUserApi: new RestAPI({ cache }),
//             },
//         };
//     },
// });
// console.log(`🚀  Server ready at ${url}`);