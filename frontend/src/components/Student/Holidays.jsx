import React, { useState } from 'react';
//import './Holidays.css';
import axios from 'axios';
import { useEffect } from 'react';



function Holidays() {
  // const holidays = [
  //   { date: '2024-01-01', occasion: 'New Year\'s Day', day: 'Monday' },
  //   { date: '2024-01-26', occasion: 'Republic Day', day: 'Friday' },
  //   { date: '2024-03-29', occasion: 'Holi', day: 'Friday' },
  //   { date: '2024-08-15', occasion: 'Independence Day', day: 'Thursday' },
  //   { date: '2024-10-02', occasion: 'Gandhi Jayanti', day: 'Wednesday' },
  //   { date: '2024-12-25', occasion: 'Christmas Day', day: 'Wednesday' },
  // ];
   let [holidays, setHolidays] = useState([]);

  useEffect(()=>{
    renderHolidays();
  }, [])

  async function renderHolidays(){
    let res = await axios.get('http://localhost:4000/student-app/holidays');
    console.log(res.data.payload);
    setHolidays(res.data.payload);
  }

  return (
    <div>
      <div className='card w-75 ms-5 mt-4'>
        <div className="card-title ms-4 mt-4">
          <h2 className='text-dark'>Holidays</h2>
        </div>
        <div className="card-body bg-white">
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Occasion</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td>{holiday.date}</td>
                  <td>{holiday.occasion}</td>
                  <td>{holiday.day}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Holidays;