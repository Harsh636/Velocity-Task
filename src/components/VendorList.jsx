import React, { useContext } from "react";
import { UserContext } from "../Context/Context";

const VendorList = ({ vendors }) => {
  const { user } = useContext(UserContext);
  
  const handleApprove = async (vendorId) => {
    
    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/rfp/approvVendor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, 
        },
        body: JSON.stringify({
          user_id: parseInt(vendorId),
          status: "approved",
        }),
      });
  
      const result = await response.json();
      
      console.log(result);
      if (response.ok && result.response === "success") {
        alert("Vendor approved successfully.");
      } else {
        alert(result.errors || "Failed to approve vendor.");
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Vendors List</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Vendors</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="TableHeader row mb-3">
                <div className="col-lg-3">
                  <h4 className="card-title">Vendors</h4>
                </div>
              </div>

              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <table
                  className="table mb-0 listingData dt-responsive"
                  id="datatable"
                >
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>First name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.length > 0 ? (
                      vendors.map((vendor, index) => (
                        <tr key={vendor.id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{vendor.name.split(" ")[0]}</td>
                          <td>{vendor.name.split(" ")[1]}</td>
                          <td>{vendor.email}</td>
                          <td>{vendor.mobile}</td>
                          <td>
                            <span
                              className={`badge badge-pill ${
                                vendor.status === "Approved"
                                  ? "badge-success"
                                  : vendor.status === "Rejected"
                                  ? "badge-danger"
                                  : "badge-secondary"
                              }`}
                            >
                              {vendor.status}
                            </span>
                          </td>
                          <td>
                            {vendor.status === "Rejected" && (
                              <span
                                style={{ color: "green", cursor: "pointer" }}
                                onClick={() => handleApprove(vendor.user_id)}
                              >
                                Approve
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No vendors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row pt-3">
                <div className="col-sm-12 col-md-5">
                  <div className="dataTables_info">
                    Showing {vendors.length} entries
                  </div>
                </div>
                {/* Pagination UI can go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorList;
