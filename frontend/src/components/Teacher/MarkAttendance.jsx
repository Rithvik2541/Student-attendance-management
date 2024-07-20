import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'sonner';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [branches, setBranches] = useState(['CSE', 'IT', 'EEE', 'AUTOMOBILE', 'CIVIL']);
  const [selectedBranch, setSelectedBranch] = useState('CSE');

  useEffect(() => {
    axios.get('http://localhost:4000/teacher-app/allstudents')
      .then(response => {
        setStudents(response.data.payload);
        setFilteredStudents(response.data.payload.filter(student => student.course === selectedBranch));
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
        toast.error('There was an error fetching the students!', { position: 'top-center' });
      });
  }, [selectedBranch]);

  const handleBranchChange = (event) => {
    const branch = event.target.value;
    setSelectedBranch(branch);
    setFilteredStudents(students.filter(student => student.branch === branch));
  };

  const handleAttendanceChange = (index, isPresent) => {
    const newStudents = [...filteredStudents];
    newStudents[index].present = isPresent;
    setFilteredStudents(newStudents);
  };

  const handleSubmit = async () => {
    const attendanceData = filteredStudents.map(student => ({
      userId: student.userId,
      name: student.name,
      date: new Date().toISOString().split('T')[0],
      present: student.present || false,
      totalClasses: student.totalClasses || 0,
      classesPresent: student.classesPresent || 0,
      percentage: student.percentage || 0.0,
    }));

    try {
      const response = await axios.post('http://localhost:4000/teacher-app/markAttendance', attendanceData);
      if (response.data.message === 'attendance marked') {
        toast.success('Attendance Marked', { position: 'top-center', duration: 5000 });
      } else {
        toast.error('Failed to mark attendance', { position: 'top-center', duration: 5000 });
      }
    } catch (error) {
      console.error('There was an error marking the attendance!', error);
      toast.error('There was an error marking the attendance!', { position: 'top-center', duration: 5000 });
    }
  };

  const presentCount = filteredStudents.reduce((count, student) => student.present ? count + 1 : count, 0);
  const absentCount = filteredStudents.length - presentCount;

  return (
    <div>
      <div className="branches mt-5 mb-3 d-block mx-auto" style={{width : '800px'}}>
      <select id="branchSelect" className="form-select" aria-placeholder='select branch' value={selectedBranch} onChange={handleBranchChange}>
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>
    <div className="container mt-2 p-2" style={{borderRadius: '10px', maxWidth: '800px', backgroundColor: "#e0dcd3" }}>
      <Toaster />
      <div className="table-responsive mt02">
        <table className="table table-striped table-bordered text-center">
          <thead className="thead">
            <tr>
              <th style={{ width: '10%' }}>Student ID</th>
              <th style={{ width: '45%' }}>Name</th>
              <th style={{ width: '10%' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.userId}>
                <td>{student.userId}</td>
                <td>{student.name}</td>
                <td className='align-items-center'>
                  <input 
                    type="checkbox" 
                    checked={student.present || false} 
                    onChange={(e) => handleAttendanceChange(index, e.target.checked)} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between border rounded" style={{ fontStyle: "italic", fontSize: "20px", textAlign: "center" }}>
        <p>Present Students: {presentCount}</p>
        <p>Absent Students: {absentCount}</p>
      </div>
      <div className="text-end mt-3 ">
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#4e493f" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
    </div>
   
  );
};

export default MarkAttendance;
