// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const path = require('path');
// const app = express();

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/PlanEaseDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });
// const User = mongoose.model('User', userSchema);

// const Task = require('./backend/models/Task');
// const Note = require('./backend/models/Note');

// //Task Schema
// const taskSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     tag: { type: String, default: 'General' },
//     priority: { type: String, default: 'Low' },
//     details: { type: String },
//     completed: { type: Boolean, default: false },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });
// const Task = mongoose.model('Task', taskSchema);

// //Note Schema
// const noteSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     name: { type: String, required: true },
//     description: String,
//     alarmDate: String,
//     alarmTime: String,
//     createdAt: { type: Date, default: Date.now },
// });
// const Note = mongoose.model('Note', noteSchema);

// // Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname)));

// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'aboutpage.html'));
// });

// // Register API
// app.post('/api/users/register', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Login API
// app.post('/api/users/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: 'Invalid username or password' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

//     const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //Note API

// // Get notes
// router.get('/:userId', async (req, res) => {
//     try {
//         const notes = await Note.find({ userId: req.params.userId });
//         res.json(notes);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Add note
// router.post('/', async (req, res) => {
//     try {
//         const note = new Note(req.body);
//         await note.save();
//         res.status(201).json(note);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });
// app.use('/api/notes', require('./routes/noteRoutes'));

// // Task API

// // Example route for GET /api/tasks
// router.get('/', (req, res) => {
//     res.json({ message: 'Tasks API is working!' });
// });

// // Get tasks
// router.get('/:userId', async (req, res) => {
//     try {
//         const tasks = await Task.find({ userId: req.params.userId });
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Add task
// router.post('/', async (req, res) => {
//     try {
//         console.log('Creating task:', req.body);
//         const task = new Task(req.body);
//         await task.save();
//         console.log('Task created successfully:', task);

//         res.status(201).json(task);
//     } catch (err) {
//         console.error('Error creating task:', err);
//         res.status(400).json({ error: err.message });
//     }
// });
// app.use('/api/tasks', require('./routes/taskRoutes'));

// // Start Server
// app.listen(5000, () => console.log('Server running on http://localhost:5000'));



// Importing dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/PlanEaseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Importing Models
// const User = require('./backend/models/User');/

// // User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const Task = require('./backend/models/Task');
const Note = require('./backend/models/Note');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'aboutpage.html'));
});

// Register API
app.post('/api/users/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login API
// filepath: d:\Front-End Development Course Programs(Udemy)\FS Project 2025\app.js
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

    // Generate a token
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });

    // Return the token in the response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const user = await User.findOne({ username });
const isPasswordValid = await bcrypt.compare(password, user.password);


// Note API
app.post('/api/notes', async (req, res) => {
  const { userId, name, description, alarmDate, alarmTime } = req.body;
  try {
    if (!userId || !name) {
      return res.status(400).json({ error: 'User ID and Note Name are required' });
    }
    const note = new Note({ userId, name, description, alarmDate, alarmTime });
    await note.save();
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Task API
app.post('/api/tasks', async (req, res) => {
  const { userId, title, tag, priority, details } = req.body;
  try {
    if (!userId || !title) {
      return res.status(400).json({ error: 'User ID and Task Title are required' });
    }
    const task = new Task({ userId, title, tag, priority, details });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Start Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));