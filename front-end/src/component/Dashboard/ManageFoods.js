import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

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
  });

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  const clearForm = () => {
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
  };

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
        clearForm();
        setShowModal(false);
        fetchRestaurants();
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

  const handleRowClick = (params) => {
    setSelectedRestaurant(params.row);
    setShowViewModal(true);
  };

  const handleEdit = async (restaurant) => {
    setFormData({
      restaurantName: restaurant.restaurantName,
      categories: Array.isArray(restaurant.categories)
        ? restaurant.categories
        : [restaurant.categories],
      address: restaurant.address || '',
      city: restaurant.city,
      pincode: restaurant.pincode,
      contactNumber: restaurant.contactNumber,
      ownerName: restaurant.ownerName,
      email: restaurant.email,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    try {
      const response = await axios.post("http://localhost:5000/updateRestaurant", formData);
      if (response.data.success) {
        Swal.fire({
          title: "Updated Successfully!",
          icon: "success",
          confirmButtonText: "Okay"
        });
        clearForm();
        setShowEditModal(false);
        fetchRestaurants();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Update",
          text: response.data.message || "Error while updating restaurant",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setShowEditModal(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getRestaurants");
      if (response.data.success) {
        const dataWithId = response.data.restaurants.map((item, index) => ({
          id: index + 1,
          ...item
        }));
        setRows(dataWithId);
        setFilteredRows(dataWithId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Fetch",
          text: response.data.message || "Error while fetching restaurants",
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

  const deleteRestaurant = async (email) => {
    try {
      const res = await axios.delete(`http://localhost:5000/deleteRestaurant/${email}`);
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Restaurant deleted successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.data.message || 'Failed to delete restaurant',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Error',
      });
    } finally {
      fetchRestaurants();
      setShowEditModal(false);
    }
  };

  const confirmDelete = (email) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this restaurant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRestaurant(email);
      }
    });
  };

  // Apply filters whenever search term or filters change
  useEffect(() => {
    let result = rows;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(row => 
        row.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply city filter
    if (cityFilter !== 'All') {
      result = result.filter(row => row.city === cityFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'All') {
      result = result.filter(row => 
        Array.isArray(row.categories) 
          ? row.categories.includes(categoryFilter)
          : row.categories === categoryFilter
      );
    }
    
    setFilteredRows(result);
  }, [searchTerm, cityFilter, categoryFilter, rows]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const goBackToAdminDashboard = () => {
    navigate('/Dashboard/AdminDashboard');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 85 },
    { field: 'restaurantName', headerName: 'Restaurant Name', width: 200 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'pincode', headerName: 'Pincode', width: 100 },
    { field: 'contactNumber', headerName: 'Contact', width: 150 },
    { field: 'ownerName', headerName: 'Owner', width: 180 },
    { field: 'email', headerName: 'Email', width: 230 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(params.row);
            }}
          >
            <i className="bi bi-pencil-fill me-1"></i> Edit
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(params.row.email);
            }}
          >
            <i className="bi bi-trash-fill me-1"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  // Get unique cities for filter dropdown
  const uniqueCities = [...new Set(rows.map(row => row.city))].filter(Boolean);

  return (
    <>
      <Box sx={{ background: '#f1f3f6', minHeight: '100vh', padding: '50px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <button
            className="btn btn-light border"
            onClick={goBackToAdminDashboard}
            style={{ fontWeight: '500', borderRadius: '8px' }}
          >
            🔙 Back
          </button>
          <h3 className="fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            🍽️ Restaurants
          </h3>
          <button
            className="btn"
            style={{
              backgroundColor: '#0077b6',
              color: 'white',
              padding: '8px 20px',
              fontWeight: '500',
              borderRadius: '8px'
            }}
            onClick={() => {
              clearForm();
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-2"></i> Add Restaurant
          </button>
        </div>

        {/* Search and Filter Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Search by Name or Owner"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="bi bi-search"></i>
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
          
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>City</InputLabel>
            <Select
              value={cityFilter}
              label="City"
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <MenuItem value="All">All Cities</MenuItem>
              {uniqueCities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Veg">Veg</MenuItem>
              <MenuItem value="Non-Veg">Non-Veg</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Paper elevation={4} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={handleRowClick}
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

      {/* Modal for Add Restaurant */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Restaurant</h5>
                  <button type="button" className="btn-close" onClick={() => {
                    clearForm();
                    setShowModal(false);
                  }}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Restaurant Name</label>
                      <input type="text" name="restaurantName" className="form-control" value={formData.restaurantName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Categories</label><br />
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" value="Veg" checked={formData.categories.includes("Veg")} onChange={handleCategoryChange} />
                        <label className="form-check-label">Veg</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" value="Non-Veg" checked={formData.categories.includes("Non-Veg")} onChange={handleCategoryChange} />
                        <label className="form-check-label">Non-Veg</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea name="address" className="form-control" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">City</label>
                      <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Pincode</label>
                      <input type="text" name="pincode" minLength={6} maxLength={6} className="form-control" value={formData.pincode} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Contact Number</label>
                      <input type="text" name="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleChange} minLength={10} maxLength={10} required />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Owner Name</label>
                      <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    clearForm();
                    setShowModal(false);
                  }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Restaurant</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Edit Restaurant */}
      {showEditModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Restaurant</h5>
                  <button type="button" className="btn-close" onClick={() => {
                    clearForm();
                    setShowEditModal(false);
                  }}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Restaurant Name</label>
                      <input type="text" name="restaurantName" className="form-control" value={formData.restaurantName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Categories</label><br />
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" value="Veg" checked={formData.categories.includes("Veg")} onChange={handleCategoryChange} />
                        <label className="form-check-label">Veg</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" value="Non-Veg" checked={formData.categories.includes("Non-Veg")} onChange={handleCategoryChange} />
                        <label className="form-check-label">Non-Veg</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea name="address" className="form-control" value={formData.address} onChange={handleChange} required />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">City</label>
                      <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Pincode</label>
                      <input type="text" name="pincode" minLength={6} maxLength={6} className="form-control" value={formData.pincode} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Contact Number</label>
                      <input type="text" name="contactNumber" readOnly style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }} className="form-control" value={formData.contactNumber} onChange={handleChange} minLength={10} maxLength={10} required />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Owner Name</label>
                      <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" readOnly style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }} className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    clearForm();
                    setShowEditModal(false);
                  }}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Restaurant Details */}
      {showViewModal && selectedRestaurant && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Restaurant Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Restaurant Name</label>
                    <p>{selectedRestaurant.restaurantName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Categories</label>
                    <p>
                      {Array.isArray(selectedRestaurant.categories) 
                        ? selectedRestaurant.categories.join(', ')
                        : selectedRestaurant.categories || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <p>{selectedRestaurant.address || 'N/A'}</p>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">City</label>
                    <p>{selectedRestaurant.city || 'N/A'}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Pincode</label>
                    <p>{selectedRestaurant.pincode || 'N/A'}</p>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Contact Number</label>
                    <p>{selectedRestaurant.contactNumber || 'N/A'}</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Owner Name</label>
                    <p>{selectedRestaurant.ownerName || 'N/A'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Email</label>
                    <p>{selectedRestaurant.email || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(selectedRestaurant);
                  }}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;