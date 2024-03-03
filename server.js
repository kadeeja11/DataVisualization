const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3001; // Or any port you prefer

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/DataVisualization", {});

// Define mongoose schema and model
const UserSchema = new mongoose.Schema({ /* Your schema definition here */ });
const UserModel = mongoose.model("industries", UserSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch data
app.get("/getData", (req, res) => {
    UserModel.find({}).then(function(industries) {
        res.json(industries);
    }).catch(function(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
