import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    pass:"", // Correct key name
    email:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        console.log("Failed");
      } else {
        console.log("Successful");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>

    <h1>Hello</h1>
      <div>
        <form onSubmit={Submit}>
          <input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email'/>
          <input type='password' name='pass' value={data.password} onChange={handleChange} placeholder='Password'/>
          <Button variant='contained' type='Submit'>Submit</Button>
        </form>
        <p>
          Don't have an account? <Link to='/'>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
