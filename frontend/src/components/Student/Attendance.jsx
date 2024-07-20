import React, { useState, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Speedometer from '../Speedometer/speedometer';
import { CounterContext } from '../ContextAPI/CounterContext';

function ViewAttendance() {
  const [value, setValue] = useState(70.00);
  const [open, setOpen] = useState(false);
  // const totalClasses = 250;
  const [classesToAttend, setClassesToAttend] = useState(0);
  const [classesCompleted, setClassesCompleted] = useState(0);
  console.log(classesCompleted)
  const requiredPercentage = 75;
  let [id] = useContext(CounterContext);
  useEffect(() => {
    // Fetch the attendance percentage
    axios.get(`http://localhost:4000/student-app/attendance/${id}`)
      .then(response => {
        const attendanceData = response.data;
        setValue(attendanceData.percentage);
        setClassesCompleted(attendanceData.classesCompleted)
      })
      .catch(error => {
        console.error('There was an error fetching the float value!', error);
      });

    // Fetch the required classes to attend
    async function fetchClassesRequired() {
      try {
        const res = await axios.get(`http://localhost:4000/student-app/attendanceReq/${id}`);
        setClassesToAttend(res.data.message);
      } catch (error) {
        console.error('There was an error fetching the required classes!', error);
      }
    }

    fetchClassesRequired();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <div className="fs-3 text-center display-7 ">Attendance</div>
      <div className='d-flex justify-content-center '>
        <Speedometer value={value} />
      </div>
      {value >= requiredPercentage ? (
        <p className="text-center " >You have {value.toFixed(2)}% attendance. Well done! You have reached {requiredPercentage}% attendance.</p>
      ) : (
        <div className="text-center fs-4">
          <p>You have {value.toFixed(2)}% attendance. Struggling to know, more how many classes need to atted?. </p>
           <Button variant="contained" onClick={handleClickOpen}>
            Click here!
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <div className='d-flex  bg-secondary'>
       
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              <CloseIcon className='text-white ' />
            </Button>
          </DialogActions>
          <DialogTitle className='fs-4 text-center text-white '>Attendance Details</DialogTitle>
        </div>
      
        <DialogContent>
          <DialogContentText>
            <div className='d-flex flex-column align-items-center'>
              <img src="https://tse4.mm.bing.net/th?id=OIP.0g27SVy0yZAlknBCgZpCCgHaGQ&pid=Api&P=0&h=180" className='rounded d-block mx-auto mb-4' style={{ width: "120px" }} alt="Attendance Info" />
              <p className='fs-4 text-dark text-center'>You need to attend {classesToAttend} more classes to reach {requiredPercentage}% attendance.</p>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewAttendance;