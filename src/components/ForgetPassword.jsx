import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (step === 1) {
      // Step 1: Send OTP via API
      console.log(formData.email);
      try {
        const response = await fetch("https://rfpdemo.velsof.com/api/resetPassword", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: formData.email }),
        });
  
        const result = await response.json();
        console.log("OTP Send Response:", result);
  
        if (response.ok) {
          alert("OTP sent successfully to your email.");
          setStep(2);
        } else {
          alert(result.message || "Failed to send OTP.");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("Something went wrong. Please try again.");
      }
    } else if (step === 2) {
      // Step 2: Verify OTP (local logic only)
      if (formData.otp.length === 4) {
        setStep(3);
      } else {
        alert("Please enter a valid 4-digit OTP.");
      }
    } else if (step === 3) {
      // Step 3: Reset Password (API not provided, mock only)
      if (formData.newPassword !== formData.confirmPassword) {
        alert("Passwords do not match!");
      } else {
        alert("Password reset successful.");
        // Navigate to login or another page if needed
      }
    }
  };
  

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="home-btn d-none d-sm-block">
        <a href="" className="text-dark">
          <i className="fas fa-home h2"></i>
        </a>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="text-primary p-4">
                  <h5 className="text-primary">Welcome to RFP System!</h5>
                  <p>Forgot Password</p>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                          type="text"
                          maxLength={4}
                          className="form-control"
                          id="otp"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="4-digit OTP"
                          required
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <>
                        <div className="form-group">
                          <label htmlFor="newPassword">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block waves-effect waves-light"
                      >
                        {step === 1
                          ? "Send OTP"
                          : step === 2
                          ? "Verify OTP"
                          : "Reset Password"}
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <a onClick={() => navigate("/vendor-registration")}  className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Register as Vendor
                      </a>
                    </div>
                    <div className="mt-4 text-center">
                      <a onClick={() => navigate("/login")}  className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Back to Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p>
                &copy; RFP System <i className="mdi mdi-heart text-danger"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
