const exp = require('express');
const teacherApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const verifyToken = require('../Middlewares/verifyToken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
});

teacherApp.use((req,res,next)=>{
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


//teacher login
teacherApp.post('/login', async(req,res)=>{
    let userDet = req.body;
    let loginDet = await teacherCollection.findOne({userId: userDet.userId});
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


//get all students
teacherApp.get('/allstudents',  async(req,res)=>{
  let students = await studentCollection.find().toArray();
  res.send({message : "students fetched", payload : students}); 
})

//taking attendance 
teacherApp.post('/markAttendance' , async (req, res) => {
    let attendanceRecords = req.body; 
    for (let record of attendanceRecords) {
      let studentAttendance = await attendanceCollection.findOne({ userId: record.userId });
      let studentDetails = await studentCollection.findOne({ userId: record.userId })
      record.email = studentDetails.email;
      if (studentAttendance) {
        studentAttendance.totalClasses += 1;
        if (record.present === true) { 
          studentAttendance.classesPresent += 1;
        }
        studentAttendance.percentage = (studentAttendance.classesPresent / studentAttendance.totalClasses) * 100;
        await attendanceCollection.updateOne({ userId: record.userId }, { $set: studentAttendance });
      } else {
        record.totalClasses = 1;
        record.classesPresent = (record.present == true) ? 1 : 0;
        record.percentage = (record.classesPresent / record.totalClasses) * 100;
        await attendanceCollection.insertOne(record);
      }
    }
    res.send({ message: "attendance marked" }); 
  });


//get students who are below 75
teacherApp.get('/75below', async(req,res)=>{
    let studentList = await attendanceCollection.find({percentage : {$lt : 75}}).toArray();
    res.send({message : 'Students below 75% attendance',payload : studentList});
})


//approve leave sent by students
teacherApp.put('/approveLeave', async (req, res) => {
  try {
    let leave = req.body;
    let check = await leaveCollection.findOne({ userId: leave.userId }); 
    if (check !== null) {
      check.approval = leave.approval;
      await leaveCollection.updateOne({ userId: leave.userId }, { $set: check });
      res.send({ message: "leave updated" });
    } else {
      res.send({ message: "leave not found" });
    }

   //send status to students
   if(leave.approval === "approved"){
    const mailOptions = {
      from: 'studenthelpdesk16@gmail.com',
      to: check.email,
      subject: "Leave Approved",
      text: `Roll Number : ${leave.userId},\n Your leave has beed approved,\nThank You`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) { 
        console.error('Error sending email:', error);
        res.send({ message: "email not sent", error: error });
    } else {
        console.log('Email sent: ' + info.response);
        res.send({ message: "email sent", info: info });
    }
  });}

   else if(leave.approval === "rejected"){
    const mailOptions = {
      from: 'studenthelpdesk16@gmail.com',
      to: check.email,
      subject: "Leave Rejected",
      text: `Roll Number : ${leave.userId},\n Your leave has beed rejected,\nThank You`
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

  //delete leave from leave collection
  let id = leave.userId;
  await leaveCollection.deleteMany({userId : id});

  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).send({ message: "Error approving leave" });
  }
});



teacherApp.get('/all-leaves',async(req,res)=>{ 
  try{
    let leaves = await leaveCollection.find().toArray();
    if(leaves !== null){
      res.send({message : "leaves fetched", payload : leaves});
    }
    else{
      res.send({message :"could not fetch"});
    }
  }
  catch(err){
    res.send({message : "error while fetching"}); 
  }
}) 


//add announcements 
teacherApp.post('/announcements' , async(req,res)=>{
    const announcements = req.body;
    await announcementCollection.insertOne(announcements);
    res.send({message : "announcement added"})
})


//see holidays 
teacherApp.get('/holidays', async(req,res)=>{
  let holidays = await holidaysCollection.find().toArray();
  res.send({"message" : "holidays list", payload : holidays});
})


//sending mail to students who are below 75
teacherApp.post('/send-mail', async(req,res)=>{

  let student = req.body;
  console.log(student);

  const mailOptions = {
    from: 'studenthelpdesk16@gmail.com',
    to: student.email,
    subject: "Attendance Warning",
    text: `Roll Number : ${student.userId},\nYour attendance percentage : ${student.percentage.toFixed(2)},\nAttend classes regularly, if you have any reason for your absence send a leave letter,\nThank You`
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

})

teacherApp.post('/mail-to-all', async(req,res)=>{
  let students = req.body;

  console.log(students)

  for(let student of students){
    let email = student.email;
    const mailOptions = {
      from: 'studenthelpdesk16@gmail.com',
      to: email,
      subject: "Attendance Warning", 
      text: `Roll Number : ${student.userId},\nYour attendance percentage : ${student.percentage.toFixed(2)},\nAttend classes regularly, if you have any reason for your absence send a leave letter,\nThank You`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) { 
        console.error('Error sending email:', error);
        res.send({ message: "email not sent", error: error });
    } else {
        console.log('Email sent:' + info.response);
        res.send({ message: "email sent", info: info });
    }
  });

  }
})
 
module.exports = teacherApp