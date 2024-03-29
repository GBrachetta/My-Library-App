/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const composerRouter = require('./routes/composerRoutes');
const bookRouter = require('./routes/bookRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
const { PORT } = process.env;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRouter);
app.use('/api/composers', composerRouter);
app.use('/api/books', bookRouter);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Guillermo's Library API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
