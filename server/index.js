const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const multer = require('multer')
const bodyParser = require("body-parser");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const postSchema = new mongoose.Schema({
  content: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String }],
});

const Post = mongoose.model('Post', postSchema);

// Get all posts
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Get a single post by ID
app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  const newPost = new Post(req.body);
  const savedPost = await newPost.save();
  res.json(savedPost);
});

// Like a post
app.post('/api/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

// Comment on a post
app.post('/api/posts/:id/comment', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.json(post);
});



const postVideoFileSchema = new mongoose.Schema({
  videoUrl: String,
  description: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String }],
});

const PostVideoFile = mongoose.model('PostVideoFile', postVideoFileSchema);

// Get all posts
app.get('/api/postvideofile', async (req, res) => {
  try {
    const postVideoFile = await PostVideoFile.find();
    res.json(postVideoFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/postvideofile/:id', async (req, res) => {
  try {
    const postVideoFile = await PostVideoFile.findById(req.params.id);
    if (!postVideoFile) {
      return res.status(404).send('Post not found');
    }
    res.json(postVideoFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/postvideofile', upload.single('video'), async (req, res) => {
  try {
    const videoUrl = req.file.path;
    const newPostVideoFile = new PostVideoFile({ description: req.body.description, videoUrl });
    const savedPostVideoFile = await newPostVideoFile.save();
    res.status(201).json(savedPostVideoFile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/postvideofile/:id/like', async (req, res) => {
  try {
    const postVideoFile = await PostVideoFile.findById(req.params.id);
    if (!postVideoFile) {
      return res.status(404).send('Post not found');
    }
    postVideoFile.likes += 1;
    await postVideoFile.save();
    res.json(postVideoFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/postvideofile/:id/comment', async (req, res) => {
  try {
    const postVideoFile = await PostVideoFile.findById(req.params.id);
    if (!postVideoFile) {
      return res.status(404).send('Post not found');
    }
    postVideoFile.comments.push({ text: req.body.text });
    await postVideoFile.save();
    res.json(postVideoFile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



//handling image

const postFileSchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String }],
});

const PostFile = mongoose.model('PostFile', postFileSchema);

// Get all posts
app.get('/api/postfile', async (req, res) => {
  const postFile = await PostFile.find();
  res.json(postFile);
});

// Get a single post by ID
app.get('/api/postfile/:id', async (req, res) => {
  const postFile = await PostFile.findById(req.params.id);
  if (postFile) {
    res.json(postFile);
  } else {
    res.status(404).send('postFile not found');
  }
});

// Create a new post
app.post('/api/postfile',upload.single('image'), async (req, res) => {
  // console.log(req.body,1);
  // console.log(req.file);
  const imageUrl = req.file.path;
  console.log(imageUrl);
  const newPostFile = new PostFile({description:req.body.description,imageUrl:imageUrl});
  const savedPostFile = await newPostFile.save();
  res.json(savedPostFile);
});

// Like a post
app.post('/api/postfile/:id/like', async (req, res) => {
  const postFile = await PostFile.findById(req.params.id);
  postFile.likes += 1;
  await postFile.save();
  res.json(postFile);
});

// Comment on a post
app.post('/api/postfile/:id/comment', async (req, res) => {
  const postFile = await PostFile.findById(req.params.id);
  postFile.comments.push(req.body);
  await postFile.save();
  res.json(postFile);
});



const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});