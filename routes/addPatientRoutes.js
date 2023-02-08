const express = require("express");
const {
  addPatient,
  getAllPatient,
  getPatient,
  updateUser,
  deleteUser,
  
} = require("../controllers/addPatientController");

const router = express.Router();

// http://localhost:portnumber/api/user
router.post("/addPatient", addPatient);

// http://localhost:portnumber/api/users
router.get("/patients", getAllPatient);

// http://localhost:portnumber/api/id
router.get("/patient/:id", getPatient);

// http://localhost:portnumber/api/user/id
router.put("/user/:id", updateUser);

// http://localhost:portnumber/api/user/id
router.delete("/user/:id", deleteUser);

module.exports = {
  routes: router
};
