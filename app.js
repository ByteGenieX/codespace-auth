require('dotenv').config()
require("./database/database.js").connect()
const User = require('./model/user')
const express = require('express')
const bcrypt = ('bcryptjs')
const res = require('express/lib/response.js')
const bcryptjs = require('bcryptjs')
// const user = require('./model/user')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) =>{
    res.send("<h1>Server is working</h1>")
})
app.post("/register",async (req, res) =>{
    try{
        const{firstname, lastname, email, password} = req.body
        if (!(firstname && lastname && email && password)){
            res.status(400).send('All feilds are necessary')
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            res.status(401).send('Duplicate email entry found')
        }
        
        const myEncPassword = await bcryptjs.hash(password, 10)

        const User = await User.create({
            firstname,
            lastname,
            email,
            password: myEncPassword
        })
        const token = jwt.sign(
            {id: User._id, email},
            'shhhh',
            {
                expiresIn: "2h"
            }
        );
        User.token = token
        User.password = undefined
        
        res.status(201).json(User)
        
    }
    catch(error){
        console.log(error);
    }
})

// app.post('/login', async(req, res)=> {
//     try {
//         //to get data from user
//         const {email, password} = req.body
//         // password validation
//         if(!(email && password)){
//             res.status(400).send('All data not entered')
//         }
//         // find user in DB
//         const user = await user.findOne({email})
//         // if user not here then proceed
        
//         //match the password
//         if (user && (await bcrypt.compare(password, user.password))){
//             const token = jwt.sign(
//                 {id: user._id},
//                 'shhhh',
//             {
//                 expiresIn: "2h"
//             }
//             );

//             user.token = token
//             user.password= undefined
//             // send parser in cookie
//             const options = {
//                 expires: new Date(Date.now()+3*24*60*60*1000),
//                 httpOnly: true                    
//             };
//             res.status(200).cookie("token", token, options).json({
//                 success: true,
//                 token,
//                 user
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = app
