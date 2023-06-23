const express = require('express');
const { addUser, deleteUser, updateUser, patchUser, getUsers, getUsersById } = require("../controller/users")

const UserRoutes = express.Router()


// UserRoutes.post("/register", addUser)
    // .get("/users", getUsers)
    // .get("/users/:id", getUsersById)
    // .put("/users/:id", updateUser)
    // .patch("/users/:id", patchUser)
    // .delete("/users/:id", deleteUser)
    
    // .use((req, res) => { res.status(404).sendFile("D:/myfiles/CS stuffs/Programming/nodejs/playground/restAPI/404.html") })

module.exports = { UserRoutes }