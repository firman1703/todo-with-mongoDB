const mongoose = require("mongoose");
require('dotenv').config()

const db_url = process.env.URL

const db = mongoose.connect(db_url)

module.exports = db



