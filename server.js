const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const { PORT } = process.env;


connectDB();

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'welcome to express app!' }));

const port = process.env.PORT || PORT;

app.listen(port, () => console.log(`app running on port ${port}`));
