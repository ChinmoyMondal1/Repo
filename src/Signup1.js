import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';



const Signup = () => {
  const [data, setData] = useState({
    user: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const Submit = (event) => {
    event.preventDefault();
    console.log(data);
  };
  return (
    <div>
      <div>

        <form onSubmit={Submit}>
          <input type='text' name="user" value={data.user} onChange={handleChange} placeholder='Username' />
          <input type='password' name='password' value={data.password} onChange={handleChange} placeholder='Password' />
          <input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' />
          <Button variant='contained' type='Submit'>Submit</Button>
        </form>
      
     </div>
    </div>
  )
};

export default Signup;