import React, { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import axios from 'axios';
import { toast } from 'sonner';
import './AddAnnouncement.css'

function AddAnnouncement() {
  const [showForm, setShowForm] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: '',
  });

  async function pageRendered() {
    const response = await axios.get('http://localhost:4000/student-app/announcements');
    const info = response.data.payload;
    setAnnouncements(info);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAnnouncements = [...announcements, formData];
    setAnnouncements(newAnnouncements);
    console.log(formData);
    let res = await axios.post('http://localhost:4000/teacher-app/announcements', formData);
    if (res.data.message === 'announcement added') {
      toast.success("announcement added");
    }
    setFormData({ date: '', time: '', message: '' });
    setShowForm(false);
  };

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h2 className="text-center p-2 ms-5">Announcements</h2>
        <button className="btn btn-success me-5" onClick={toggleForm}>
          {showForm ? 'Show Announcements' : 'Add Announcements'}
        </button>
      </div>
      <div>
        {showForm ? (
          <form onSubmit={handleSubmit} className="mt-5 w-50 ms-5">
            <h2 className="text-center p-2 mb-4">Add Announcements</h2>
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
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-item ms-5 w-75">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control border-dark mb-5"
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary ms-5">
              Submit
            </button>
          </form>
        ) : (
          <div className="profile-content" style={{ width: '500px' }}>
            <ul className="list-group ms-5 me-5">
              {announcements.map((announcement, index) => (
                <div key={index} className="card mb-4 w-100 shadow-sm border border-dark">
                  <div className='card-body'>
                    <div className='d-flex justify-content-between'>
                      <p className='me-4'>
                        <CalendarMonthIcon className='me-2'/>
                        {announcement.date}
                      </p>
                      <p>
                        <AccessTimeFilledIcon className='me-2'/>
                        {announcement.time}
                      </p>
                    </div>
                    <p>{announcement.message}</p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddAnnouncement;
