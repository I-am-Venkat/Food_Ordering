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

const FoodDataTable = () => {
    const [formData, setFormData] = useState({
        foodId: '',
        name: '',
        description: '',
        price: '',
        category: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    const clearForm = () => {
        setFormData({
            foodId: '',
            name: '',
            description: '',
            price: '',
            category: '',
        });
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
                Swal.fire({
                    title: "Food Added!",
                    icon: "success",
                    confirmButtonText: "Okay"
                });
                clearForm();
                setShowModal(false);
                fetchFoods();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Add Food",
                    text: response.data.message || "Error while adding Food",
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

    const handleEdit = async (food) => {
        setFormData({
            foodId: food.foodId,
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
        });
        setShowEditModal(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(
                `http://localhost:5000/updateFood/${formData.foodId}`,
                {
                    name: formData.name,
                    description: formData.description,
                    price: formData.price,
                    category: formData.category
                }
            );

            if (response.data.success) {
                Swal.fire("Success!", "Food updated successfully", "success");
                setShowEditModal(false);
                fetchFoods();
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Update failed", "error");
        }
    };

    const fetchFoods = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getFoods");
            if (response.data.success) {
                const dataWithId = response.data.foods.map((item, index) => ({
                    id: index + 1,
                    ...item
                }));
                setRows(dataWithId);
                setFilteredRows(dataWithId); // Initialize filtered rows with all data
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Fetch",
                    text: response.data.message || "Error while fetching foods",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Something went wrong.",
            });
        }
    };

    const deleteFood = async (foodId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/deleteFood/${foodId}`);
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Food deleted successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.data.message || 'Failed to delete Food',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error',
            });
        } finally {
            fetchFoods();
            setShowEditModal(false);
        }
    };

    const confirmDelete = (foodId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this food?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFood(foodId);
            }
        });
    };

    // Apply filters whenever search term or category changes
    useEffect(() => {
        let result = rows;
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(row => 
                row.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply category filter
        if (categoryFilter !== 'All') {
            result = result.filter(row => row.category === categoryFilter);
        }
        
        setFilteredRows(result);
    }, [searchTerm, categoryFilter, rows]);

    useEffect(() => {
        fetchFoods();
    }, []);

    const goBackToAdminDashboard = () => {
        navigate('/Dashboard/AdminDashboard');
    };

    const columns = [
        { field: 'foodId', headerName: 'Food ID', width: 100 },
        { field: 'name', headerName: 'Food Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 500 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'category', headerName: 'Category', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(params.row)}
                    >
                        <i className="bi bi-pencil-fill me-1"></i> Edit
                    </button>
                    <button
                        style={{ marginLeft: "10px" }}
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => confirmDelete(params.row.foodId)}
                    >
                        <i className="bi bi-trash-fill me-1"></i> Delete
                    </button>
                </div>
            ),
        },
    ];

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
                        🍽️ Foodzz
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
                        <i className="bi bi-plus-circle me-2"></i> Add Food
                    </button>
                </div>

                {/* Search and Filter Controls */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        label="Search by Name"
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
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryFilter}
                            label="Category"
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <MenuItem value="All">All Categories</MenuItem>
                            <MenuItem value="Veg">Veg</MenuItem>
                            <MenuItem value="Non Veg">Non Veg</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Paper elevation={4} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                    <DataGrid
                        rows={filteredRows}
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

            {/* Modal for Add Food */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Food</h5>
                                    <button type="button" className="btn-close" onClick={() => {
                                        clearForm();
                                        setShowModal(false);
                                    }}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Food name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Category</label>
                                            <select
                                                name="category"
                                                className="form-control"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- Select --</option>
                                                <option value="Veg">Veg</option>
                                                <option value="Non Veg">Non Veg</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                value={formData.price}
                                                onChange={handleChange}
                                                min="0"
                                                step="1"
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => {
                                        clearForm();
                                        setShowModal(false);
                                    }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Add Food</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Edit Food */}
            {showEditModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content shadow">
                            <form onSubmit={handleUpdate}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Food</h5>
                                    <button type="button" className="btn-close" onClick={() => {
                                        clearForm();
                                        setShowEditModal(false);
                                    }}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col-md-5">
                                            <label className="form-label">Food ID</label>
                                            <input
                                                type="text"
                                                name="foodId"
                                                className="form-control"
                                                value={formData.foodId}
                                                readOnly
                                                onChange={handleChange}
                                                required
                                                style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                                            />
                                        </div>

                                        <div className="col-md-5">
                                            <label className="form-label">Food name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label">Price</label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Category</label>
                                            <select
                                                name="category"
                                                className="form-control"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="Veg">Veg</option>
                                                <option value="Non Veg">Non Veg</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => {
                                        clearForm();
                                        setShowEditModal(false);
                                    }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FoodDataTable;