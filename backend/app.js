const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./index');

const connectionString =
  'mongodb+srv://mrigank94:GqtjZDKarka3wHps@todo.iwjw6.mongodb.net/mentos';

// Mongoose connection using the latest syntax. Note that `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `useCreateIndex` are no longer necessary as they are the default.
mongoose
  .connect(connectionString)
  .then(() => console.log('Connected to db successfully'))
  .catch((ex) => console.log(ex));

const app = express();

const corsOptions = {
  exposedHeaders: ['x-auth-token', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);

app.listen(3001, () => console.log('Listening on port 3001...'));

