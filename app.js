const express = require('express');
const db = require('./config/db');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());

// Connect to MongoDB Atlas

db.then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));
// Routes
app.get("/", (req, res) => {
    res.json("Ini Dari express mongoose firman")
})

app.use(cors())
app.use('/auth', authRouter);
app.use('/todos', todosRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
