import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Login from './components/Login/SignIn';
import Attendance from './components/Student/Attendance';
import Leave from './components/Student/Leave'
import StudentProfile from './components/Student/StudentProfile';
import TeacherProfile from './components/Teacher/TeacherProfile';
import Adminstrator from './components/Admin/AdminProfile';
import Announcements from './components/Student/Announcements';
import Holidays from './components/Student/Holidays'
import MarkAttendance from '../src/components/Teacher/MarkAttendance'
import MakeAnnouncements from './components/Teacher/AddAnnouncements'
import ApprovrLeave from './components/Teacher/ApproveLeave';
import Below75 from './components/Teacher/AttendanceBelow75';
import AllLeave from './components/Teacher/AllLeaves';
import RouterError from './components/RouterError'
import StudentRegistration from './components/Admin/StudentRegistration';
import StudentDetails from './components/Admin/StudentDetails';
import TeacherDetails from './components/Admin/TeacherDetails';
import AddHolidays from './components/Admin/AddHolidays';
import TeacherRegistration from './components/Admin/TeacherRegistration'
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import {Toaster} from 'sonner';
import TeacherDetailPage from './components/Admin/TeacherPage';
import StudentDetailPage from './components/Admin/StudentPage';




function App() {
  let router=createBrowserRouter([
    {
    path:"/",
    element: <Login/>,
    errorElement : <RouterError/>
    },
    {
      path : 'forgot-password',
      element : <ForgotPassword/>
    },
    {
      path : 'reset-password',
      element : <ResetPassword/>
    },
    {
      path:"student-profile",
      element:<StudentProfile/>,
      children:[
        {
          path:"attendance",
          element:<Attendance/>
        },
        {
          path:"request-leave",
          element:<Leave/>
        },
        {
          path:"holidays",
          element:<Holidays/>
        },
        {
          path:"announcements",
          element:<Announcements/>
        }
      ]
    },
    {
      path:"teacher-profile",
      element:<TeacherProfile/>,
      children : [
        {
          path : 'attendance-marking',
          element : <MarkAttendance/>,
        },
        {
          path : 'make-announcements',
          element : <MakeAnnouncements/>
        },
        {
          path : 'all-leaves',
          element : <AllLeave/>
        },
        {
          path : 'below-75',
          element : <Below75/>
        },
        {
          path : 'holidays',
          element : <Holidays/>
        }
      ]
    }
    ,{
      path:"admin-profile",
      element:<Adminstrator/>,
      children:[
        {
          path : 'holidays',
          element : <AddHolidays/>
        },
        {
          path:"add-student",
          element:<StudentRegistration/>
        }
        ,{
          path:"add-teacher",
          element:<TeacherRegistration/>
        },
        {
          path:"student-details",
          element:<StudentDetails/>
        },
        {
          path:"faculty-details",
          element:<TeacherDetails/>
        },
        {
          path : "teacher-page",
          element : <TeacherDetailPage/>
        },
        {
          path : 'student-page',
          element : <StudentDetailPage/>
        }

    ]
    }
  ])
  return (
    <div>
      <Toaster richColors />
      <RouterProvider router={router} />
    </div>
   
  );
}

export default App;
