// const firebase = require("../db");

const User = require("../models/user");
// const fireStore = firebase.firestore();


const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");

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
   
    // const id = req.body.id
    // const data = req.body
    const data = {
      // id:req.body.id,
      
      profile:req.body.profile,
      battery:req.body.battery,
      device:req.body.device,
      temperature:req.body.temperature,
      createdAt:admin.firestore.Timestamp.now(),
      updatedAt:admin.firestore.Timestamp.now()


    }
    //  await db.collection("user").doc().set(data);
     await db.collection("user").add(data);
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// getting all users in descending order

const getAllUsers = async (req, res, next) => {
  try {
    console.log("Getting all users");
    // const id = doc.id
    const usersRef =  db.collection("user");
    // const response = await usersRef.get();
    const response = await usersRef.orderBy('createdAt', 'desc').get()

    const responseArr = [];
    response.forEach(doc => {
      const userarr = new User(

                    doc.id,
                    doc.data().profile,
                    doc.data().device,
                    doc.data().battery,
                    doc.data().temperature,
                    doc.data().createdAt,
                    doc.data().updatedAt
      )
      // responseArr.push(doc.data(),doc.id);
      responseArr.push(userarr);
    })

    res.send(responseArr)
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getAllUsers = async (req, res, next) => {
//   const patients = await db.collection('user')
//   const data = await patients.get();
//   const usersArr = []
//   if(data.empty){
//     res.status(404).send('no user found')

//   }else {
//     data.forEach(doc => {
//       const user = new User (
//         doc.id,
//         doc.profile,
//         doc.battery,
//         doc.profile,
//         doc.temperature,
//         doc.createdAt,
//         doc.updatedAt,

//       )
//       usersArr.push(patients)
//     })
//     res.send(usersArr)
//   }
// }

// const getAllUsers = async (req, res, next) => {
//   try {
//       const users = await db.collection('user');
//       const data = await users.get();
//       const usersArray = [];
//       if(data.empty) {
//           res.status(404).send('No student record found');
//       }else {
//           data.forEach(doc => {
//               const user = new User(
//                 doc.id,
//                 doc.profile,
//                 doc.battery,
//                 doc.profile,
//                 doc.temperature,
//                 doc.createdAt,
//                 doc.updatedAt,
//               );
//               usersArray.push(user);
//           });
//           res.send(usersArray);
//       }
//   } catch (error) {
//       res.status(400).send(error.message);
//   }
// }







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


// const getUser = async (req, res, next) => {
//   try {
//     const userRef = await db.collection("user").doc(req.params.id).get();
//     // const response = await userRef.get();
    
//     res.send(userRef.data())
//     console.log("Getting  user");
    
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// get data by id  and update data 

const getUser = async (req, res, next) => {
  try {
      const updateTime = admin.firestore.Timestamp.now()
      const id = req.params.id;
      const userRef = await db.collection('user').doc(id);
       await userRef.update({updatedAt:updateTime})
      const data = await userRef.get();
      if(!data.exists) {
          res.status(404).send('user with the given ID not found');
          return;
      }
      else {
        
          res.send(data.data());
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
}








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
