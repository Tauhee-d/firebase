// const firebase = require("../db");

const Patient = require("../models/addPatient");
// const fireStore = firebase.firestore();


const admin = require('firebase-admin')

const db= admin.firestore()

// performing crud operations in the firebase firestore
// add
// get all
// get
// update
// delete

const addPatient = async (req, res, next) => {
  try {
    console.log("Added New Patient");

   
    const id = req.body.id
    const data = {
      id:req.body.id,
      name:req.body.name,
      device:req.body.device,
      message:req.body.message,
      createdAt:admin.firestore.Timestamp.now(),
      updatedAt:admin.firestore.Timestamp.now()


    }
    //  await db.collection("user").doc().set(data);
     await db.collection("addPatient").add(data);
    res.status(201).json({ message: "Patient saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// getting all patients in descending order


const getAllPatient = async (req, res, next) => {
  try {
    console.log("Getting all patients...");
    const usersRef =  db.collection("addPatient");
    // const response = await usersRef.get()
    const response = await usersRef.orderBy('createdAt', 'desc').get()

    const responseArr = [];
    response.forEach(doc => {
      const patientarr = new Patient(
        doc.id,
        doc.data().id,
        doc.data().name,
        doc.data().device,
        doc.data().message,
        doc.data().createdAt,
        doc.data().updatedAt
      )

      responseArr.push(patientarr);

    })
   

    res.send(responseArr)
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get data by id  and update data 


const getPatient = async (req, res, next) => {
  try {
    const updateTime = admin.firestore.Timestamp.now()
    const id = req.params.id;

    const userRef = await db.collection("addPatient").doc(req.params.id);
    await userRef.update({updatedAt:updateTime})
    const data = await userRef.get();
    // const response = await userRef.get();
    
    res.send(data.data())
    console.log("Getting patient");
    
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
  addPatient,
  getAllPatient,
  getPatient,
  updateUser,
  deleteUser
};
