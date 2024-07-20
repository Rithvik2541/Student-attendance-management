import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function AddStudent() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.password = data.userId; // Setting password as userId for this example

    try {
      const res = await axios.post('http://localhost:4000/admin-app/student-registration', data);
      if (res.data.message === 'user exists') {
        toast.warning("Student exists");
      } else if (res.data.message === 'user added') {
        toast.success("Student added");
      }
    } catch (error) {
      console.error("There was an error adding the student!", error);
    }
  };

  return (
    <div>
      <h3 className="text-center">Student Registration</h3>
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
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  {...register('email', { required: 'Email is required' })} 
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="userId">Roll No</label>
                <input 
                  type="text" 
                  id="userId" 
                  {...register('userId', { required: 'Roll No is required' })} 
                />
                {errors.userId && <span className="text-danger">{errors.userId.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="phonenumber">Phone Number</label>
                <input 
                  type="text" 
                  id="phonenumber" 
                  {...register('phonenumber', { required: 'Phone Number is required' })} 
                />
                {errors.phonenumber && <span className="text-danger">{errors.phonenumber.message}</span>}
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
                {errors.dob && <span className="text-danger">{errors.dob.message}</span>}
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
                {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="course">Branch</label>
                <select 
                  id="course" 
                  {...register('course', { required: 'Branch is required' })} 
                >
                  <option value="">Choose an option</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="EEE">EEE</option>
                  <option value="AUTOMOBILE">AUTOMOBILE</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
                {errors.course && <span className="text-danger">{errors.course.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="section">Section</label>
                <input 
                  type="text" 
                  id="section" 
                  {...register('section', { required: 'Section is required' })} 
                />
                {errors.section && <span className="text-danger">{errors.section.message}</span>}
              </div>
            </div>
            <div className="form-row ms-4">
              <div className="form-item me-5">
                <label htmlFor="year">Year</label>
                <select 
                  id="year" 
                  {...register('year', { required: 'Year is required' })} 
                >
                  <option value="">Choose year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                {errors.year && <span className="text-danger">{errors.year.message}</span>}
              </div>
              <div className="form-item me-5">
                <label htmlFor="caste">Caste</label>
                <input 
                  type="text" 
                  id="caste" 
                  {...register('caste', { required: 'Caste is required' })} 
                />
                {errors.caste && <span className="text-danger">{errors.caste.message}</span>}
              </div>
            </div>
            <button type="submit" className="btn btn-success p-2 w-25 ms-4 align-items-right">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
