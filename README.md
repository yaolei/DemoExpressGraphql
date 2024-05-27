# React Search Bar modal window Component

This Demo is create by use NodeJs + Express + Graphql.
Use quickly to understand How to use GraphQL with NodeJs for backend server


## Install 
Aofter clone this project and run: 
```js
  npm i 
  npm run test
``` 
The default server is `http://localhost:4000`

## How to use and configure 

- Code Examples:
    services.mjs is the grahql main point.
```js
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
```
- Actuallly. In this demo also provide the front-end test interface demo.
    use the express's router and in the middleware to do the request actions.
```js
const handlePostUserData = async (serverUrl) => {
  const parames = {
      "query": "query RandomeDatas { randomeDatas { id, username ,dateCreate}}"
  }
  const url = `${serverUrl}/graphql/`
  const header = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const res = await axios.post(url, parames, header);
  return res.data
}


const handleGetUserData = async (serverUrl) => {
  const query = "query RandomeDatas { randomeDatas {id, username}}"
  const header = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  const baseURL = `${serverUrl}/graphql`
  const fullUrl = `${baseURL}?query=${encodeURIComponent(query)}`
  const res = await axios.get(fullUrl, header)
  return res.data;
}

router.get('/a',getBacicServerAddress ,async (req, res, next) => {
  const result = await handlePostUserData(req?.body?.basicUrl);
  res.render('table', {userInfo:result.data.randomeDatas})
});
```
-more information and issues pls send a pr




