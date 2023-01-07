const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/users');
const noteRouter = require('./routes/notes');
const { createUser, login } = require('./controllers/users');


const { PORT = 3001, DATABASE = 'mongodb://localhost:27017/rhymebook_db' } = process.env;

mongoose.connect(DATABASE);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', userRouter);

app.use('/notes', noteRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});