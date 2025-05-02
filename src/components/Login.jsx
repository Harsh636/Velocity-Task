import React from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({
  isRegister,
  setIsRegister,
  handleSubmit,
  handleChange,
  formData,
  setFormData,
}) => {
  
  const navigate = useNavigate();
  const handleRegister = ()=>{
    !isRegister?navigate("/vendor-registration"): navigate("/login");
    
  };

  function handleForgetPassword(){
    navigate("/forgetpassword")
  }
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="home-btn d-none d-sm-block">
        <a href="/" className="text-dark">
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
                  <p>
                    {isRegister ? "Sign up to continue" : "Sign in to continue"}
                  </p>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <form onSubmit={handleSubmit}>
                    {isRegister && (
                      <>
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                      />
                    </div>

                    {isRegister && (
                      <>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="mobile">Mobile</label>
                          <input
                            type="tel"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
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
                        {isRegister ? "Register" : "Log In"}
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <a
                      
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRegister();
                          setIsRegister((prev) => !prev);
                          setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            mobile: "",
                          });
                        }}
                        className="text-muted"
                      >
                        <i className="mdi mdi-lock mr-1"></i>{" "}
                        {isRegister ? "Back to Login" : "Register as Vendor"}
                      </a>
                    </div>
                    {isRegister && (
                      <div className="mt-4 text-center">
                      <a onClick={()=>navigate("/vendor-registration")} href="#" className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Register as
                        Vendor
                      </a>
                    </div>
                    )}
                    
                    
                    {!isRegister && (
                      <div className="mt-4 text-center">
                        <a onClick={handleForgetPassword} href="#" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Forgot your
                          password?
                        </a>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p>
                &copy; Copyright {new Date().getFullYear()} RFP System <i className="mdi mdi-heart text-danger"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
