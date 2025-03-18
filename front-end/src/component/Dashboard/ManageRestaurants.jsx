import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'Restaurant ID', width: 150 },
  { field: 'RestaurantName', headerName: 'Restaurant Name', width: 200 },
  { field: 'City', headerName: 'City', width: 150 },
  {
    field: 'OwnerName',
    headerName: 'Owner Name',
    width: 150,
  },
  {
    field: 'ContactNumber',
    headerName: 'Contact Number',
    type:'mobilenumber',
    width: 150,
  },
];

const rows=[
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

export default function DataTable() {
  return (
    <Box>
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
  );
}
