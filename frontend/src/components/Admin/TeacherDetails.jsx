import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { axiosWithToken } from '../AxiosWithToken';


function TeacherDetails() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);


  async function pageRendered(){
    let res = await axios.get('http://localhost:4000/admin-app/teacher-details');
    if(res.data.message === 'deatils fetched')
    setTeachers(res.data.payload);
    else{
      console.log("error in fetching")
    }
  }

  useEffect(()=>{
    pageRendered();
  },[])

  const handleViewDetails = (teacherObj) => {
    navigate('/admin-profile/teacher-page', {state : teacherObj});
  };

  const handleRemoveTeacher = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:4000/admin-app/teacher-delete/${id}`);
      if (res.data.message === 'Deleted Successfully') {
        toast.success('Deleted Successfully');
        pageRendered(); 
      } else {
        toast.error('could not delete');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Server error');
    }
  };
  

  return (
    <div className='d-block mx-auto'>
      <h1 className='text-center mb-4'>Teacher Details</h1>
      <table border="1" className='table p-4 w-75 ms-5'>
        <thead className='text-center'>
          <tr>
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {teachers.map((teacher) => (
            <tr key={teacher.userId}>
              <td className='ms-4'>{teacher.userId}</td>
              <td>{teacher.name}</td>
              <td>
                <button
                  style={{ backgroundColor: "rgba(74, 208, 43, 0.556)" }}
                  className='rounded btn-success p-1'
                  onClick={() => handleViewDetails(teacher)}
                >
                  View Details
                </button>
                <button
                  style={{ backgroundColor: "rgba(255, 0, 0, 0.556)" }}
                  className='rounded btn-danger p-1 ms-2'
                  onClick={() => handleRemoveTeacher(teacher.userId)}
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

export default TeacherDetails;