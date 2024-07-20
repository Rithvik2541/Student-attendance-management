import React, { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios';
import { toast } from 'sonner';
// import { axiosWithToken } from '../AxiosWithToken';

function AddHolidays() {
  const [showForm, setShowForm] = useState(false);


  const [holidays, setHolidays] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    day: '',
    occasion: ''
  });

  async function pageRendered() {
    const response = await axios.get('http://localhost:4000/student-app/holidays');
    const info = response.data.payload;
    setHolidays(info);
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  useEffect(() => {
    pageRendered();
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    let res = await axios.post('http://localhost:4000/admin-app/holidays', formData);
    if(res.data.message === 'holiday added'){
      toast.success("holiday added");
    }

    const newHolidays = [...holidays, formData];
    setHolidays(newHolidays);
    setFormData({ date: '', day: '', occasion: '' });
    setShowForm(false);
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2 className="text-center p-2 ms-5">Holidays</h2>
        <button className="btn btn-success me-5" onClick={toggleForm}>
          {showForm ? 'Show Holidays' : 'Add Holidays'}
        </button>
      </div>
      <div className='card mt-5 w-75'>
        {showForm ? (
          <form onSubmit={handleSubmit} className="mt-5 w-50 ms-5">
            <h2 className="text-center p-2">Add Holidays</h2>
            <div className="form-row ms-5 w-75">
              <div className="form-item w-50 mt-1">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-item w-50 mt-1 ms-3">
                <label htmlFor="day">Day</label>
                <input
                  type="text"
                  id="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-item ms-5 w-75">
              <label htmlFor="occasion">Occasion</label>
              <input
                type="text"
                id="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary ms-5">
              Submit
            </button>
          </form>
        ) : (
          <div className="profile-content d-flex justify-content-start" style={{width : '600px'}}>
            <ul className="list-group">
              {holidays.map((holiday, index) => (
                <div key={index} className="card mb-4">
                  <div className='d-flex '>
                    <p className='me-4'>
                      <CalendarMonthIcon className='me-2'/>
                      {holiday.date}</p>
                    <p><AccessTimeFilledIcon className='me-2'/>
                      {holiday.day}</p>
                  </div>
                  <p>{holiday.occasion}</p>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddHolidays;