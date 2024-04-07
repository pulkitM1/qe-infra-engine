import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { 
    field: 'ipAddresses', 
    headerName: 'IP Addresses', 
    flex: 1, 
    renderHeader: (params) => (
      <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
        {params.colDef.headerName}
      </div>
    ),
    renderCell: (params) => (
      <div style={{ paddingLeft: '20px' }}>
        {params.value}
      </div>
    ),
    cellClassName: 'firstColumnCell', 
  },
  { field: 'status', headerName: 'Status', flex: 1 ,  renderHeader: (params) => (
    <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
      {params.colDef.headerName}
    </div>
  ),},
  { field: 'state', headerName: 'State', flex: 1 ,  renderHeader: (params) => (
    <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
      {params.colDef.headerName}
    </div>
  ),},
  { field: 'ram', headerName: 'RAM', flex: 1 ,  renderHeader: (params) => (
    <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
      {params.colDef.headerName}
    </div>
  ),},
  { field: 'disk', headerName: 'Disk', flex: 1 ,  renderHeader: (params) => (
    <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
      {params.colDef.headerName}
    </div>
  ),},
  { field: 'tags', headerName: 'Tags', flex: 1 ,  renderHeader: (params) => (
    <div style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
      {params.colDef.headerName}
    </div>
  ),},
];

const rows = Array.from({length: 200}, (_, id) => ({
  id,
  ipAddresses: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  state: Math.random() > 0.5 ? 'Running' : 'Stopped',
  ram: `${Math.floor(Math.random() * 16) + 4}GB`,
  disk: `${Math.floor(Math.random() * 500) + 500}GB`,
  tags: ['tag1', 'tag2', 'tag3'].filter(() => Math.random() > 0.5),
}));


const DataTable = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getRows: () => rows,
  }));

  return (
    <div className="data-table" style={{ height: '500px', marginTop: '85px' }}>
  <DataGrid 
  rows={rows} 
  columns={columns} 
  style={{
    border: '0.6px solid black', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add this line
    '& .MuiDataGridColumnsContainer': {
      backgroundColor: '#fafafa',
      fontWeight: 'bold', 
      borderBottom: '2px solid black', 
    },
    '& .MuiDataGridColumnSeparator': {
      backgroundColor: 'black', 
    },
    '& .MuiDataGridCell': {
      borderRight: '2px solid ',
      backgroundColor: 'black', 
    },
  }} 
/>
    </div>
  );
});

export default DataTable;