import React from 'react';
import './AddTeacher.css'; 
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
// import { axiosWithToken } from '../AxiosWithToken';
import './TeacherRegistration.css'

function AddTeacher() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.password = data.userId; // Setting password as userId for this example

    try {
      const res = await axios.post('http://localhost:4000/admin-app/teacher-registration', data);
      if (res.data.message === "user exists") {
        toast.warning("Teacher exists");
      } else if (res.data.message === "user added") {
        toast.success("Teacher added");
      }
    } catch (error) {
      console.error('There was an error registering the teacher!', error);
    }
  };

  return (
    <div>
      <h3 className="text-center">Faculty Registration</h3>
      <div className="card w-50 border-dark shadow mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="userId">Employee ID</label>
                <input 
                  type="text" 
                  id="userId" 
                  {...register('userId', { required: 'Employee ID is required' })}
                />
                {errors.userId && <span className="error">{errors.userId.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="phonenumber">Phone Number</label>
                <input 
                  type="text" 
                  id="phonenumber" 
                  {...register('phonenumber', { required: 'Phone Number is required' })}
                />
                {errors.phonenumber && <span className="error">{errors.phonenumber.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="dob">Date of Birth</label>
                <input 
                  type="date" 
                  id="dob" 
                  {...register('dob', { required: 'Date of Birth is required' })}
                />
                {errors.dob && <span className="error">{errors.dob.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="gender">Gender</label>
                <select 
                  id="gender" 
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value="">Choose an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error">{errors.gender.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="course">Course&Dept.</label>
                <select 
                  id="course" 
                  {...register('course', { required: 'Course is required' })}
                >
                  <option value="">Choose an option</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="EEE">EEE</option>
                  <option value="AUTOMOBILE">AUTOMOBILE</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
                {errors.course && <span className="error">{errors.course.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="qualification">Qualification</label>
                <input 
                  type="text" 
                  id="qualification" 
                  {...register('qualification', { required: 'Qualification is required' })}
                />
                {errors.qualification && <span className="error">{errors.qualification.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="joiningYear">Joining Year</label>
                <input 
                  type="date" 
                  id="joiningYear" 
                  {...register('joiningYear', { required: 'Joining Year is required' })}
                />
                {errors.joiningYear && <span className="error">{errors.joiningYear.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="designation">Designation</label>
                <input 
                  type="text" 
                  id="designation" 
                  {...register('designation', { required: 'Designation is required' })}
                />
                {errors.designation && <span className="error">{errors.designation.message}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-success p-2 w-25 ms-4 mt-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
