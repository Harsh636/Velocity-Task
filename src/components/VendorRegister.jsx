import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorRegister = ({setIsRegister}) => {
  const navigate = useNavigate();

  const ALL_CATEGORIES = ["1", "2", "3", "4"];
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    revenue: '',
    noofemployees: '',
    gstno: '',
    panno: '',
    phoneno: '',
    categories: [],
  });

  const handleChange = (e) => {
    const { id, value, type, selectedOptions } = e.target;
    

    // Handle the multi-select and select-all logic
    if (type === 'select-multiple' && id === 'categories') {
      const values = Array.from(selectedOptions, (option) => option.value);
      
      // If "All Categories" is selected, select all
      if (values.includes("all")) {
        setFormData({ ...formData, categories: ALL_CATEGORIES });
      } else {
        setFormData({ ...formData, categories: values });
      }
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.categories.length === 0) {
      alert('Please select at least one valid category.');
      return;
    }
    
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      revenue: formData.revenue,
      no_of_employees: parseInt(formData.noofemployees, 10),
      category: formData.categories.join(","),
      pancard_no: formData.panno,
      gst_no: formData.gstno,
      mobile: formData.phoneno,
    };
    console.log(payload);
    try {
      const response = await fetch('https://rfpdemo.velsof.com/api/registervendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegister(false);
        navigate("/login");
        console.log(data);
        if(data?.response==="success"){
          console.log('Vendor registered successfully!');

          console.log(data);
        }else{
          console.log(data.error);
        }
        
      } else {
        alert(`Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-8">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Register as Vendor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-4">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstname">First name*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder="Enter Firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lastname">Last Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            placeholder="Enter Lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="email">Email*</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password">Password*</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="confirmpassword">Confirm Password*</label>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmpassword"
                            placeholder="Confirm Password"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="revenue">Revenue (Last 3 Years in Lacs)*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="revenue"
                            placeholder="1000,2000,3000"
                            value={formData.revenue}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="noofemployees">No of Employees*</label>
                          <input
                            type="number"
                            className="form-control"
                            id="noofemployees"
                            placeholder="No of Employees"
                            value={formData.noofemployees}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="gstno">GST No*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="gstno"
                            placeholder="GST Number"
                            value={formData.gstno}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="panno">PAN No*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="panno"
                            placeholder="PAN Number"
                            value={formData.panno}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phoneno">Phone No*</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phoneno"
                            placeholder="Phone Number"
                            value={formData.phoneno}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="categories">Categories*</label>
                          <select
                            className="form-control"
                            id="categories"
                            multiple
                            size="4"
                            style={{ overflowY: 'auto', height: '100px' }}
                            value={formData.categories}
                            onChange={handleChange}
                          >
                            <option value="all">All Categories</option>
                            <option value="1">Software</option>
                            <option value="2">Hardware</option>
                            <option value="3">Office Furniture</option>
                            <option value="4">Stationery</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 mt-3">
                      <button type="submit" className="btn btn-primary btn-block">
                        Register
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <a onClick={() => {setIsRegister(false);navigate("/login")}} href="#" className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Back to Login
                      </a>
                    </div>
                    <div className="mt-4 text-center">
                      <a onClick={() => {navigate("/admin");}} href="#" className="text-muted">
                        <i className="mdi mdi-lock mr-1"></i> Register as Admin
                      </a>
                    </div>
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

export default VendorRegister;
