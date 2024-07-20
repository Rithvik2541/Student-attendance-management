import React from 'react';
import { useLocation, useParams } from 'react-router-dom';


function TeacherDetailPage() {
  const {state} = useLocation();

  return (
    <div>
      {(state !== null) ? (
        <div className="card w-75 mx-auto mt-5">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img src="https://tse3.mm.bing.net/th?id=OIP.dhbwUTcVsWUkLSIUdHemAQHaHa&pid=Api&P=0&h=180" alt="" />
              </div>
              <div className="col-md-8">
                <h2 className="card-title">Teacher Details</h2>
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
                  <strong>Joining Year:</strong> {state.joiningYear}
                </div>
                <div className="mb-3">
                  <strong>Designation:</strong> {state.designation}
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

export default TeacherDetailPage;