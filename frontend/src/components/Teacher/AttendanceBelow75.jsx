import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Below75 = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:4000/teacher-app/75below');
        setStudents(res.data.payload);
      } catch (error) {
        console.error("Error fetching students data", error);
      }
    }
    fetchData();
  }, []);

  const handleSendEmail = async (email, userId, percentage) => {
    try {
      const res = await axios.post('http://localhost:4000/teacher-app/send-mail', { email, userId, percentage });
      if (res.data.message === 'email sent') {
        toast.success('Email sent', { duration: 1000 });
      } else {
        console.log(res.data.message);
      }
      console.log(`Email sent to: ${email}`);
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  const selectAll = async () => {
    try {
      const res = await axios.post('http://localhost:4000/teacher-app/mail-to-all', students);
      console.log("Mail sent to all", res);
    } catch (error) {
      console.error("Error sending mail to all", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">
        Students with <span className='text-danger fs-3'> Less than 75%</span> Attendance
      </h3>
      <div className="checkbox d-flex mb-2">
        {/* <input type="checkbox" id='check' className='' style={{ width: '30px', height: '20px' }} />
        <label htmlFor="check" className='ms-1'><b>Select all</b></label> */}
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
            <tr key={student.id} className="text-center">
              <td>{student.userId}</td>
              <td>{student.email}</td>
              <td>{student.percentage.toFixed(2)}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <button
                    className="rounded p-2 btn-primary text-white"
                    onClick={() => {
                      toast.success('Email sent', { duration: 1000 });
                      handleSendEmail(student.email, student.userId, student.percentage.toFixed(2));
                    }}
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
