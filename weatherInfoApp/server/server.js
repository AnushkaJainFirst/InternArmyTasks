const express = require('express');
const path = require('path');
const weatherRouter = require('./routes/weather');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', weatherRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
