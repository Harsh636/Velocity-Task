import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../Context/Context";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";
import VendorRfp from "../components/VendorRfpList";
import ApplyRFP from "../components/ApplyRFP";

const VendorPanal = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isApplyRfp, setIsApplyRfp] = useState(null);
  const { user, logout, rfpData } = useContext(UserContext);
  console.log(rfpData);
  const handleLogout = () => {
    logout();
  };
  const handleCancel = () => {
    setIsApplyRfp(false);
  };
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
                  <span>RFP List</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {isApplyRfp ? (
              <ApplyRFP
                setIsApplyRfp={setIsApplyRfp}
                isApplyRfp={isApplyRfp}
                handleCancel={handleCancel}
              />
            ) : activeView === "dashboard" ? (
              <Dashboard />
            ) : (
              <VendorRfp rfpData={rfpData}  setIsApplyRfp={setIsApplyRfp}/>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default VendorPanal;
