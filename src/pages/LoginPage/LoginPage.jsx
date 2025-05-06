import React, { useContext, useState } from "react";
import Login from "../../components/Login";
import { UserContext } from "../../Context/Context";
import { useNavigate } from 'react-router-dom';


const LoginPage = ({isRegister, setIsRegister}) => {
  const {login} = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  });

  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch("https://rfpdemo.velsof.com/api/registeradmin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile
          }),
        });

        const data = await response.json();

        if (response.ok && data.response === "success") {
          alert("Registration successful!");
          setIsRegister(false); // Switch to login form
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: ""
          });
          navigate("/login");
        } else {
          alert(data?.error || data?.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Register API Error:", error);
        alert("An unexpected error occurred during registration.");
      }

    } else {
      // Login logic
      try {
        const response = await fetch("https://rfpdemo.velsof.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok && data.response === "success") {
          console.log("Login Successfull")
          login({
            user_id: data.user_id,
            type: data.type,
            name: data.name,
            email: data.email,
            token: data.token,
          });


          // Optionally clear form after login
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            mobile: "",
          });
          navigate(`/${data.type}`);
        } else {
          alert(data?.error || data?.message || "Login failed.");
        }
      } catch (error) {
        console.error("Login API Error:", error);
        alert("An unexpected error occurred during login.");
      }
    }
  };

  return (
      <Login
      isRegister={isRegister}
      setIsRegister={setIsRegister}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
    />
    
    
  );
};

export default LoginPage;
