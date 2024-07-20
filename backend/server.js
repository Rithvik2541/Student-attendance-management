// const exp = require('express');
// const app = exp();

// const mc = require('mongodb').MongoClient;

// const path = require('path');
// const cors = require('cors')
// const cron = require('node-cron');

// // deploying react build in this server
// app.use(exp.static(path.join(__dirname,'../frontend/build')))

// app.use(cors())
// mc.connect('mongodb://127.0.0.1:27017').then(client=>{

//     const dbObj = client.db('eduprime');

//     const studentCollection = dbObj.collection('studentCollection');
//     const leaveCollection = dbObj.collection('leaveCollection');
//     const attendanceCollection = dbObj.collection('attendanceCollection');
//     const teacherCollection = dbObj.collection('teacherCollection');
//     const adminCollection = dbObj.collection('adminCollection');
//     const holidaysCollection = dbObj.collection('holidaysCollection');
//     const announcementCollection = dbObj.collection('announcementCollection');
//     const coursesCollection = dbObj.collection('coursesCollection');


//     app.set('studentCollection', studentCollection);
//     app.set('leaveCollection', leaveCollection);
//     app.set('attendanceCollection', attendanceCollection);
//     app.set('teacherCollection',teacherCollection);
//     app.set('adminCollection', adminCollection);
//     app.set('announcementCollection', announcementCollection);
//     app.set('holidaysCollection', holidaysCollection);
//     app.set('coursesCollection', coursesCollection);


//     console.log("connected to mongoDB");

//     cron.schedule('0 0 * * *', () => {
//         cleanUpExpiredDocuments(dbObj);
//     });

// })
// .catch(err=>{
//     console.log(err)
// })


// const studentApp = require('./APIs/student');
// const teacherApp = require('./APIs/teacher');
// const adminApp = require('./APIs/admin')

// app.use(exp.json());

// app.use('/student-app',studentApp);
// app.use('/teacher-app',teacherApp);
// app.use('/admin-app',adminApp); 

// //routing middleware from react || deals with page refresh 
// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
// })


// //error handling middleware
// app.use((err,req,res,next)=>{
//     res.send({message : "error", payload : err})
// })

// app.listen(4000,()=>console.log("running on port 4000"))


// // Cleanup function
// const cleanUpExpiredDocuments = async (db) => {
//     const today = new Date().toISOString().split('T')[0];
//     const collections = ['holidaysCollection', 'announcementCollection', 'coursesCollection'];
    
//     for (const collectionName of collections) {
//         const collection = db.collection(collectionName);
//         try {
//             const result = await collection.deleteMany({ date: { $lt: today } });
//             console.log(`Cleaned up ${result.deletedCount} documents from ${collectionName}`);
//         } catch (err) {
//             console.error(`Error cleaning up ${collectionName}:`, err);
//         }
//     }
// };


const exp = require('express');
const app = exp();
const mc = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

// deploying react build in this server
app.use(exp.static(path.join(__dirname, '../frontend/build')));

app.use(cors());

const uri = 'mongodb+srv://vercel-admin-user:rz7WJZpDLLkuODhJ@edu-manager.ts3txyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mc.connect(uri)
  .then(client => {
    const dbObj = client.db('eduprime'); 

    const studentCollection = dbObj.collection('studentCollection');
    const leaveCollection = dbObj.collection('leaveCollection');
    const attendanceCollection = dbObj.collection('attendanceCollection');
    const teacherCollection = dbObj.collection('teacherCollection');
    const adminCollection = dbObj.collection('adminCollection');
    const holidaysCollection = dbObj.collection('holidaysCollection');
    const announcementCollection = dbObj.collection('announcementCollection');
    const coursesCollection = dbObj.collection('coursesCollection');

    app.set('studentCollection', studentCollection);
    app.set('leaveCollection', leaveCollection);
    app.set('attendanceCollection', attendanceCollection);
    app.set('teacherCollection', teacherCollection);
    app.set('adminCollection', adminCollection);
    app.set('announcementCollection', announcementCollection);
    app.set('holidaysCollection', holidaysCollection);
    app.set('coursesCollection', coursesCollection);

    console.log("Connected to MongoDB Atlas");

    cron.schedule('0 0 * * *', () => {
      cleanUpExpiredDocuments(dbObj);
    });
  })
  .catch(err => {
    console.log(err);
  });

const studentApp = require('./APIs/student');
const teacherApp = require('./APIs/teacher');
const adminApp = require('./APIs/admin');

app.use(exp.json());

app.use('/student-app', studentApp);
app.use('/teacher-app', teacherApp);
app.use('/admin-app', adminApp);

// routing middleware from react || deals with page refresh 
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  res.send({ message: "error", payload: err });
});

app.listen(4000, () => console.log("Running on port 4000"));

// Cleanup function
const cleanUpExpiredDocuments = async (db) => {
  const today = new Date().toISOString().split('T')[0];
  const collections = ['holidaysCollection', 'announcementCollection', 'coursesCollection'];
  
  for (const collectionName of collections) {
    const collection = db.collection(collectionName);
    try {
      const result = await collection.deleteMany({ date: { $lt: today } });
      console.log(`Cleaned up ${result.deletedCount} documents from ${collectionName}`);
    } catch (err) {
      console.error(`Error cleaning up ${collectionName}:`, err);
    }
  }
};
