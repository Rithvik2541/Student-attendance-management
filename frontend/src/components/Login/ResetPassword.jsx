import React from 'react';
import { useForm } from 'react-hook-form';
import './ResetPassword.css';
import axios from 'axios';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    let res = await axios.put('http://localhost:4000/admin-app/reset-password', data); 
    if(res.data.message === 'password changed'){
      toast.success("Password Changed");
      console.log("Password Changed Successfuly")
    }
    else{
      toast.error(res.data.message)
      console.log(res.data.message);
    }
    reset();
  };

  return (
    <div className="reset-password-container">
      <h2 className="text-center mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            {...register('userId', { required: true })}
            className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
          />
          {errors.userId && <div className="invalid-feedback">User ID is required</div>}
        </div>

        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            {...register('oldPassword', { required: true })}
            className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
          />
          {errors.oldPassword && <div className="invalid-feedback">Old Password is required</div>}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            {...register('newPassword', { required: true })}
            className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
          />
          {errors.newPassword && <div className="invalid-feedback">New Password is required</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
