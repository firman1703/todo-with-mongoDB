const express = require('express')
const route = express.Router()
const todosRoutes = require("./todos")
const authRoutes = require("./auth")

route.get("/", (req, res) => {
    res.json("Ini Dari express mongoose firman")
})

route.use("/auth", authRoutes)
route.use("/todos", todosRoutes)

module.exports = route