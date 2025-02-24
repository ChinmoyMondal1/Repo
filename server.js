const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { DbOperations, LoginOp } = require('./DbFiles/DbOperation');
// const { password } = require('./DbFiles/DbConfig');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Optional: Support form submissions

// Signup Route
app.get("/signup", async (req, res) => {
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
