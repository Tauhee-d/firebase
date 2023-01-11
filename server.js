const express = require('express')
const app = express()

const admin = require('firebase-admin')
const credentials = require('./key.json')

admin.initializeApp({
    credential:admin.credential.cert(credentials)
})

const db= admin.firestore()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api", employeeRoutes.routes);


// app.post('/create',async(req,res)=> {
//     try {
//         console.log(req.body)
//         const id = req.body.name
//         const Data = {
//             name:req.body.name,
//             device:req.body.device
//         }
//         const response = await db.
//     } catch (error) {
        
//     }
// })



const port = process.env.PORT || 8008

app.listen(port,()=> {
    console.log(`server lisining on ${port}`)
})