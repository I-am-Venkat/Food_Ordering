import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { useState } from "react";
import axios from 'axios';

const DataTable = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    categories: [],
    address: '',
    city: '',
    pincode: '',
    contactNumber: '',
    ownerName: '',
    email: '',


  }
  );

  const handleEdit = (restaurant) => {
    setFormData({
      restaurantName: restaurant.restaurantName,
      categories: restaurant.categories,
      address: restaurant.address || '',
      city: restaurant.city,
      pincode: restaurant.pincode,
      contactNumber: restaurant.contactNumber,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
    });
    setShowModal(true);
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'restaurantName', headerName: 'Restaurant Name', width: 200 },
    { field: 'categories', headerName: 'Categories', width: 150 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'pincode', headerName: 'Pincode', width: 100 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
    { field: 'ownerName', headerName: 'Owner Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleEdit(params.row)}
        >
          <i className="bi bi-pencil-fill me-1"></i> Edit
        </button>
      ),
    }
  ];



  const rows = [
    { id: 1, restaurantName: 'Saravana Bhavan', categories: 'Veg', city: 'Chennai', pincode: 600001, contactNumber: 9876543210, ownerName: 'Ravi Kumar', email: 'ravi@example.com' },
    { id: 2, restaurantName: 'Barbeque Nation', categories: 'Non-Veg', city: 'Coimbatore', pincode: 641001, contactNumber: 9876543211, ownerName: 'Priya Sharma', email: 'priya@example.com' },
    { id: 3, restaurantName: 'A2B', categories: 'Veg', city: 'Salem', pincode: 636007, contactNumber: 9876543212, ownerName: 'Arun Babu', email: 'arun@example.com' },
    { id: 4, restaurantName: 'Thalappakatti', categories: 'Non-Veg', city: 'Erode', pincode: 638001, contactNumber: 9876543213, ownerName: 'Deepa Rani', email: 'deepa@example.com' },
  ];



  const [showModal, setShowModal] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
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
      <Box sx={{ background: '#f1f3f6', minHeight: '100vh', padding: '30px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <h3 className="fw-bold" style={{ color: '#343a40', fontFamily: 'Poppins, sans-serif' }}>
            🍽️ Restaurants
          </h3>
          <button
            className="btn"
            style={{
              backgroundColor: '#0077b6',
              color: 'white',
              padding: '8px 20px',
              fontWeight: '500',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
            }}
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Restaurant
          </button>
        </div>

        <Paper elevation={4} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#0077b6',
                color: 'black',
                fontSize: '1rem'
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f1f1f1',
              },
              fontFamily: 'Poppins, sans-serif'
            }}
            style={{ height: 420 }}
          />
        </Paper>
      </Box>

      {/* Keep your original modal unchanged */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header text-black">
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
                        minLength={10}
                        maxLength={10}
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
                <div className="modal-footer bg-light">
                  <button
                    style={{ marginRight:'520px' }}
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setFormData({
                      restaurantName: '',
                      categories: [],
                      address: '',
                      city: '',
                      pincode: '',
                      contactNumber: '',
                      ownerName: '',
                      email: ''
                    })}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
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
