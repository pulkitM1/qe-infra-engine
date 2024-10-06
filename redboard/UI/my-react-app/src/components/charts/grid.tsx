import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { GridOverlay } from '@mui/x-data-grid'; // Make sure to import GridOverlay
import table_headers from '../../common/commonConfig';
import table_headers_slave from '../../common/commonConfigSlave';

// Custom loading overlay for the DataGrid
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

type DataTableProps = {
  rows: any[];
  fetchData: (newPage: any, machineType: any, filters: any) => Promise<void>;
  loading: boolean;
  totalRows: number;
  setFilterModel: React.Dispatch<React.SetStateAction<any>>;
  headers: any[];
};

const DataTable = React.forwardRef(({ rows, fetchData, loading, totalRows, setFilterModel, headers }: DataTableProps) => {
  // Define columns based on table headers
  const columns = headers.map((header: string) => ({
    field: header,
    headerName: header.charAt(0).toUpperCase() + header.slice(1),
    flex: 1,
    renderCell: (params) => (
      <div style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 10 }}> {/* Consistent padding for cells */}
        {Array.isArray(params.value) ? params.value.join(', ') : params.value}
      </div>
    ),
    renderHeader: (params) => (
      <strong style={{ fontSize: '15px', padding: '10px 30px 10px 20px' }}> {/* Adjust left padding here */}
        {params.colDef.headerName}
      </strong>
    ),
  }));

  return (
    <div style={{ height: 650, width: 1300, border: '0.9px solid black', marginTop: 45, marginBottom: 60 }}>
      <DataGrid
        onFilterModelChange={(newModel) => setFilterModel(newModel)}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        componentsProps={{
          columnHeader: {
            style: {
              fontWeight: 'bold',
              padding: '10px 30px', // Adjust padding for the header
            },
          },
        }}
        rows={rows}
        columns={columns}
        loading={loading}
        sx={{
          '& .MuiDataGrid-columnSeparator': {
            visibility: 'visible',
            backgroundColor: 'grey',
            width: '0.5px',
          },
          '& .MuiDataGrid-columnHeader': {
            borderBottom: '0.5px solid black',
          },
        }}
      />
    </div>
  );
});

export default DataTable;