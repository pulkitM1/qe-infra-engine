import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const DataTable = React.forwardRef(({ rows, page, setPage, loading }, ref) => {
  function BoldHeader(props: GridCellParams) {
    return (
      <strong>{props.value}</strong>
    );
  }

  const columns = [
    {
      field: 'ipAddresses',
      headerName: 'IP Addresses',
      flex: 1,
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    { 
      field: 'state', 
      headerName: 'State', 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    { 
      field: 'ram', 
      headerName: 'RAM', 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    { 
      field: 'disk', 
      headerName: 'Disk', 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    { 
      field: 'tags', 
      headerName: 'Tags', 
      flex: 1, 
      renderCell: (params) => (
        <div style={{ paddingLeft: 20 }}>
          {params.value}
        </div>
      ),
      renderHeader: (params) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
  ];
  
  return (
    <div style={{ height: 550, width: 1300, border: '0.9px solid black', marginTop: 45, marginBottom: 60 }}>
      <DataGrid
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        componentsProps={{
          columnHeader: {
            style: {
              fontWeight: 'bold', 
            },
          },
        }}
        className="myDataGrid"
        rows={rows}
        columns={columns}
        rowCount={rows.length}
        loading={loading}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
});

export default DataTable;
