import React, { useContext, useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Category from "../components/Category";
import Rfp from "../components/Rfp";
import VendorList from "../components/VendorList";
import RfpQuotes from "../components/RfpQuotes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../Context/Context";
import CreateRFP from "../components/CreateRfp";


const AdminPanal = () => {
  const { logout, user, category , rfpData, approveVendor, setApproveVendor} = useContext(UserContext);
  const [activeView, setActiveView] = useState("dashboard");
  // const [allCategory, setAllCategory] = useState([]);
  console.log(rfpData);
  const [vendors, setVendors] = useState([]);
  
  const [loadingVender, setLoadingVendor] = useState(false);
  
  const [addRfp, setAddRfp] = useState(false);

  // Fetch all data on component mount if user is available
  useEffect(() => {
    if (!user || !user.token || !user.user_id) {
      console.warn("User not available for API calls");
      return;
    }

    const fetchData = async () => {
      try {

        // Fetch vendors
        const vendorsResponse = await fetch("https://rfpdemo.velsof.com/api/vendorlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const vendorsResult = await vendorsResponse.json();
        
        if (vendorsResponse.ok && vendorsResult.response === "success") {
          setLoadingVendor(false);
          console.log(vendorsResult)
          setVendors(vendorsResult.vendors || []);
        } else{
          console.log(vendorsResult.error);
        }

        
        
      } catch (error) {
        console.error("API call error:", error);
      }
    };

    fetchData();
  }, [user, approveVendor]);

  const handleLogout = () => {
    logout();
  };

  function handleRfp() {
    setAddRfp(true);
  }

  // Wait until user is available before rendering
  if (!user || !user.token) {
    return <div>Loading user...</div>;
  }

  return (
    <div id="layout-wrapper">
      
      <Header user={user} handleLogout={handleLogout} />
      
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <a
                  href="#"
                  className="waves-effect"
                  onClick={() => setActiveView("dashboard")}
                >
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="waves-effect"
                  onClick={() => setActiveView("vendors")}
                >
                  <i className="mdi mdi-receipt"></i>
                  <span>Vendors</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="waves-effect"
                  onClick={() => setActiveView("rfp")}
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="waves-effect"
                  onClick={() => setActiveView("quotes")}
                >
                  <i className="mdi mdi-apps"></i>
                  <span>RFP Quotes</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="waves-effect"
                  onClick={() => setActiveView("category")}
                >
                  <i className="mdi mdi-weather-night"></i>
                  <span>Categories</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {addRfp ? (
              <CreateRFP
                vendors={vendors}
                setAddRfp={setAddRfp}
                categories={category.length > 0 ? category : ["Electronics", "Office Supplies", "Furniture"]}
              />
            ) : activeView === "dashboard" ? (
              <Dashboard />
            ) : activeView === "category" ? (
              <Category/>
            ) : activeView === "rfp" ? (
              <Rfp rfpData={rfpData} handleRfp={handleRfp} />
            ) : activeView === "vendors" ? (!loadingVender?<VendorList vendors={vendors} setApproveVendor={setApproveVendor} approveVendor={approveVendor} loadingVender={loadingVender} setLoadingVendor={setLoadingVendor}/>:<h4>Updating Vendor... </h4>
            ) : activeView === "quotes" ? (
              <RfpQuotes rfpData={rfpData} />
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPanal;
