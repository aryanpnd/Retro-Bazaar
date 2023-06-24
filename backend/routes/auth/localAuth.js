const express = require('express');
const { addUser, login } = require("../../controller/auth/localAuth");


const AuthRoutes = express.Router()



AuthRoutes.post("/signup", addUser)
AuthRoutes.post("/login",login)

module.exports = { AuthRoutes }