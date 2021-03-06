const express = require('express');
const path = require('path');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const globalErrorhandler = require('./controllers/errorController');
const userRouter = require('./router/userRouter');
const viewRouter = require('./router/viewRouter');
const blogRouter = require('./router/blogRouter');
const commentRouter = require('./router/commentRouter');
const CustomError = require('./utilis/customError');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use('/', viewRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new CustomError('no server found with this id', 404));
});

app.use(globalErrorhandler);

module.exports = app;
