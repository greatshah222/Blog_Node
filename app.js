const express = require('express');
const path = require('path');

const morgan = require('morgan');

const globalErrorhandler = require('./controllers/errorController');
const userRouter = require('./router/userRouter');
const CustomError = require('./utilis/customError');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use('/api/users', userRouter);
app.all('*', (req, res, next) => {
  next(new CustomError('no server found with this id', 404));
});

app.use(globalErrorhandler);

module.exports = app;
