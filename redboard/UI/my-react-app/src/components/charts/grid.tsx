import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import table_headers from  '../../common/commonConfig'



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

  const columns = table_headers.map((header: string) => ({
    field: header,
    headerName: header.charAt(0).toUpperCase() + header.slice(1),
    flex: 1,
    renderCell: (params) => (
      <div style={{ paddingLeft: 20 }}>
        {params.value}
      </div>
    ),
    renderHeader: (params) => (
      <strong style={{ fontSize: '15px' }}>{params.colDef.headerName}</strong>
    ),
  }));
  
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
