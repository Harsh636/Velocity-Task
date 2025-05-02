import React, { useState,useContext } from "react";
import { UserContext } from "../Context/Context";

const Category = () => {
  const {category} = useContext(UserContext);
  const allCategory = category
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categoriesArray = Object.values(allCategory || {});
  const totalItems = categoriesArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categoriesArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Categories List</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a >Home</a>
                </li>
                <li className="breadcrumb-item active">Categories</li>
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
                    <h4 className="card-title">Categories</h4>
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
                      <th>S. No.</th>
                      <th>Category Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((category, index) => (
                        <tr key={category.id}>
                          <th scope="row">{startIndex + index + 1}</th>
                          <td>{category.name}</td>
                          <td>
                            <span
                              className={`badge badge-pill ${
                                category.status === "Active"
                                  ? "badge-success"
                                  : "badge-secondary"
                              }`}
                            >
                              {category.status}
                            </span>
                          </td>
                          <td className="">
                            <span
                              style={{
                                color:
                                  category.status === "Active"
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {category.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No categories available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="row pt-3">
                  <div className="col-sm-6">
                    <div className="dataTables_info">
                      Showing {startIndex + 1} to{" "}
                      {Math.min(startIndex + itemsPerPage, totalItems)} of{" "}
                      {totalItems} entries
                    </div>
                  </div>
                  <div className="col-sm-6 text-right">
                    <ul className="pagination justify-content-end mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button className="page-link" onClick={handlePrevious}>
                          Previous
                        </button>
                      </li>

                      {/* Only show max 5 page buttons */}
                      {(() => {
                        const pageNumbers = [];
                        let startPage = Math.max(1, currentPage - 2);
                        let endPage = Math.min(totalPages, startPage + 4);

                        if (endPage - startPage < 4) {
                          startPage = Math.max(1, endPage - 4);
                        }

                        for (let i = startPage; i <= endPage; i++) {
                          pageNumbers.push(
                            <li
                              key={i}
                              className={`page-item ${
                                currentPage === i ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(i)}
                              >
                                {i}
                              </button>
                            </li>
                          );
                        }

                        return pageNumbers;
                      })()}

                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button className="page-link" onClick={handleNext}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
