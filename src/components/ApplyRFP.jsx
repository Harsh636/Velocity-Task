import React, { useContext, useState } from "react";
import { UserContext } from "../Context/Context";

const ApplyRFP = ({ isApplyRfp, handleCancel, setIsApplyRfp }) => {
  const { user } = useContext(UserContext);

  // Form state
  const [formData, setFormData] = useState({
    vendor_price: "",
    itemDescription: "",
    quantity: "",
    total_cost: "",
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://rfpdemo.velsof.com/api/rfp/apply/${isApplyRfp}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_price: formData.vendor_price,
            total_cost: formData.total_cost,
            quantity: formData.quantity,
            description: formData.itemDescription,
            rfp_status: "pending",
          }),
        }
      );

      const result = await response.json();
      if (result.response === 'success') {
        alert("Applied successfully!");
        setIsApplyRfp(null);
      } else {
        alert(result.errors || "Something went wrong.");
        setIsApplyRfp(null);
      }
    } catch (error) {
      console.error("Error applying RFP:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Apply for RFP</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-10 form-group">
              <label>Vendor Price*</label>
              <input
                type="number"
                name="vendor_price"
                className="form-control"
                value={formData.vendor_price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-10 form-group">
              <label>Item Description*</label>
              <input
                type="text"
                name="itemDescription"
                className="form-control"
                value={formData.itemDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Quantity*</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Total Cost*</label>
              <input
                type="number"
                name="total_cost"
                className="form-control"
                value={formData.total_cost}
                onChange={handleInputChange}
                required
              />
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
      </div>
    </div>
  );
};

export default ApplyRFP;
