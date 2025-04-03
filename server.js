const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Optional: Support form submissions


const options = {
    definition:{
      openapi: '3.0.0',
      info:{
        title: 'Nodejs Api SQL',
        version :"1.0.0"
      },
      servers :[
            {
           url: 'http://localhost:4000/'
  
            }
      ] 
    },
    apis:['./server.js']
  }
  const swaggeSpec =  swaggerJSDoc(options);
  app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggeSpec));
const { DbOperations, LoginOp } = require('./DbFiles/DbOperation');
// const { password } = require('./DbFiles/DbConfig');



// Middleware

/**
@swagger
* paths:
*   /signup:
*     post:
*       summary: User Signup
*       description: Registers a new user by providing a username, password, and email.
*       tags:
*         - Authentication
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               required:
*                 - user
*                 - pass
*                 - email
*               properties:
*                 user:
*                   type: string
*                   description: "* The username of the user."
*                 pass:
*                   type: string
*                   description: "* The password for the user account."
*                 email:
*                   type: string
*                   format: email
*                   description: "* The email address of the user."
*       responses:
*         201:
*           description: "* Signup Successful"
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     example: true
*                   message:
*                     type: string
*                     example: "Signup Successful!"
*         400:
*           description: "* Bad Request - Missing required fields"
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     example: false
*                   message:
*                     type: string
*                     example: "All fields must be filled"
*         500:
*           description: "* Internal Server Error"
*           content:
*             application/json:
*               schema:
*                 type: object
*                 properties:
*                   success:
*                     type: boolean
*                     example: false
*                   message:
*                     type: string
*                     example: "Internal Server Error"
 */

// Signup Route
app.post("/signup", async (req, res) => {
    const { user, pass, email } = req.body;

    // Validate input
    if (!user || !pass || !email) {
        return res.status(400).json({ success: false, message: "All fields must be filled" });
    }

    try {
        const result = await DbOperations(user, email, pass); // Fixed argument order (email before pass)

        if (result.success) {
            return res.status(201).json({ success: true, message: "Signup Successful!" });
        } else {
            return res.status(500).json({ success: false,message:result.message});
        }
    } catch (error) {
        console.error(" Server error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post('/login',async(req,res)=>{
    const {email,pass} = req.body;
    
    if ( !email || !pass) {
        return res.status(400).json({ success: false, message: "All fields must be filled" });
    }

    try {
        const login = await LoginOp( email, pass); // Fixed argument order (email before pass)
       
        if (login.success) {
            return res.status(201).json({ success: true, message: login.message });
        } else {
            return res.status(500).json({ success: false,message:login.message});
        }
    } catch (error) {
        console.error(" Server error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
