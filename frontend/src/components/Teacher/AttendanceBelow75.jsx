import { duration } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

const Below75 = () => {
  
  const [students, setStudents] = useState([]);

  async function pageRendered(){
    let res = await axios.get('http://localhost:4000/teacher-app/75below');
    setStudents(res.data.payload);
    console.log(students);
  }

  const handleSendEmail = async(email,userId, percentage) => {
    let res = await axios.post('http://localhost:4000/teacher-app/send-mail', {email, userId, percentage})

    if(res.data.message === 'email sent'){
      console.log("email sent");
    }
    else{
      console.log(res.data.message)
    }

    console.log(`Email sent to: ${email}`);
  };

  useEffect(()=>{
    pageRendered();
  },[])

  async function selectAll(){
    let res = await axios.post('http://localhost:4000/teacher-app/mail-to-all', students)
    console.log("mail sent to all");
  }

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Students with <span className='text-danger fs-3'> Less than 75%</span>  Attendance</h3>
      <div className="checkbox d-flex mb-2 ">
        {/* <input type="checkbox" id='check' className='' style={{width : '30px', height : '20px'}} />
        <label htmlFor="check" className='ms-1'><b>select all</b></label> */}
        <div className="btn btn-success" onClick={selectAll}>Send Mail to All</div>
      </div>
      <table className="table table-bordered border-dark table-striped">
        <thead className="thead-dark text-center">
          <tr>
            <th>Student ID</th>
            <th>Email</th>
            <th>Attendance (%)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center ">
              <td className='mt-5 '>{student.userId}</td>
              <td className='mt-5 '>{student.name}</td>
              <td className='mt-5 '>{student.percentage.toFixed(2)}</td>
              <td>
              <div className="d-flex justify-content-center">
                  
                  <button
                    className="rounded  p-2 btn-primary text-white "
                    onClick={() => (toast.success('email sent'), {duration : 1000}, handleSendEmail(student.email, student.userId, student.percentage.toFixed(2)))}
                  >
                    Send Email
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Below75;