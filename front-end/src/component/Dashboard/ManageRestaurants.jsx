import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Paper';




const columns = [
  { field: 'id', headerName: 'Restaurant ID', width: 200 },
  { field: 'RestaurantName', headerName: 'Restaurant Name', width: 500 },
  { field: 'City', headerName: 'City', width: 150 },
  {
    field: 'OwnerName',
    headerName: 'Owner Name',
    width: 300,
  },
  {
    field: 'ContactNumber',
    headerName: 'Contact Number',
    type: 'mobilenumber',
    width: 150,
  },
];

const rows = [
  { id: 1, RestaurantName: 'Maaran parotta kadai', City: 'Tirunelveli', OwnerName: 'Maaran', ContactNumber: 9874563210 },
  { id: 2, RestaurantName: 'A1 parotta stall', City: 'Tirunelveli', OwnerName: 'Riyaaz', ContactNumber: 9563147852 },
  { id: 3, RestaurantName: 'Vairamaaligai', City: 'Tirunelveli', OwnerName: 'Vairam', ContactNumber: 9445678901 },
  { id: 4, RestaurantName: 'Stark', City: 'Arya', OwnerName: 'Aryan', ContactNumber: 9876543210 },
  { id: 5, RestaurantName: 'Targaryen', City: 'Daenerys', OwnerName: 'Daenerys', ContactNumber: 9964237845 },
  { id: 6, RestaurantName: 'Melisandre', City: 'King’s Landing', OwnerName: 'Melisandre', ContactNumber: 9856321470 },
  { id: 7, RestaurantName: 'Clifford', City: 'Ferrara', OwnerName: 'Clifford', ContactNumber: 9345678901 },
  { id: 8, RestaurantName: 'Frances', City: 'Rossini', OwnerName: 'Francesca', ContactNumber: 9012345678 },
  { id: 9, RestaurantName: 'Roxie', City: 'Harvey', OwnerName: 'Roxanne', ContactNumber: 9123456789 }
];


const paginationModel = { page: 0, pageSize: 5 };

const DataTable = () => {
  return (

    <>
      <div className="addRestaurantDiv" style={{
        marginTop: "2%",
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

      }}>
        <div style={{ marginLeft: "5%" }}> <h2>Restaurants</h2> </div>
        <div style={{ marginRight: "5%" }}>
          <button
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
            style={{ backgroundColor: "#0d6efd", color: "white", borderColor: "#0d6efd" }}
          >
            Add Restaurant
          </button>
          {/* <Button variant="contained" id="addResBtn">Add Restaurant</Button> */}
        </div>
      </div>
      {/* Add Restaurant Modal */}
      <div
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          {/* Centered and Large Modal */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Restaurant
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form>
                <div className="row">
                  {/* First Row - Two Inputs */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="resName" className="form-label">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="resName"
                      placeholder="Enter Restaurant Name"
                      id="resName"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">
                      Categories
                    </label>
                    <br />

                    <div className="col-md-6 mb-3">
                      <input class="form-check-input" type="checkbox" value="" id="veg" required />
                      <label class="form-check-label" for="veg">
                        &nbsp;&nbsp;Veg
                      </label>

                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                      <input class="form-check-input" type="checkbox" value="" id="nonVeg" />
                      <label class="form-check-label" for="nonVeg">
                        &nbsp;&nbsp;Non-Veg
                      </label>
                    </div>
                  </div>


                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Enter Restaurant Address"
                      id="address"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="Enter Restaurant City"
                      id="city"
                      required
                    />
                  </div>


                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        placeholder="Enter pincode"
                        id="pincode"
                        required
                      />
                    </div>


                    {/* <div className="row"> */}
                    {/* Second Row - Two More Inputs */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="ownerName" className="form-label">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="ownerName"
                        placeholder="Enter Owner Name"
                        id="ownerName"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="contact" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="phonenumber"
                        className="form-control"
                        name="contact"
                        placeholder="Enter Contact Number"
                        id="contact"
                        minLength="10"
                        maxLength="10"
                        required
                      />
                    </div>


                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email ID"
                        id="email"
                      />
                    </div>



                    <div className="btnContainer" 
                    style={{
                      display:"flex" ,
                      justifyContent:"space-between",
                    }}
                    >

                      <div classname="col-md-6 mb-3">
                        <button class="btn btn-light" style={{ backgroundColor: "#D84040" ,color:"white", marginLeft:"20px" ,width:"85px"}}>
                          Clear
                        </button>
                      </div>
                      <div classname="col-md-6 mb-3">
                        <button class="btn btn-dark" style={{ backgroundColor: "#0d6efd" ,color:"white", marginRight  :"20px" ,width:"85px" ,borderColor:"#0d6efd"}}>
                          Add
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Box sx={{
        width: "90vw",
        marginTop: "4%",
        margin: "50px auto ",
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center"
      }}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid

            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
}
export default DataTable;
