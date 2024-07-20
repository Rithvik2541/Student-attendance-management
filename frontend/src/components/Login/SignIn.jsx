import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { CounterContext } from '../ContextAPI/CounterContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  let [id, setId] = useContext(CounterContext);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(data) {
    console.log('Form Data:', data);
    try {
      const res = await axios.post(
        data.userType === 'student'
          ? 'http://localhost:4000/student-app/login'
          : data.userType === 'teacher'
          ? 'http://localhost:4000/teacher-app/login'
          : 'http://localhost:4000/admin-app/login',
        data
      );
      if (res.data.message === 'login success') {
        setId(data.userId);
        console.log(id);
        toast.success('Login success');
        navigate(
          data.userType === 'student'
            ? '/student-profile'
            : data.userType === 'teacher'
            ? '/teacher-profile'
            : '/admin-profile'
        );
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ borderRadius: '0px 100px 0px 100px', maxWidth: '1100px', width: '100%' }}>
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="left-side d-flex flex-column align-items-center justify-content-center h-100 p-5">
              <div className="logo mb-3">
                <img src="https://rocketflow.in/resources/blog/images/attendance-leave-banner.jpeg" alt="Logo" className="img-fluid rounded-10" />
              </div>
              <p className="fs-3 text-center text-white">Welcome to our platform!</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body p-5 bg-white" style={{ borderRadius: '0px 100px 0px 100px' }}>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="card-title mb-4 text-dark">SIGN IN</h2>
                <div className="form-group">
                  <label htmlFor="userId" className="fs-5 mb-2">User ID</label>
                  <input
                    type="text"
                    id="userId"
                    className={`form-control shadow-sm rounded ${errors.userId ? 'is-invalid' : ''}`}
                    placeholder="Enter your userId"
                    {...register('userId', { required: 'userId is required' })}
                  />
                  {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="fs-5 mb-2">Password</label>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className={`shadow-sm rounded ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userType" className="me-4 fs-5">User Type</label>
                  <select
                    id="userType"
                    className={`form-select form-control shadow-sm rounded ${errors.userType ? 'is-invalid' : ''}`}
                    {...register('userType', { required: 'User type is required' })}
                  >
                    <option value="">Select user type</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="administrator">Administrator</option>
                  </select>
                  {errors.userType && <div className="invalid-feedback">{errors.userType.message}</div>}
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <a href="/reset-password" className="d-block">Reset Password</a>
                </div>
                <div>
                  <p><b>sample user id and passwaord</b> for all usertypes: <b>1234</b></p>
                </div>
                <button className="btn btn-primary btn-block mt-3" type="submit">LOGIN</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SignIn;
