import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageFoods = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const clearForm = () => {
    setFormData({
      foodName: '',
      description: '',
      price: '',
      category: '',
      imageUrl: ''
    });
  };

  const handleEdit = (food) => {
    setFormData({
      foodName: food.foodName,
      description: food.description,
      price: food.price,
      category: food.category,
      imageUrl: food.imageUrl
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addFood", formData);
      if (response.data.success) {
        Swal.fire("Food Item Added!", "", "success");
        clearForm();
        setShowModal(false);
      } else {
        Swal.fire("Failed to Add", response.data.message || "Error occurred", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
    }
  };

  const goBack = () => {
    navigate('/Dashboard/AdminDashboard');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'foodName', headerName: 'Food Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'imageUrl', headerName: 'Image URL', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(params.row)}>
          <i className="bi bi-pencil-fill me-1"></i> Edit
        </button>
      )
    }
  ];

  const rows = [
    { id: 1, foodName: 'Paneer Butter Masala', description: 'Creamy tomato-based curry', price: 180, category: 'Veg', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, foodName: 'Chicken Biryani', description: 'Spicy dum biryani', price: 220, category: 'Non-Veg', imageUrl: 'https://via.placeholder.com/150' }
  ];

  return (
    <>
      <Box sx={{ background: '#f1f3f6', minHeight: '100vh', padding: '50px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <button className="btn btn-light border" onClick={goBack}>
            <span role="img" aria-label="back" style={{ fontSize: '1.4rem' }}>🔙</span>
          </button>
          <h3 className="fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>🍛 Manage Foods</h3>
          <button className="btn btn-primary" onClick={() => { clearForm(); setShowModal(true); }}>
            <i className="bi bi-plus-circle me-2"></i> Add Food
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

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Add Food Item</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Food Name</label>
                      <input type="text" className="form-control" name="foodName" value={formData.foodName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Image URL</label>
                      <input type="text" className="form-control" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-outline-danger" onClick={clearForm}>Clear</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageFoods;
