"use client";

import React, { useState } from 'react';

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data:', formData);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>Sign Up</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit}
      >
        <label
          style={{
            marginBottom: '4px',
            fontWeight: 'bold',
          }}
          htmlFor="username"
        >
          Username
        </label>
        <input
          style={{
            padding: '8px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label
          style={{
            marginBottom: '4px',
            fontWeight: 'bold',
          }}
          htmlFor="email"
        >
          Email
        </label>
        <input
          style={{
            padding: '8px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label
          style={{
            marginBottom: '4px',
            fontWeight: 'bold',
          }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          style={{
            padding: '8px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
