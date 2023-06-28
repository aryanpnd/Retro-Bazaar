const express = require('express');
const { getUserInfo,signOutUser } = require("../../../controller/users")

const UserRoutes = express.Router()


UserRoutes.get("/getUserInfo", getUserInfo)
    // .get("/users/:id", getUsersById)
    // .put("/users/:id", updateUser)
    // .patch("/users/:id", patchUser)
    .get("/signOutUser", signOutUser)


module.exports = { UserRoutes,signOutUser }