import React, { useState } from "react";

const RfpQuotes = ({ quotes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = quotes.length;
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = quotes.slice(startIndex, startIndex + itemsPerPage);
  

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">RFP Quotes</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">RFP Quotes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="TableHeader">
                <div className="row">
                  <div className="col-lg-3">
                    <h4 className="card-title">RFP Quotes</h4>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table
                  className="table mb-0 listingData dt-responsive"
                  id="datatable"
                >
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>RFP No.</th>
                      <th>Item Name</th>
                      <th>Vendor Id</th>
                      <th>Vendor Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((rfp, index) => (
                        <tr key={index}>
                          {" "}
                          {/* Assuming each RFP has a unique id */}
                          <th scope="row">{rfp.rfpNo}</th>
                          <td>{rfp.rfpTitle}</td>
                          <td>{rfp.rfpLastDate}</td>
                          <td>{rfp.minAmount}</td>
                          <td>{rfp.maxAmount}</td>
                          <td>{rfp.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No RFP data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row pt-3">
                <div className="col-sm-12 col-md-5">
                  <div
                    className="dataTables_info"
                    id="datatable_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 1 to 5 of {totalItems} entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7 dataTables_wrapper">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="datatable_paginate"
                  >
                    <ul className="pagination">
                      <li
                        className="paginate_button page-item previous disabled"
                        id="datatable_previous"
                      >
                        <a
                          href="#"
                          aria-controls="datatable"
                          data-dt-idx="0"
                          tabIndex="0"
                          className="page-link"
                        >
                          Previous
                        </a>
                      </li>
                      <li className="paginate_button page-item active">
                        <a
                          href="#"
                          aria-controls="datatable"
                          data-dt-idx="1"
                          tabIndex="0"
                          className="page-link"
                        >
                          1
                        </a>
                      </li>
                      <li
                        className="paginate_button page-item next disabled"
                        id="datatable_next"
                      >
                        <a
                          href="#"
                          aria-controls="datatable"
                          data-dt-idx="2"
                          tabIndex="0"
                          className="page-link"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RfpQuotes;
