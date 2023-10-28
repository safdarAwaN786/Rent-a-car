const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
require('./src/db/connectdb');

// Import routes
const userRoutes = require('./src/routes/userRoutes'); // Adjust the path based on your file structure
const adminRoutes = require('./src/routes/adminRoutes'); // Adjust the path based on your file structure
const vehicleRoutes = require('./src/routes/vehicleRoutes'); // Adjust the path based on your file structure
const extrasRoutes = require('./src/routes/extrasRoutes'); // Adjust the path based on your file structure

const PORT = process.env.PORT || 5000;
app.use(cors());

// Automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set CORS headers manually
// Add middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Use the user routes
app.use('/user', userRoutes); // Assuming user routes are prefixed with '/user'

app.use('/admin', adminRoutes); // Assuming user routes are prefixed with '/user'
app.use('/vehicle', vehicleRoutes); // Assuming user routes are prefixed with '/user'
app.use('/extras', extrasRoutes);



app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
    res.setHeader("Content-Type", "text/html");
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }, 
    );
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
