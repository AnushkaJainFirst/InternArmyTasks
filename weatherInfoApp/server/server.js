const express = require('express');
const path = require('path');
const weatherRouter = require('./routes/weather');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Weather API route
app.use('/api', weatherRouter);

// Fallback to client index.html for other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
