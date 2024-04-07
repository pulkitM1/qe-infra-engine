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
    { label: 'Category H', value: 15 },
    { label: 'Category I', value: 10 },
  ];

  const nodesData = [
    { label: 'Category N', value: 30 },
    { label: 'Category O', value: 30 },
  ];

  const anotherData = [
    { label: 'Category A', value: 80 },
    { label: 'Category B', value: 20 },
    { label: 'Category C', value: 10 },
  ];

  const yetAnotherData = [
    { label: 'Category E', value: 30 },
    { label: 'Category F', value: 30 },
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
        <FilterDropdown handleFilterChange={handleFilterChange} />
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
      <hr style={{ border: 'none', borderBottom: '2px solid #090909' }} />
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
  <DataTable />
</div>
      </div>
  );
}

export default App;