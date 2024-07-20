import React from 'react';
import { useLocation } from 'react-router-dom';


function StudentDetailPage() {
  const {state} = useLocation();

  return (
    <div>
      {(state !== null) ? (
        <div className="card w-75 mx-auto mt-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img style={{height : '180px', width : '180px'}} src="https://cdn.vectorstock.com/i/1000v/19/37/graduate-student-cartoon-vector-10571937.jpg" alt="" />
              </div>
              <div className="col-md-8">
                <h2 className="card-title">Student Details</h2>
                <div className="mb-3">
                  <strong>Teacher ID:</strong> {state.userId}
                </div>
                <div className="mb-3">
                  <strong>Name:</strong> {state.name}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {state.email}
                </div>
                <div className="mb-3">
                  <strong>Phone Number:</strong> {state.phonenumber}
                </div>
                <div className="mb-3">
                  <strong>Date of Birth:</strong> {state.dob}
                </div>
                <div className="mb-3">
                  <strong>Gender:</strong> {state.gender}
                </div>
                <div className="mb-3">
                  <strong>Course & Department:</strong> {state.course}
                </div>
                <div className="mb-3">
                  <strong>Qualification:</strong> {state.qualification}
                </div>
                <div className="mb-3">
                  <strong>Branch:</strong> {state.course}
                </div>
                <div className="mb-3">
                  <strong>Year and section:</strong> {state.year} - {state.section}
                </div>
                <div className="mb-3">
                  <strong>Caste:</strong> {state.caste}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No teacher found </p>
      )}
    </div>
  );
}

export default StudentDetailPage;