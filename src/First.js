import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
import './First.css'

const First = () => {
  const [data, setData] = useState({
    user: "",
    pass: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/signup", {
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
        // Optionally, set an error state to show the user.
      } else {
        console.log("Successful");
        // Optionally, clear the form or navigate to another page.
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div id='Main'>
      <div id='container1' style={{
        backgroundColor:'blue'
      }}>
        
      <form onSubmit={handleSubmit} id='form'>
        <input 
          type="text"
          id='Username'
          placeholder="Username"
          name="user"
          value={data.user}
          onChange={handleChange}
        />

        <input 
          type="password" 
          placeholder="Password"
          name="pass"
          id='Pass'
          value={data.pass}
          onChange={handleChange}
        />

        <input 
          type="email" 
          placeholder="Email"
          name="email"
          id='email'
          value={data.email}
          onChange={handleChange}
          />

        <Button variant="contained" type="submit" id='Submit'>
          Submit
        </Button>
      </form>
      <p>
        already have an account? 
        <Link to="/Login">Go to login</Link >
        </p>
          </div>
    </div>
  );
};

export default First;
