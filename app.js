const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb+srv://trial:trial@trial.kupis9i.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const Post = mongoose.model('Post', {
  title: String,
  content: String
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the main HTML page
app.get('/', (req, res) => {
  res.render('layout');
});

// API endpoint to get all posts
app.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

// API endpoint to get a single post by ID
app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// API endpoint to create a new post
app.post('/newpost', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.status(201).json({ message: 'Post created successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
