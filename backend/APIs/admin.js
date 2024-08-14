const exp = require('express');
const adminApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
let verifyToken = require('../Middlewares/verifyToken');
require('dotenv').config();
 
// Middleware for setting up database collections

//this is edit on 14th for test PR
adminApp.use((req, res, next) => {
    studentCollection = req.app.get('studentCollection');
    leaveCollection = req.app.get('leaveCollection');
    attendanceCollection = req.app.get('attendanceCollection');
    teacherCollection = req.app.get('teacherCollection');
    adminCollection = req.app.get('adminCollection');
    holidaysCollection = req.app.get('holidaysCollection');
    coursesCollection = req.app.get('coursesCollection');
    next();
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// admin registration endpoints
adminApp.post('/registration', async (req, res) => {
    let newUser = req.body;
    const status = await adminCollection.findOne({ userId: newUser.userId });
    if (status != null) {
        res.send({ message: "user exists" });
    } else {
        let newPassword = await bcryptjs.hash(newUser.password, 4);
        newUser.password = newPassword;
        await adminCollection.insertOne(newUser);
        res.send({ message: "user added" });
    }
});

// Login endpoint
adminApp.post('/login', async (req, res) => {
    let user = req.body;
    const status = await adminCollection.findOne({ userId: user.userId });
    if (status === null) {
        res.send({ message: "credentials don't exist" });
    } else {
        const pass = await bcryptjs.compare(user.password, status.password);
        if (!pass) {
            res.send({ message: "invalid password" });
        } else {
            const signedToken = jwt.sign({ userId: user.userId }, "rangammamangamma", { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: status });
        }
    }
});
 
// Teacher registration endpoint
adminApp.post('/teacher-registration',  async (req, res) => {
    let newUser = req.body;
    const dbUser = await teacherCollection.findOne({ userId: newUser.userId })
    if (dbUser != null) {
        res.send({ message: "user exists"});
    } else {
        newUser.password = await bcryptjs.hash(newUser.password, 4);
        let response = await teacherCollection.insertOne(newUser);

        if(response.acknowledged === true){
            res.send({message : "user added"})
        }
        
        const mailOptions = {
            from: 'studenthelpdesk16@gmail.com',
            to: newUser.email,
            subject: "Registration Successful",
            text: `Hello ${newUser.name}, you are successfully registered. \n\n Your user Id : ${newUser.userId}, \n Password : ${newUser.userId} \n\n You can reset the password on the website \n\n Thank You`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.send({ message: "user added, but email not sent", error: error });
            } else {
                console.log('Email sent: ' + info.response);
                res.send({ message: "user added and email sent", info: info });
            }
        });
    }
});

// Student registration endpoint
adminApp.post('/student-registration',async (req, res) => {
    let newUser = req.body;
    const dbUser = await studentCollection.findOne({ userId: newUser.userId })
    if (dbUser != null) {
        res.send({ message: "user exists" });
    } else {
        newUser.password = await bcryptjs.hash(newUser.password, 4);
        let response = await studentCollection.insertOne(newUser);

        if(response.acknowledged === true){
            res.send({message : "user added"})
        }

        const mailOptions = {
            from: 'studenthelpdesk16@gmail.com',
            to: newUser.email,
            subject: "Registration Successful",
            text: `Hello ${newUser.name}, you are successfully registered. \n\n Your user Id : ${newUser.userId}, \n Password : ${newUser.userId} \n\n You can reset the password on the website \n\n Thank You`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.send({ message: "user added, but email not sent", error: error });
            } else {
                console.log('Email sent: ' + info.response);
                res.send({ message: "user added and email sent", info: info });
            }
        });
    }
});

// Holidays endpoint
adminApp.post('/holidays',  async(req, res) => {
    const holiday = req.body;
    await holidaysCollection.insertOne(holiday);
    res.send({ message: "holiday added" }); 
});

// Courses endpoint
adminApp.post('/courses', async (req, res) => {
    const courses = req.body;
    await coursesCollection.insertOne(courses);
    res.send({ message: "courses added" });
});

// Reset password endpoint
adminApp.put('/reset-password', async (req, res) => {
    const userDetails = req.body;
    if(userDetails.userId !== '1234'){
    let user = await studentCollection.findOne({ userId: userDetails.userId });

    if (user === null) {
        res.send({ message: "credentials do not exist" });
    } else {
        let pass = await bcryptjs.compare(userDetails.oldPassword, user.password);
        if (!pass) {
            res.send({ message: "entered wrong password" });
        } else {
            user.password = await bcryptjs.hash(userDetails.newPassword, 4);
            await studentCollection.updateOne({ userId: userDetails.userId }, { $set: { password: user.password } });
            res.send({ message: "password changed" });
        }
    }
    }else{
        res.send({message : "cannot change password for 1234"})
    }
});



//get student details:
adminApp.get('/student-details', async(req,res)=>{
    const details = await studentCollection.find().toArray();
    if(!details){
        res.send({message : "error in fetching details"});
    }
    else{
        res.send({message : "deatils fetched", payload : details});
    }
})


//get teacher details
adminApp.get('/teacher-details', async(req,res)=>{
    const details = await teacherCollection.find().toArray();
    if(!details){
        res.send({message : "error in fetching details"});
    }
    else{
        res.send({message : "deatils fetched", payload : details});
    }
})


//delete student details:
adminApp.delete('/student-delete/:id',  async (req, res) => {
    const id = req.params.id;
    console.log(`Received request to delete student with id: ${id}`);
    
    try {
        const result = await studentCollection.deleteOne({ userId: id });
        const r2 = await attendanceCollection.deleteOne({ userId: id });
        console.log('Delete result:', result);

        if (result.deletedCount === 1) {  
            res.send({ message: 'Deleted Successfully' });
        } else {
            res.send({ message: 'Could not delete' });
        }
        if(r2.deletedCount === 1){
            console.log("deleted from attendnce sheet");
        }else{
            console.log("could not delete");
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send({ message: 'Server error' });
    }
});



//delete teacher details
adminApp.delete('/teacher-delete/:id',  async (req, res) => {
    const id = req.params.id;
    
    try {
        const result = await teacherCollection.deleteOne({ userId: id });
        console.log('Delete result:', result);

        if (result.deletedCount === 1) {  
            res.send({ message: 'Deleted Successfully' });
        } else {
            res.send({ message: 'Could not delete' });
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).send({ message: 'Server error' });
    }
});




module.exports = adminApp;
