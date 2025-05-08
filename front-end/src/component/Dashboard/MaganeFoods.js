import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodDataTable = () => {
    const [formData, setFormData] = useState({
        foodId: '',
        name: '',
        description: '',
        price: '',
        category: '',
        image: null, // Changed from imageUrl to handle File object
        imageUrl: '' // For displaying existing images
    });

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    const clearForm = () => {
        setFormData({
            foodId: '',
            name: '',
            description: '',
            price: '',
            category: '',
            image: null,
            imageUrl: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL for the image
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ 
                ...prev, 
                image: file,
                imageUrl: imageUrl 
            }));
        }
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
            image: null, // Reset image file when editing
            imageUrl: food.imageUrl // Keep existing image URL
        });
        setShowEditModal(true);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
    
        try {
            // For updates, we'll use a different approach since we might or might not update the image
            const updateData = new FormData();
            updateData.append('foodId', formData.foodId);
            updateData.append('name', formData.name);
            updateData.append('description', formData.description);
            updateData.append('price', formData.price);
            updateData.append('category', formData.category);
            
            if (formData.image) {
                updateData.append('image', formData.image);
            }
    
            const response = await axios.post("http://localhost:5000/updateFood", updateData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.data.success) {
                Swal.fire({
                    title: "Updated Successfully!",
                    icon: "success",
                    confirmButtonText: "Okay"
                });
                clearForm();
                setShowEditModal(false);
                fetchFoods();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Update",
                    text: response.data.message || "Error While Updating Food",
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

    const fetchFoods = async () => {
        try {
            const response = await axios.get("http://localhost:5000/getFoods");
            if (response.data.success) {
                const dataWithId = response.data.foods.map((item, index) => ({
                    id: index + 1,
                    ...item
                }));
                setRows(dataWithId);
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

    useEffect(() => {
        fetchFoods();
    }, []);

    const goBackToAdminDashboard = () => {
        navigate('/Dashboard/AdminDashboard');
    };

    const columns = [
        { field: 'foodId', headerName: 'Food ID', width: 100 },
        {
            field: 'imageUrl',
            headerName: 'Image',
            width: 120,
            renderCell: (params) => (
                params.value ? (
                    <img
                        src={params.value}
                        alt="food"
                        style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                ) : (
                    <div style={{ width: '100px', height: '60px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                        No Image
                    </div>
                )
            )
        },
        { field: 'name', headerName: 'Food Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'category', headerName: 'Category', width: 170 },
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
                                        <div className="col-md-6">
                                            <label className="form-label">Upload Food Image</label>
                                            <input
                                                type="file"
                                                name="image"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                required
                                            />
                                            {formData.imageUrl && (
                                                <img 
                                                    src={formData.imageUrl} 
                                                    alt="Preview" 
                                                    style={{ width: '100px', height: '60px', marginTop: '10px' }} 
                                                />
                                            )}
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
                                        <div className="col-md-4">
                                            <label className="form-label">Update Food Image</label>
                                            <input 
                                                type="file" 
                                                name="image" 
                                                className="form-control" 
                                                accept="image/*" 
                                                onChange={handleFileChange} 
                                            />
                                            {formData.imageUrl && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <p>Current Image:</p>
                                                    <img 
                                                        src={formData.imageUrl} 
                                                        alt="Current" 
                                                        style={{ width: '100px', height: '60px' }} 
                                                    />
                                                </div>
                                            )}
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
        </>
    );
};

export default FoodDataTable;