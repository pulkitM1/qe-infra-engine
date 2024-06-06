import React, { useRef, useState, useEffect } from 'react';
import Header from './components/charts/header';
import { DoughnutChart } from './components/charts/donutchart';
import FilterDropdown from './components/filters/filter';
import { API_ENDPOINTS } from './api';
import {API_ENDPOINTS_SLAVE} from './api';
import remote from './assets/remote.webp'
import AppDrawer from './components/drawer/drawer';
import MobileNavigationButton from './components/navigation/mobileNavigationButton';
import DataTable from './components/charts/grid';
import executor from './assets/executor.webp'
import RunningTasksButton from './components/button/taskRunningButton';
import ExportButton from './components/button/button'; 
import { HashLoader} from 'react-spinners'; 
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from './components/gamepage'; 
import table_headers from './common/commonConfig'
import table_headers_slave from './common/commonConfigSlave'



import './App.css'; 

function App() {
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = ['#090909'];
  const [color, setColor] = useState(colors[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOn, setIsOn] = useState('Executors'); 
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  const [totalPages, setTotalPages]  = useState([]);
  const [totalRows, setTotalRows]  = useState(0);
  const [image, setImage] = useState(remote); 
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(null);  
  const [taskIds, setTaskIds] = useState([]);
  const [headers, setHeaders] = useState(table_headers);

  function simulateApiCall(machineType, filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Machine_type: machineType,
          filters: filters,
        });
      }, 4000); 
    });
  }
  

  async function fetchApiData(machineType, filters = {}) {
    if (!filters || Object.keys(filters).length === 0) {
        filters = {};
    }

    console.log("apis!@W!@E@#")
    console.log(machineType)
    let apiEndpoint = API_ENDPOINTS;
    if (machineType === 'remote') {
        apiEndpoint = API_ENDPOINTS_SLAVE;
    }

    const response = await fetch(apiEndpoint.fetchApiData, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: filters,
        pivot: "state",
      }),
    });

    const response_tags = await fetch(apiEndpoint.fetchApiData, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: filters,
        pivot: "tags",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    const tag_data = await response_tags.json()
  
    const doughnutData1 = Object.entries(data).map(([label, value]) => ({ label, value }));
    const doughnutData2 = Object.entries(tag_data).map(([label, value]) => ({ label, value }));

    return {
      doughnutData1: doughnutData1,
      doughnutData2: doughnutData2,
    };
}


