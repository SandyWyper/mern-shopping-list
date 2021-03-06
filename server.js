const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

// Routes
const lists = require('./routes/api/lists');
const register = require('./routes/api/register');
const auth = require('./routes/api/auth');

const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('error while connecting to mongoDB : ' + err));

// Use routes
app.use('/api/lists', lists);
app.use('/api/register', register);
app.use('/api/auth', auth);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
