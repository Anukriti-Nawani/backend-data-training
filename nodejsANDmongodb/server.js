require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/dbConnection'); // Import MongoDB connection

const postsRoute = require("./routes/postRoute");
const authRoute = require('./routes/authRoute');

app.use(express.json());

app.use('/posts', postsRoute);
app.use('/auth', authRoute);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
