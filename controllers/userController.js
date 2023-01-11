// const firebase = require("../db");

const User = require("../models/user");
// const fireStore = firebase.firestore();


const admin = require('firebase-admin')

const db= admin.firestore()

// performing crud operations in the firebase firestore
// add
// get all
// get
// update
// delete

const addUser = async (req, res, next) => {
  try {
    console.log("Adding new user");
   
    const id = req.body.id
    const data = {
      id:req.body.id,
      profile:req.body.profile,
      battery:req.body.battery,
      device:req.body.device,
      temperature:req.body.temperature,
    }
    //  await db.collection("user").doc().set(data);
     await db.collection("user").add(data);
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    console.log("Getting all users");
    const usersRef =  db.collection("user");
    const response = await usersRef.get();
    const responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    })
    res.send(responseArr)
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getUser = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     console.log("Getting user= %s", id);
//     const user = await db.collection("user").doc(id);
//     const data = await user.get();
//     if (!data.exists) {
//       res.status(404).json({ message: "Record not found" });
//     } else {
//       res.status(200).json(data.data());
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
const getUser = async (req, res, next) => {
  try {
    const userRef = await db.collection("user").doc(req.params.id).get();
    // const response = await userRef.get();
    
    res.send(userRef.data())
    console.log("Getting  user");
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Updating employee= %s", id);
    const data = req.body;
    const employee = await db.collection("user").doc(id);
    await employee.update(data);
    res.status(204).json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Deleting employee= %s", id);
    await db.collection("employees").doc(id).delete();
    res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// todo - add delete all employees

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
