const exp = require('express');
const studentApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
let verifyToken = require('../Middlewares/verifyToken'); 
const nodemailer = require('nodemailer');
require('dotenv').config();

studentApp.use((req,res,next)=>{
    studentCollection = req.app.get('studentCollection');
    leaveCollection = req.app.get('leaveCollection');
    attendanceCollection = req.app.get('attendanceCollection');
    teacherCollection = req.app.get('teacherCollection');
    adminCollection = req.app.get('adminCollection');
    holidaysCollection = req.app.get('holidaysCollection');
    coursesCollection = req.app.get('coursesCollection');
    announcementCollection = req.app.get('announcementCollection');

    next();
})


// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });


//student login
studentApp.post('/login',async(req,res)=>{
    let userDet = req.body;
    let loginDet = await studentCollection.findOne({userId: userDet.userId});
    if(loginDet === null){
        res.send({message : "user does not exists"});
    }
    else{
        const pass = await bcryptjs.compare(userDet.password,loginDet.password);
        if(pass === false){ 
            res.send({message: "invalid password"});
        }
        else{
            const signedToken  = jwt.sign({userId : loginDet.userId},'rangammamangamma', {expiresIn : '1d'})
            res.send({message: "login success", token: signedToken, user: loginDet});
        }
    }
})


//get attendance of particular student
studentApp.get('/attendance/:userId', async(req, res) => {
    let id = req.params.userId;
    let det = await attendanceCollection.findOne({ userId: id });
    if (det) {
        console.log(det);
        console.log(det.percentage);
        res.send({ percentage: det.percentage, classesCompleted : det.totalClasses });
    } else {
        res.send({ message: "No attendance record found" });
    }
});



//post leave to student
studentApp.post('/leave',  async (req, res) => {
    try {
      let leave = req.body; 
      let studentDetails = await studentCollection.findOne({userId : leave.userId});
      if(studentDetails !== null){
      leave.email = studentDetails.email;
      await leaveCollection.insertOne(leave);
      console.log('Received leave request:', leave);
      
      res.send({ message: "leave posted" });
      

    //send mail to student after posting mail:
    const mailOptions = {
        from: 'studenthelpdesk16@gmail.com',
        to: studentDetails.email,
        subject: "Leave Sent",
        text: `Roll Number : ${studentDetails.userId},\nYour leave is sent to teacher\nThank You`
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { 
            console.error('Error sending email:', error);
            res.send({ message: "email not sent", error: error });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ message: "email sent", info: info });
        }
    });
    }
    else{
        res.send({message : "student Id not found"})
    }}
     
    catch (error) {
      console.error("Error posting leave request:", error);
      res.status(500).send({ message: "Error posting leave" });
    }
});
  


//check attendance req to make 75
studentApp.get('/attendanceReq/:userId', async(req,res)=>{
    let id = (req.params.userId);
    let std = await attendanceCollection.findOne({userId:id});
    if(std === null){
        res.send({message:"no student found"});
    }else{
        if(std.percentage >= 75){
            res.send({message: "you are already 75 or above"});
        }
        else{
            let ToctalClasses = std.totalClasses;
            let ClassesPresent = std.classesPresent
            let classesRequired = 3*ToctalClasses - 4*ClassesPresent;
            res.send({message: classesRequired});
        }
    }
})


//see announcements made by teacher
studentApp.get('/announcements', async(req,res)=>{
    let announcement = await announcementCollection.find().toArray();
    res.send({"message" : "announcement list", payload : announcement});
})



//see holidays
studentApp.get('/holidays', async(req,res)=>{
    let holidays = await holidaysCollection.find().toArray();
    res.send({message : "Holiday list", payload : holidays});
})


//see courses available
studentApp.get('/courses', async(req,res)=>{
    let courses = await coursesCollection.find().toArray();
    res.send({"message" : "Courses list", payload : courses});
})

module.exports = studentApp 