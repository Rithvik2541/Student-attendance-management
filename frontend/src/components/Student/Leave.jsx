import React from 'react';
import { useForm } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { toast } from 'sonner';
// import './LeaveRequestForm.css'; // Import custom CSS if needed

function Leave() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.approval = "pending";
    console.log('Form Data:', data);

    try {
      const res = await axios.post('http://localhost:4000/student-app/leave', data);
      if (res.data.message === 'leave posted') {
        toast.success("leave sent")
        console.log("Letter Submitted");
      } else {
        toast.error("failed to submit");
        console.log("Failed to submit letter", res.data);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }

    reset();
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-60'>
      <div className='card shadow rounded' style={{ width: "750px" }}>
        <h3 className='bg-secondary text-center' style={{ height: "50px" }}>Leave-Letter</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label d-flex align-items-center fs-5">
              <PersonIcon className="me-2" /> Student ID
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="userId" 
              {...register('userId', { required: 'Student ID is required' })} 
            />
            {errors.userId && <span className="text-danger">{errors.userId.message}</span>}
          </div>
          <div className="mb-3 d-flex">
            <div className="me-4">
              <label htmlFor="fromDate" className="form-label fs-5">From</label>
              <input 
                type="date" 
                className="form-control" 
                id="fromDate" 
                {...register('fromDate', { required: 'Start date is required' })} 
              />
              {errors.fromDate && <span className="text-danger">{errors.fromDate.message}</span>}
            </div>
            <div>
              <label htmlFor="toDate" className="form-label fs-5">To</label>
              <input 
                type="date" 
                className="form-control" 
                id="toDate" 
                {...register('toDate', { required: 'End date is required' })} 
              />
              {errors.toDate && <span className="text-danger">{errors.toDate.message}</span>}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label fs-5">Subject</label>
            <textarea 
              className="form-control" 
              id="subject" 
              rows="2" 
              {...register('subject', { required: 'Subject is required' })} 
            ></textarea>
            {errors.subject && <span className="text-danger">{errors.subject.message}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fs-5">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              rows="5" 
              {...register('description', { required: 'Description is required' })} 
            ></textarea>
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary mt-3 mb-4">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Leave;