const handleExport = () => {
  setIsDownloading(true);
  const allRows = rows; 
  let filteredRows = allRows;

  if (filterModel) {
    filteredRows = allRows.filter(row => {
      return filterModel.items.every(filter => {
        if (filter.operator === 'equals') {
          return `${row[filter.field]}` === filter.value;
        } else if (filter.operator === 'contains') {
          return `${row[filter.field]}`.includes(filter.value);
        }
        return true;
      });
    });
  }
  
  const handleAddNode = async () => {
    const vmsData = {
      vms: vms.map(vm => ({
        poolId: vm.poolId,
        ipaddr: vm.ips,
        ssh_username: vm.username,
        ssh_password: vm.password,
        origin: vm.origin,
        vm_name: vm.vmName,
      })),
    };
  
    const response = await fetch('/tasks/add_nodes_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vmsData),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    console.log(data);
  };
  
  const csvContent = [table_headers.join(','), ...filteredRows.map(row => {
    return table_headers.map(header => {
      const cellValue = row[header];
      return cellValue !== null && cellValue !== undefined ? cellValue : '';
    }).join(',');
  })].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.csv';
  link.click();
  setIsDownloading(false);
};


  
function fetchFilters(machineType) {
  setIsFiltersLoading(true);

  let apiEndpoint = API_ENDPOINTS;
  if (machineType === 'remote') {
      apiEndpoint = API_ENDPOINTS_SLAVE;
  }

  fetch(apiEndpoint.fetchFilters, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const transformedFilters = Object.entries(data).map(([filter, subfilters]) => ({
      filter,
      subfilters,
    }));
    setFilters(transformedFilters);
    setIsFiltersLoading(false);
  })
  .catch(error => {
    console.error('Error fetching filters:', error);
    setIsFiltersLoading(false);
  });
}


  useEffect(() => {
    const machineType = isOn.toLowerCase(); 
    fetchFilters(machineType);
  }, [isOn]);

  useEffect(() => {
    const machineType = isOn.toLowerCase(); 
    fetchData(0,machineType,null); 
  }, [isOn]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(colors[(colors.indexOf(color) + 1) % colors.length]);
    }, 1000);
    return () => clearInterval(interval);
  }, [color, colors]);

  useEffect(() => {
    const machineType = isOn.toLowerCase(); 
    setChartData1(null);
    setChartData2(null);
    setIsLoading(true);
  
    fetchApiData(machineType, selectedFilters)
      .then((data) => {
        setChartData1(data.doughnutData1);
        setChartData2(data.doughnutData2);
        setIsLoading(false); 
      });
  }, [selectedFilters, isOn]);

  useEffect(() => {
    const machineType = isOn.toLowerCase();
    fetchData(0, machineType, selectedFilters); 
  }, [isOn, selectedFilters]);
  

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawerOpen(open);
  };

  const fetchData = async (newPage, machineType, filters) => {
    setLoading(true);
    
    if (!filters || Object.keys(filters).length === 0) {
      filters = {};
    }

    let apiEndpoint = API_ENDPOINTS;
    setHeaders(table_headers)
    let tableHeaders = table_headers;
    if (machineType === 'remote') {
        apiEndpoint = API_ENDPOINTS_SLAVE;
        setHeaders(table_headers_slave)
        tableHeaders = table_headers_slave;
    }

    const response = await fetch(apiEndpoint.fetchGridData, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: filters,
        fields: tableHeaders,
        "per_page": 10000,
        "page": newPage
      }),
    });

    console.log("heyy!!kerjnferjfne")
    console.log(response)
    console.log(tableHeaders)
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    const rowsWithIds = data.data.map((row, index) => ({ id: index, ...row }));

    setTotalPages(data.total_pages)
    setTotalRows(data.total_pages * 100)
    setRows(rowsWithIds);
    setLoading(false);
};

  
  const handleToggle = () => {
    setIsOn(isOn === 'Executors' ? 'Remote' : 'Executors');
    setImage(image === remote ? executor : remote); 
    setSelectedFilters([]); 
    setIsLoading(true); 
  };
  
  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };
  const [chartData1, setChartData1] = useState(null); 
  const [chartData2, setChartData2] = useState(null); 

  return (
    <Router>
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route path="/" element={
          <div style={{ width: '100%' }}>
            <Header />
            <div className="switch-container">
              <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} setTaskIds={setTaskIds} />
              <div style={{ marginBottom: '20px' }}> 
                {isFiltersLoading ? ( 
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginRight: '30px' }}>
                    <CircularProgress color="warning" size={20} />
                  </div>
                ) : (
                  <FilterDropdown onFilterChange={handleFilterChange} disabled={(isFiltersLoading || isLoading)} filters={filters} />
                )}
              </div> 
              <div className="separator"></div> 
              <img 
                src={image} 
                onClick={handleToggle} 
                alt="toggle" 
                className="switch-img" 
                title={isOn === 'Executors' ? 'Displaying Executors data. Click to toggle to Nodes data.' : 'Displaying Nodes data. Click to toggle to Executors data.'}
                style={{ pointerEvents: isFiltersLoading || isLoading ? 'none' : 'auto' }}
              />
              <div className="separator"></div> 
              <ExportButton onClick={handleExport} disabled={isFiltersLoading || isLoading || isDownloading}>
                {isDownloading ? <CircularProgress size={20} /> : 'Export'}
              </ExportButton> 
              <div className="separator"></div> 
              <RunningTasksButton taskIds={taskIds} />
              <div className="separator"></div> 
              <MobileNavigationButton  style={{ color: 'black', marginRight: '300px' }} toggleDrawer={toggleDrawer}   />
            </div>
            <hr style={{ border: 'none', borderBottom: '2px solid #090909', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} />
            <div style={{ textAlign: 'left', marginTop: '40px', marginLeft: '0px' }}>
              <a href="https://couchbase.com" target="_blank">
              </a>
            </div>
            <div className="container-parent" style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
              <div className="tile-container">
                {isLoading ? ( 
                  <div style={{ width: '300px', height: '370px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <HashLoader color={color} loading={isLoading} size={50} />
                  </div>
                ) : (
                  <>
                    <div className="chart-tile">
                      <div className="chart-container" style={{ width: '100%' }}>
                        <DoughnutChart data={chartData1} title={'STATES'} />
                      </div>
                    </div>
                    <div className="chart-tile">
                      <div className="chart-container" style={{ width: '100%' }}>
                        <DoughnutChart data={chartData2} title={'TAGS'} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="center-line"></div>
              <DataTable setFilterModel={setFilterModel} rows={rows} fetchData={fetchData} loading={loading} total_pages={totalPages} totalRows={totalRows}headers={headers}/>    </div>
          </div>
        } />
      </Routes>
    </Router>
  );
  
}
export default App;