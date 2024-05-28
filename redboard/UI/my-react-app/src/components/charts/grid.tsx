/**
 * @file grid.tsx
 * @author Pulkit Matta
 * @description This file contains a DataGrid component for displaying data in a grid format.
 */

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import table_headers from  '../../common/commonConfig'

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

// Define the props for the DataTable component
type DataTableProps = {
  rows: any[];
  fetchData: (newPage: any, machineType: any, filters: any) => Promise<void>;
  loading: boolean;
  total_pages: any[];
  totalRows: number;
  setFilterModel: React.Dispatch<React.SetStateAction<any>>;
};

// Main DataTable component
const DataTable = React.forwardRef(({ rows, fetchData, loading, totalRows, setFilterModel }: DataTableProps) => {

  // Define columns based on table headers
  const columns = table_headers.map((header: string) => ({
    field: header,
    headerName: header.charAt(0).toUpperCase() + header.slice(1),
    flex: 1,
    renderCell: (params) => (
      <div style={{ paddingLeft: 20 }}>
        {Array.isArray(params.value) ? params.value.join(', ') : params.value}
      </div>
    ),
    renderHeader: (params) => (
      <strong style={{ fontSize: '15px' }}>{params.colDef.headerName}</strong>
    ),
  }));
  
  // Return the DataGrid component
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
            },
          },
        }}
        className="myDataGrid"
        rows={rows}
        columns={columns}
        loading={loading}
      />
    </div>
  );
});

export default DataTable;
