const express = require('express');
const app = express();
const connectDB = require('./db');
require('dotenv').config();
const { PORT } = process.env;


// REQUIRE ROUTES
const userRoute = require('./routes/user');
const authRoutes = require('./routes/authRoutes');

app.use(express.json({ extended: false }));

// SETUP DB
connectDB();

app.use('/auth', authRoutes);
app.use(userRoute);



// app.get('/', (req, res) => res.json({ message: 'welcome to express app!' }));

const port = process.env.PORT || PORT;

app.listen(port, () => console.log(`app running on port ${port}`));
