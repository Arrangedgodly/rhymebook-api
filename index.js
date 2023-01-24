require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/users');
const noteRouter = require('./routes/notes');
const { createUser, login } = require('./controllers/users');
const { celebrate, Joi, Segments, errors } = require('celebrate');

const allowedOrigins = [
  'https://rhymebook.graydonwasil.com',
  'http://rhymebook.graydonwasil.com',
  'http://localhost:3000'
];

const { PORT , DATABASE } = process.env;

mongoose.connect(DATABASE);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), login);
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), createUser);

app.use('/users', userRouter);

app.use('/notes', noteRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.error(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});