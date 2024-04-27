import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { usePagination } from '@mui/material/Pagination';
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

  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    getRows: () => rows,
  }));

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
    },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'ram', headerName: 'RAM', flex: 1 },
    { field: 'disk', headerName: 'Disk', flex: 1 },
    { field: 'tags', headerName: 'Tags', flex: 1 },
  ];

  const fetchTotalCount = () => {
   
    setTimeout(() => {
      setTotalCount(1000); 
    }, 1000);
  };
  

  const fetchData = (newPage) => {
    setLoading(true);
    
    setTimeout(() => {
      const newRows = Array.from({length: 100}, (_, i) => ({
        id: newPage * 100 + i,
        ipAddresses: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        status: Math.random() > 0.5 ? 'Active' : 'Inactive',
        state: Math.random() > 0.5 ? 'Running' : 'Stopped',
        ram: `${Math.floor(Math.random() * 16) + 4}GB`,
        disk: `${Math.floor(Math.random() * 500) + 500}GB`,
        tags: ['tag1', 'tag2', 'tag3'].filter(() => Math.random() > 0.5),
      }));
      setRows(newRows);
     
      setTotalCount(1000);
      setLoading(false);
    }, 2000);
  };
  

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  React.useEffect(() => {
    fetchTotalCount();
  }, []);

  return (
   
    <div style={{ height: 600, width: 1300, border: '0.8px solid black', marginTop: 50, marginBottom: 50 }}>
  <DataGrid
  className="myDataGrid"
    rows={rows}
    columns={columns}
    rowCount={totalCount}
    loading={loading}
    onPageChange={(newPage) => setPage(newPage)}
  />
</div>
  
  
  );
});

export default DataTable;