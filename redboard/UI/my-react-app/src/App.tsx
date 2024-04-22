import React, { useRef, useState, useEffect } from 'react';
import Header from './components/charts/header';
import { DoughnutChart } from './components/charts/donutchart';
import FilterDropdown from './components/charts/filters/filter';
import remote from './assets/remote.webp'
import { saveAs } from 'file-saver';
import AppDrawer from './components/charts/drawer/drawer';
import MobileNavigationButton from './components/charts/navigation/mobileNavigationButton';
import DataTable from './components/charts/grid';
import executor from './assets/executor.webp'
import ExportButton from './components/charts/button/button'; 

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

  const [isOn, setIsOn] = useState('Executors'); 
  const [image, setImage] = useState(remote); 
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawerOpen(open);
  };
  
  const handleToggle = () => {
    setIsOn(isOn === 'Executors' ? 'Remote' : 'Executors');
    setImage(image === remote ? executor : remote); 
  };
  
  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
  };

  const [chartData1, setChartData1] = useState(executorsData); 
  const [chartData2, setChartData2] = useState(anotherData); 
  const dataTableRef = useRef();

  const handleExport = () => {
    if (dataTableRef.current) {
      const rows = dataTableRef.current.getRows();
      console.log(rows);
    }
  };
  
  useEffect(() => {
    const originalData1 = isOn === 'Executors' ? executorsData : nodesData;
    const originalData2 = isOn === 'Executors' ? anotherData : yetAnotherData;
    const filteredData1 = selectedFilters && selectedFilters.length > 0  ? originalData1.filter(data => selectedFilters.includes(data.label)) : originalData1;
    const filteredData2 = selectedFilters && selectedFilters.length > 0 ? originalData2.filter(data => selectedFilters.includes(data.label)) : originalData2;
    setChartData1(filteredData1);
    setChartData2(filteredData2);
  }, [selectedFilters, isOn]); 

  return (
    <div style={{ width: '100%' }}>
      <Header />
      <div className="switch-container">
        <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        <div style={{ marginBottom: '20px' }}> {/* Add this div */}
          <FilterDropdown handleFilterChange={handleFilterChange} />
        </div> {/* And close it here */}
        <div className="separator"></div> 
        <img 
          src={image} 
          onClick={handleToggle} 
          alt="toggle" 
          className="switch-img" 
          title={isOn === 'Executors' ? 'Displaying Executors data. Click to toggle to Nodes data.' : 'Displaying Nodes data. Click to toggle to Executors data.'}/>
        <div className="separator"></div> 
        <ExportButton onClick={handleExport} /> 
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
        </div>
        <div className="center-line"></div>
        <DataTable />
      </div>
    </div>
  );
}

export default App;