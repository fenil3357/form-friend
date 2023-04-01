import React,{useState} from 'react';

// import { FormControl,InputLabel,Select,MenuItem} from '@mui/material';
 
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const Forms = (props) => {
const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'groupname', headerName: 'Group Name', width: 160 },
  { field: 'date', headerName: 'Created', width: 150 },
  { field: 'members',headerName: 'Members', type: 'number', width: 120,},
  
  { field: 'Open', headerName: 'Open group', width: 150,sortable: false,renderCell: (params) => 
  <Link  className='openlink' to="/dashboard/group">Link</Link>, },
  //  <button onClick={() => props.choicelink(5)}>Link</button> },
];

const rows = [
  { id: 1, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 2, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 3, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 4, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 5, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 6, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 7, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 8, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 9, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 10, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 11, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 12, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  { id: 13, groupname: 'Snow',  date: '20-10-2022',  members: 35 },
  
   
];

  return (
    <>
        <div className='grp_list'>
          <div style={{ height: 625, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      // checkboxSelection
                    />
                  </div>
             </div>
         
    </>
  );
}

export default Forms;
