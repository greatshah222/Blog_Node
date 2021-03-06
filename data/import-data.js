const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./../models/usermodel');
const Blog = require('./../models/blogModel');
const Comment = require('./../models/commentModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected for importing or deleting data 💣');
  });

const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const blog = JSON.parse(fs.readFileSync(`${__dirname}/blogs.json`, 'utf-8'));
const comment = JSON.parse(
  fs.readFileSync(`${__dirname}/comments.json`, 'utf-8')
);
const importData = async () => {
  try {
    await User.create(user, { validateBeforeSave: false });

    await Blog.create(blog);
    await Comment.create(comment);
    console.log('database imported succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    await Comment.deleteMany();

    console.log('database deleted succesfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
