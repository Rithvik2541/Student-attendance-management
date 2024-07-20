import React, { useState, useEffect } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import axios from 'axios';
import { toast } from 'sonner';

function AllLeave() {
  const [leaves, setLeaves] = useState([]);
  const [expandedLeaveId, setExpandedLeaveId] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try{
      let res = await axios.get("http://localhost:4000/teacher-app/all-leaves");
      if(res.data.message === 'leaves fetched'){
        console.log("leaves fetched");
        setLeaves(res.data.payload);
      }else{
        console.log("could not fetch");
      }
    }
    catch(err){
      console.log("error "+err);
    }
  };

  const handleApprove = async(userId) => {
    let approval = "approved";
    let res = await axios.put('http://localhost:4000/teacher-app/approveLeave', {userId, approval});
    if(res.data.message === 'leave updated'){
      toast.success("leave approved")
    }else{
      toast.error(res.data.message)
    }
  };

  const handleReject = async(userId) => {
    let approval = "rejected";
    let res = await axios.put('http://localhost:4000/teacher-app/approveLeave', {userId, approval});
    if(res.data.message === 'leave updated'){
      toast.success("leave rejected")
    }else{
      toast.error(res.data.message)
    }
  };

  const handleReadMore = (leaveId) => {
    setExpandedLeaveId(expandedLeaveId === leaveId ? null : leaveId);
  };

  return (
    <div className="leave-requests-container">
      <h1 className="text-center mb-4">Leave Requests</h1>
      {leaves.length > 0 ? (
        leaves.map((leave) => (
          <div key={leave.userId} className="card w-75 mb-3" style={{ backgroundColor: 'aliceblue' }}>
            <div className="d-flex justify-content-between p-3">
              <h5 className="card-title">Leave Request</h5>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleApprove(leave.userId)}
                >
                  <CheckBoxIcon className="fs-3" />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(leave.userId)}
                >
                  <DisabledByDefaultIcon className="fs-3" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p><strong>Student ID:</strong> {leave.userId}</p>
              <p><strong>Subject:</strong> {leave.subject}</p>
              {expandedLeaveId === leave.userId && (
                <div>
                  <p><strong>From Date:</strong> {leave.fromDate}</p>
                  <p><strong>To Date:</strong> {leave.toDate}</p>
                  <p><strong>Content:</strong> {leave.description}</p>
                </div>
              )}
              <button
                className="btn btn-link p-0 mt-2"
                onClick={() => handleReadMore(leave.userId)}
              >
                {expandedLeaveId === leave.userId ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No leave requests available.</p>
      )}
    </div>
  );
};

export default AllLeave;