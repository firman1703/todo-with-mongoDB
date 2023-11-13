const express = require('express');
const db = require('./config/db');
const rootRoutes = require('./routes')
const cors = require('cors');
const app = express();



const port = process.env.PORT || 3000;

app.use(express.json());

db.then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Routes
app.use(cors())
app.use(rootRoutes)

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
