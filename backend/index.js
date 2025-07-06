// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const User = require('./models/user');
const Ride = require('./models/ride');
const RideRequest = require('./models/rideRequest');
const Notification = require('./models/notification');
const Graph = require('./models/graph');

// add others as needed



const app = express();
app.use(express.json());

// Connect to Mongo
connectDB();

  // app.get('/test-user', async (req, res) => {
  //   try {
  //     let user = await User.findOne({ email: "shoaib@jssstu.edu.in" });
  //     if (!user) {
  //       user = await User.create({
  //         name: "Shoaib",
  //         email: "shoaib@jssstu.edu.in",
  //         passwordHash: "hashed"
  //       });
  //     }
  //     res.json(user);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });



// Test route
app.get('/', (req, res) => {
  res.send('GroupGo API is working 🎉');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
