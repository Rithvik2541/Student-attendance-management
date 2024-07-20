import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';



function StudentDetails() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  async function pageRendered(){
    let res = await axios.get('http://localhost:4000/admin-app/student-details');
    if(res.data.message === 'deatils fetched')
    setStudents(res.data.payload);
    else{
      console.log("error in fetching")
    }
  }

  useEffect(()=>{
    pageRendered();
  },[])

  const handleViewDetails = (studentObj) => {
    navigate('/admin-profile/student-page', {state : studentObj});
  };



  const handleRemoveStudent = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:4000/admin-app/student-delete/${id}`);
      if (res.data.message === 'Deleted Successfully') {
        toast.success('Deleted successfully');
        pageRendered();
      } else {
        toast.error('Could not delete');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Server error');
    }
  };

  return (
    <div className='d-block mx-auto'>
      <h1 className='text-center mb-4'>Student Details</h1>
      <table border="1" className='table p-4 w-75 ms-5'>
        <thead className='text-center'>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {students.map((student) => (
            <tr key={student.userId}>
              <td className='ms-4'>{student.userId}</td>
              <td>{student.name}</td>
              <td>
                <button
                  
                  className='rounded btn-success p-1'
                  style={{ backgroundColor: "rgba(74, 208, 43, 0.556)" }}
                  onClick={() => handleViewDetails(student)}
                >
                  View Details
                </button>
                <button
                  style={{ backgroundColor: "rgba(255, 0, 0, 0.556)" }}
                  className='rounded btn-danger p-1 ms-2'
                  onClick={() => handleRemoveStudent(student.userId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDetails;