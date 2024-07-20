//Teacher-Profile
import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReportIcon from '@mui/icons-material/Report';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import './TeacherProfile.css';
import { CounterContext } from '../ContextAPI/CounterContext';

function TeacherProfile() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  let [id, setId] = useContext(CounterContext);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  const isCourseDetailsVisible = !(
    location.pathname.includes('all-leaves') || 
    location.pathname.includes('attendance-marking') || 
    location.pathname.includes('make-announcements') || 
    location.pathname.includes('holidays')||
    location.pathname.includes('below-75')
  );

  return (
    <div className="teacher-profile d-flex">
      <div 
        className={`sidebar ${showMore ? 'expanded' : ''}`} 
        style={{ 
          backgroundImage: "linear-gradient(to bottom left, rgb(202, 240, 248), rgb(72, 202, 228))", 
          height: "100vh", 
          borderRadius: "0%" 
        }}
      >
        <div className="d-flex align-items-center toggle-button">
          <ExpandMoreIcon className='fs-2 ms-3 me-2 mt-4' onClick={toggleMore} />
        </div>
        <ul className='nav flex-column'>
          <li className="nav-item">
            <NavLink 
              to="attendance-marking" 
              className={({ isActive }) => `nav-link d-flex align-items-center text-dark ${isActive ? 'active' : ''}`}
            >
              <PeopleOutlineIcon className='me-3 fs-2' />
              {showMore && <span>Attendance Marking</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="make-announcements" 
              className={({ isActive }) => `nav-link d-flex align-items-center text-dark ${isActive ? 'active' : ''}`}
            >
              <CampaignIcon className='me-3 fs-2' />
              {showMore && <span>Announcements</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="holidays" 
              className={({ isActive }) => `nav-link d-flex align-items-center text-dark ${isActive ? 'active' : ''}`}
            >
              <EventNoteIcon className='fs-2 me-3' />
              {showMore && <span>Holidays</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="all-leaves" 
              className={({ isActive }) => `nav-link d-flex align-items-center text-dark ${isActive ? 'active' : ''}`}
            >
              <PublishedWithChangesIcon className='fs-2 me-3' />
              {showMore && <span>Leaves Approval</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="below-75" 
              className={({ isActive }) => `nav-link d-flex align-items-center text-dark ${isActive ? 'active' : ''}`}
            >
              <ReportIcon className='fs-2 me-3' />
              {showMore && <span>Below 75%</span>}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="profile-content w-100">
        <h2 className='ms-5 mt-4 text-center'>Welcome {id}-Teacher</h2>

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

export default TeacherProfile;
