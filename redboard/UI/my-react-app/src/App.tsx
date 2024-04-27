import React, { useRef, useState, useEffect } from 'react';
import Header from './components/charts/header';
import { DoughnutChart } from './components/charts/donutchart';
import FilterDropdown from './components/filters/filter';
import remote from './assets/remote.webp'
import AppDrawer from './components/drawer/drawer';
import MobileNavigationButton from './components/navigation/mobileNavigationButton';
import DataTable from './components/charts/grid';
import executor from './assets/executor.webp'
import RunningTasksButton from './components/button/taskRunningButton';
import ExportButton from './components/button/button'; 
import { HashLoader} from 'react-spinners'; 

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
  const [isLoading, setIsLoading] = useState(true); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = ['#090909'];
  const [color, setColor] = useState(colors[0]);

  function fetchApiData(machineType, filters) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doughnutData1 = machineType === 'executors' ? executorsData : nodesData;
        const doughnutData2 = machineType === 'executors' ? anotherData : yetAnotherData;
  
        resolve({
          doughnutData1:  doughnutData1,
          doughnutData2:  doughnutData2,
        });
      }, 20000); 
    });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setColor(colors[(colors.indexOf(color) + 1) % colors.length]);
    }, 1000);
    return () => clearInterval(interval);
  }, [color, colors]);

  useEffect(() => {
    const machineType = isOn.toLowerCase(); 
  
    // Reset the chart data
    setChartData1(null);
    setChartData2(null);
  
    // Start loading new data
    setIsLoading(true);
  
    fetchApiData(machineType, selectedFilters)
      .then((data) => {
        setChartData1(data.doughnutData1);
        setChartData2(data.doughnutData2);
        setIsLoading(false); 
      });
  }, [selectedFilters, isOn]);

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawerOpen(open);
  };
  
  const handleToggle = () => {
    setIsOn(isOn === 'Executors' ? 'Remote' : 'Executors');
    setImage(image === remote ? executor : remote); 
    setIsLoading(true); 
  };
  
  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions);
    console.log(selectedOptions); 
  };
  const [chartData1, setChartData1] = useState(null); 
  const [chartData2, setChartData2] = useState(null); 
  const dataTableRef = useRef();

  const handleExport = () => {
    if (dataTableRef.current) {
      const rows = dataTableRef.current.getRows();
      console.log(rows);
    }
  };
  
  return (
    <div style={{ width: '100%' }}>
      <Header />
      <div className="switch-container">
        <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
        <div style={{ marginBottom: '20px' }}> 
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div> 
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
          <div style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      <DataTable />
    </div>
  </div>
);
}

export default App;