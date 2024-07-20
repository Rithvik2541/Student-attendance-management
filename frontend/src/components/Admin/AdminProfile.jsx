import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { FaUserTie } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { CounterContext } from '../ContextAPI/CounterContext';
// import './StudentProfile.css'; // Ensure you have the CSS file for styling

function AdminProfile() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const [id] = useContext(CounterContext);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const isCourseDetailsVisible = !(
    location.pathname.includes('add-teacher') || 
    location.pathname.includes('add-student') || 
    location.pathname.includes('student-details') || 
    location.pathname.includes('holidays') ||
    location.pathname.includes('faculty-details')
  );

  return (
    <div className="student-profile d-flex">
      <div className={`sidebar ${showMore ? 'expanded' : ''}`} style={{ backgroundImage: "linear-gradient(to top left, rgb(240, 109, 128), rgb(244, 151, 142))", height: "120vh", borderRadius: "0%" }}>
        <div className="d-flex align-items-center fs-4">
          <ExpandMoreIcon className='fs-2 ms-3 me-2 mt-4' onClick={toggleMore} />
          {showMore && <span className='mt-3'>More</span>}
        </div>
        <ul className='nav flex-column'>
          <li className="nav-item">
            <NavLink to="add-teacher" className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}>
              <PersonAddAltIcon className='me-3 fs-2' />
              {showMore && <span>Add Teacher</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="add-student" className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}>
              <PersonAddIcon className='me-3 fs-2' />
              {showMore && <span>Add student</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="holidays" className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}>
              <EventNoteIcon className='fs-2 me-3' />
              {showMore && <span className='text-dark'>Holidays</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="student-details" className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}>
              <PiStudentBold className='fs-2 me-3' />
              {showMore && <span>Student-details</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="faculty-details" className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}>
              <FaUserTie className='fs-2 me-3' />
              {showMore && <span>Faculty-details</span>}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile-content w-100">
        <h2 className='ms-5 mt-4 text-center'>Welcome {id}-Admin</h2>

        {isCourseDetailsVisible && (
          <div className="container mt-5">
            <div className="card w-50">
              <div className="card-title text-center display-5" style={{ backgroundColor: "rgb(202, 103, 2)" }}>
                <h2>Course Details</h2>
              </div>
              <div className='card-body' style={{ backgroundColor: "aliceblue" }}>
                <h4>Operating System-2209811PC</h4>
                <h4>Software Engineering-2209831PE</h4>
                <h4>Computer Organization-2208411PC</h4>
                <h4>Data Analytics-2209811CS</h4>
              </div>
            </div>
          </div>
        )}

        <div className="content mt-4">
          <Outlet /> {/* This will render the child routes */}
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
