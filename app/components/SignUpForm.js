/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import SignUpDone from "./SignUpDone";

const userSchema = z.object({
  fullname: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
function SignUpForm({ SubmitButton }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "age" ? parseInt(value, 10) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const validatedData = userSchema.parse(formData);

      console.log("Form data is valid:", validatedData);
      setErrors({});
      if(validatedData.errors.length > 0) {
        SubmitButton(true);
      }
    } catch (error) {
      console.error("Form data validation error:", error);
      const customErrors = {};
      error.errors.forEach((err) => {
        if (err.path[0] === "fullname") {
          customErrors.fullname = "  Fullname is required";
        } else if (err.path[0] === "email") {
          customErrors.email = "  Email is required";
        } else if (err.path[0] === "password") {
          customErrors.password = " Password is required ";
        } 
      });
      setErrors(customErrors);
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <h3 className="h3">Sign Up Here</h3>
        <label className="label">Full Name</label>
        <input
          type="text"
          className="input"
          placeholder="Enter Your Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
        {errors.fullname && <p className="p">{errors.fullname}</p>}
        <label htmlFor="username" className="label">
          Email
        </label>
        <input
          type="email"
          className="input"
          placeholder="Enter Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="p">{errors.email}</p>}
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          className="input"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="p">{errors.password}</p>}
        <button className="button">Submit</button>
      </form>
    </>
  );
}

export default SignUpForm;
