import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CampaignIcon from '@mui/icons-material/Campaign';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SpeedIcon from '@mui/icons-material/Speed';
import axios from 'axios';
import './StudentProfile.css';
import { CounterContext } from '../ContextAPI/CounterContext';

function StudentProfile() {
  const [showMore, setShowMore] = useState(false);
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const [id, setId] = useContext(CounterContext);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    axios.get('/api/courses')
      .then(response => {
        console.log('API Response:', response.data);
        setCourses(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching course data:', error);
      });
  }, []);

  const isCourseDetailsVisible = !(
    location.pathname.includes('request-leave') || 
    location.pathname.includes('attendance') || 
    location.pathname.includes('announcements') || 
    location.pathname.includes('holidays')
  );

  return (
    <div className="student-profile d-flex">
      <div className={`sidebar ${showMore ? 'expanded' : ''}`} style={{ backgroundImage: "linear-gradient(to top left, rgb(221, 161, 94), rgb(202, 103, 2))", height: "120vh", borderRadius: "0%" }}>
        <div className="d-flex align-items-center fs-4">
          <ExpandMoreIcon className='fs-2 ms-3 me-2 mt-4' onClick={toggleMore} />
          {showMore && <span className='mt-3'>More</span>}
        </div>
        <ul className='nav flex-column'>
          <li className="nav-item">
            <NavLink 
              to="attendance" 
              className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}
            >
              <SpeedIcon className='me-3 fs-2' />
              {showMore && <span>Attendance</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="announcements" 
              className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}
            >
              <CampaignIcon className='me-3 fs-2' />
              {showMore && <span>Announcements</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="holidays" 
              className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}
            >
              <EventNoteIcon className='fs-2 me-3' />
              {showMore && <span>Holidays</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="request-leave" 
              className={({ isActive }) => `nav-link d-flex align-items-center fs-4 text-dark ${isActive ? 'active' : ''}`}
            >
              <HistoryEduIcon className='fs-2 me-3' />
              {showMore && <span>Request Leave</span>}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile-content w-100">
        <h2 className='ms-5 mt-4 text-center'>Welcome {id}-Student</h2>
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
