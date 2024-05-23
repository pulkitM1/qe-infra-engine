import React, { useRef, useState, useEffect } from 'react';
import Header from './components/charts/header';
import { DoughnutChart } from './components/charts/donutchart';
import FilterDropdown from './components/filters/filter';
import { API_ENDPOINTS } from './api';
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


import './App.css'; 

function App() {
  const executorsData = [
    { label: 'Failed Install', value: 1900 },
    { label: 'Available', value: 1000 },
    { label: 'Reserved', value: 1500 },
    { label: 'Unavailable', value: 1000 },
    { label: 'Bad Health', value: 750 },
  ];

  const nodesData = [
    { label: 'Available', value: 200 },
    { label: 'Unavailable', value: 500 },
    { label: 'Bad Health', value: 250 },
  ];

  const anotherData = [
    { label: 'NTP Absent', value: 80 },
    { label: 'Disk Not Working', value: 20 },
    { label: '> 97% Ram Utilised', value: 10 },
  ];

  const yetAnotherData = [
    { label: 'Down for Repair', value: 30 },
    { label: 'Bad Health', value: 110 },
  ];
// eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = ['#090909'];
  const [color, setColor] = useState(colors[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOn, setIsOn] = useState('Executors'); 
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState([]);
  const [image, setImage] = useState(remote); 
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [isFiltersLoading, setIsFiltersLoading] = useState(false);
  

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

  function fetchApiData(machineType, filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doughnutData1 = machineType === 'executors' ? executorsData : nodesData;
        const doughnutData2 = machineType === 'executors' ? anotherData : yetAnotherData;
  
        resolve({
          doughnutData1:  doughnutData1,
          doughnutData2:  doughnutData2,
        });
      }, 8000); 
    });
  }

  const handleExport = () => {
    setIsDownloading(true);
    simulateApiCall(isOn.toLowerCase(), selectedFilters)
      .then((data) => {
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json';
        link.click();
        setIsDownloading(false);
      });
  };

  
  function fetchFilters(machineType) {
    setIsFiltersLoading(true);
    fetch(API_ENDPOINTS.fetchFilters, {
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
      console.log(data);
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
    fetchData(page, machineType, selectedFilters); 
  }, [page, isOn, selectedFilters]);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawerOpen(open);
  };

  const fetchData = (newPage, machineType, filters) => {
    setLoading(true);
    
    if (!filters || filters.length === 0) {
      filters = ['DefaultFilter1', 'DefaultFilter2'];
    }
  
    new Promise((resolve) => {
      setTimeout(() => {
        const newRows = Array.from({length: 100}, (_, i) => ({
          id: newPage * 100 + i,
          ipAddresses: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          status: machineType === 'executors' && filters.includes('Active') ? 'Active' : 'Inactive',
          state: filters.includes('Running') ? 'Running' : 'Stopped',
          ram: `${Math.floor(Math.random() * 16) + 4}GB`,
          disk: `${Math.floor(Math.random() * 500) + 500}GB`,
          tags: ['tag1', 'tag2', 'tag3'], 
        }));
  
        resolve({
          rows: newRows,
          totalCount: 1000, 
        });
      }, 9000);
    })
    .then(data => {
      setRows(data.rows);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  };
  
  const handleToggle = () => {
    setIsOn(isOn === 'Executors' ? 'Remote' : 'Executors');
    setImage(image === remote ? executor : remote); 
    setSelectedFilters([]); 
    setIsLoading(true); 
  };
  
  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
    console.log(selectedOptions); 
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
              <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
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
              <RunningTasksButton />
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
                        <DoughnutChart data={chartData1} title={'States'} />
                      </div>
                    </div>
                    <div className="chart-tile">
                      <div className="chart-container" style={{ width: '100%' }}>
                        <DoughnutChart data={chartData2} title={'Tags'} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="center-line"></div>
              <DataTable rows={rows} page={page} setPage={setPage} loading={loading} setLoading={setLoading} />
              </div>
          </div>
        } />
      </Routes>
    </Router>
  );
  
}
export default App;