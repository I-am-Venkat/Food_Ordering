import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Paper';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'restaurantName', headerName: 'Restaurant Name', width: 200 },
  { field: 'categories', headerName: 'Categories', width: 150 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'pincode', headerName: 'Pincode', width: 100 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
  { field: 'ownerName', headerName: 'Owner Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows = [
  { id: 1, restaurantName: 'Saravana Bhavan', categories: 'Veg', city: 'Chennai', pincode: 600001, contactNumber: 9876543210, ownerName: 'Ravi Kumar', email: 'ravi@example.com' },
  { id: 2, restaurantName: 'Barbeque Nation', categories: 'Non-Veg', city: 'Coimbatore', pincode: 641001, contactNumber: 9876543211, ownerName: 'Priya Sharma', email: 'priya@example.com' },
  { id: 3, restaurantName: 'A2B', categories: 'Veg', city: 'Salem', pincode: 636007, contactNumber: 9876543212, ownerName: 'Arun Babu', email: 'arun@example.com' },
  { id: 4, restaurantName: 'Thalappakatti', categories: 'Non-Veg', city: 'Erode', pincode: 638001, contactNumber: 9876543213, ownerName: 'Deepa Rani', email: 'deepa@example.com' },
];

const DataTable = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    categories: [],
    address: '',
    city: '',
    pincode: '',
    contactNumber: '',
    ownerName: '',
    email: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({ ...prev, categories: [...prev.categories, value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.filter((cat) => cat !== value)
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/addRestaurants", formData);

      if (response.data.success) {
        Swal.fire({
          title: "Restaurant Added!",
          icon: "success",
          confirmButtonText: "Okay"
        });
        setFormData({
          restaurantName: '',
          categories: [],
          address: '',
          city: '',
          pincode: '',
          contactNumber: '',
          ownerName: '',
          email: ''
        });
        setShowModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add",
          text: response.data.message || "Error while adding restaurant",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <>
      <Box height={400} width="100%" p={2}>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3 px-4">
  <h2>Restaurants</h2>
  <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Restaurant</button>
</div>



        <Paper>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Paper>
      </Box>

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Restaurant</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Restaurant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Categories</label><br />
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Veg"
                          checked={formData.categories.includes('Veg')}
                          onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Veg</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Non-Veg"
                          checked={formData.categories.includes('Non-Veg')}
                          onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Non-Veg</label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Owner Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Add Restaurant</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;
