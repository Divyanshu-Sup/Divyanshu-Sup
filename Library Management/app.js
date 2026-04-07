const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/pustakshala')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use('/api', require('./routes/apiRoutes'));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

const session = require('express-session');

app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', require('./routes/authRoutes'));
