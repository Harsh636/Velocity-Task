import React, { useContext, useState } from "react";
import { UserContext } from "../Context/Context";
import "./CreateRfp.css";
const RFPForm = ({ vendors = [], setAddRfp }) => {
  const { user, category } = useContext(UserContext);
  const fallbackCategories = ["Electronics", "Office Supplies", "Furniture"];
  const categoryOptions =
    category.length > 0
      ? category
      : fallbackCategories.map((name, index) => ({
          id: index.toString(),
          name,
        }));

  const [step, setStep] = useState(1); // Step 1: Select Category, Step 2: RFP Form
  const [showPopUp, setShowPopUp] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const[gotError, setGotError]= useState("");
  const [rfpData, setRfpData] = useState({
    itemName: "",
    itemDescription: "",
    quantity: "",
    lastDate: "",
    minPrice: "",
    maxPrice: "",
    vendors: [],
    category: "",
    categoryId: "",
    rfpNo: "",
  });

  const handleShowPopUp = (msg) => {
    setShowPopUp(msg);
    setTimeout(() => setFadeOut(true), 1000);
    setTimeout(() => {
      setShowPopUp("");
      setFadeOut(false);
      setGotError("");
    }, 2000);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!rfpData.categoryId) {
      alert("Please select a category.");
      return;
    }
    setStep(2);
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categoryOptions.find(
      (cat) => String(cat.id) === selectedId
    );

    setRfpData({
      ...rfpData,
      categoryId: selectedId,
      category: selectedCategory ? selectedCategory.name : "",
    });
  };

  const handleInputChange = (e) => {
    setRfpData({ ...rfpData, [e.target.name]: e.target.value });
  };

  const handleVendorChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRfpData({ ...rfpData, vendors: selected });
  };

  const handleRfpSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting RFP form...");

    if (parseFloat(rfpData.minPrice) >= parseFloat(rfpData.maxPrice)) {
      alert("Minimum price should be less than maximum price.");
      return;
    }

    const requiredFields = [
      "itemName",
      "itemDescription",
      "quantity",
      "lastDate",
      "minPrice",
      "maxPrice",
      "vendors",
      "category",
      "rfpNo",
    ];

    const hasMissing = requiredFields.some((field) => {
      const value = rfpData[field];
      return Array.isArray(value) ? value.length === 0 : !value;
    });

    if (hasMissing) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = user.token;
    const requestData = {
      item_name: rfpData.itemName,
      rfp_no: rfpData.rfpNo,
      quantity: parseInt(rfpData.quantity),
      last_date: rfpData.lastDate,
      minimum_price: parseFloat(rfpData.minPrice),
      maximum_price: parseFloat(rfpData.maxPrice),
      categories: rfpData.categoryId,
      vendors: rfpData.vendors.join(","),
      item_description: rfpData.itemDescription,
    };

    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/createrfp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("RFP API Result:", result);

      if (response.ok && result.response === "success") {
        // popup logic here
        handleShowPopUp("success");

        setTimeout(() => {
          setAddRfp(false);
        }, 2000);
      } else {
        handleShowPopUp("failed");
       
        setGotError(result.errors);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while submitting the RFP.");
    }
  };
  console.log(gotError);
  const handleCancel = () => {
    setAddRfp(false);
  };

  return (
    <>
      {showPopUp !== "" && (
        <div className="popup-container ">
          <div
            style={{
              backgroundColor: showPopUp === "success" ? "#D4EDDA" : "#F8D7DA",
              color: showPopUp === "success" ? "#155724" : "#721C24",
            }}
            className={`popup-content  ${fadeOut ? "fade-out" : ""}`}
          >
            <p>{gotError===""?`RFP ${rfpData.rfpNo} Added Successfully!`: gotError}</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {step === 1 && (
            <>
              <h4 className="card-title mb-4">Select Category</h4>
              <form onSubmit={handleCategorySubmit}>
                <div className="form-group">
                  <label>
                    Categories <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={rfpData.categoryId}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">-- Select a category --</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-primary mr-2">
                    Next
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h4 className="card-title mb-4">Create RFP</h4>
              <form onSubmit={handleRfpSubmit}>
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>Item Name *</label>
                    <input
                      type="text"
                      name="itemName"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Item Description *</label>
                    <input
                      type="text"
                      name="itemDescription"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>RFP No *</label>
                    <input
                      type="text"
                      name="rfpNo"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Last Date *</label>
                    <input
                      type="date"
                      name="lastDate"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Minimum Price *</label>
                    <input
                      type="number"
                      name="minPrice"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Maximum Price *</label>
                    <input
                      type="number"
                      name="maxPrice"
                      className="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 form-group">
                    <label>Vendors *</label>
                    <select
                      multiple
                      className="form-control"
                      onChange={handleVendorChange}
                      required
                    >
                      {vendors
                        .filter(
                          (vendor) =>
                            String(vendor.categories) ===
                            String(rfpData.categoryId)
                        )
                        .map((vendor) => (
                          <option key={vendor.user_id} value={vendor.user_id}>
                            {vendor.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RFPForm;
