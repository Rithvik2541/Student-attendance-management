import React, { useEffect, useState } from 'react';
import './Announcements.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';

// const announcements = [
//   { message: "Come to the auditorium", date: "12-16-2005", time: "12:00" },
//   { message: "Meeting in the conference room", date: "12-17-2005", time: "14:00" }
// ];


function Announcements() {

  let [announcements, setAnnouncements] = useState([]);
  
  useEffect(()=>{
    announcementsAdd();
  }, [])
  
  async function announcementsAdd(){
    let res = await axios.get('http://localhost:3001/student-app/announcements');
    console.log(res.data.payload);
    setAnnouncements(res.data.payload); 
  }


  return (
    <div>
      <div className='card w-75 ms-5 mt-4'>
        <div className="card-title ms-4 mt-4">
          <h2 className=' text-center text-dark'>Announcements:</h2>
        </div>
        <div className="card-body bg-white">
          <table className='announcements-table'>
            <tbody>
              {
              announcements.map((announcement, index) => (
                <tr key={index}>
                  <td className='date-time'>
                  <div className='d-flex'>
                    <div className='me-4'>
                    <CalendarMonthIcon/>
                    {announcement.date} 
                    </div>
                    <div>
                     <AccessTimeIcon/>
                    {announcement.time}
                    </div>
                   </div>
                    <div className='message'>{announcement.message}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Announcements;