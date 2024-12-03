const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    id: ID!
    name: String
    email: String
  }
`;

// Define los resolvers (lógica de las consultas)
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: () => [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ],
  },
};

// Crear un servidor Apollo con Express
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

// Iniciar el servidor Apollo de manera asincrónica
async function startServer() {
    await server.start(); // Inicia el servidor Apollo
    server.applyMiddleware({ app }); // Aplica Apollo Server a Express
  
    // Iniciar el servidor Express
    app.listen({ port: 4000 }, () =>
      console.log(`Servidor ejecutándose en http://localhost:4000${server.graphqlPath}`)
    );
  }
  
  // Llamar la función para iniciar el servidor
  startServer();