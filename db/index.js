const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_URI } = process.env;


const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  
      console.log("MongoDB connected...");
  
      // Seed data
    } catch (err) {
      console.error(err.message);
  
      // Exit with failure;
      process.exit(1);
    }
  }
  
  module.exports = connectDB;