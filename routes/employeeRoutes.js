const express = require("express");
const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  
} = require("../controllers/userController");

const router = express.Router();

// http://localhost:portnumber/api/user
router.post("/user", addUser);

// http://localhost:portnumber/api/users
router.get("/users", getAllUsers);

// http://localhost:portnumber/api/id
router.get("/user/:id", getUser);

// http://localhost:portnumber/api/user/id
router.put("/user/:id", updateUser);

// http://localhost:portnumber/api/user/id
router.delete("/user/:id", deleteUser);

module.exports = {
  routes: router
};
