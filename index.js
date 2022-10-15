require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// const schemas = require('./schemas/index');
// const resolvers = require('./resolvers/index');

const app = express();
const router = require('./router');
const ATLAS_USERNAME = process.env.ATLAS_USERNAME;
const ATLAS_PASSWORD = process.env.ATLAS_PASSWORD;
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json({ extend: false }));
app.use(router);

// const server = new ApolloServer({
//   typeDefs: schemas,
//   resolvers,
// });

// server.applyMiddleware({ app, path: '/graphql' });

mongoose.connect(
  `mongodb+srv://${ATLAS_USERNAME}:${ATLAS_PASSWORD}@juju.ej9ol.mongodb.net/prod`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(
        `Eek, something went wrong when connecting to the database: ${err}`
      );
    } else {
      console.log('Yippee! Connected to the database.');
    }
  }
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
