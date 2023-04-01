import React,{useState} from 'react';

// import { FormControl,InputLabel,Select,MenuItem} from '@mui/material';
 
import { DataGrid } from '@mui/x-data-grid';


const Allforms= (props) => {
const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'formname', headerName: 'Forms Name', width: 160 },
  { field: 'startdate', headerName: 'Created', width: 150 },
  { field: 'deadline', headerName: 'Deadline', width: 150 },
  { field: 'groups',headerName: 'Group', type: 'string', width: 120,},
  { field: 'Open', headerName: 'Open form', width: 150,sortable: false,renderCell: (params) => 
  // <a className='openlink' href="/dashboard/grp">Link</a>, },
   <button onClick={() => props.choicelink()}>Link</button> },
];

const rows = [
  { id: 1, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 2, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'BE sem6, heckathaon',  members: 35 },
  { id: 3, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'BE Sem 4, heckathaon',  members: 35 },
  { id: 4, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'BE Sem 2',  members: 35 },
  { id: 5, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 6, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 7, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 8, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 9, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 10, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 11, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 12, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  { id: 13, formname: 'Snow',  startdate: '20-10-2022', deadline: '20-10-2022', groups:'heckathaon',  members: 35 },
  
   
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

export default Allforms;
