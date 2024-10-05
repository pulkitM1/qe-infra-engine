import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


import { BasicChartDataItem } from '../../util/charts/types/chart';


import { mapBasicDataToChartDataset } from '../../util/charts/mappers';

// Importing plugins
import 'chartjs-plugin-datalabels';

// Defining the props for the DoughnutChart component
type DoughnutChartProps = {
  data: BasicChartDataItem[];
  title: string; 
  animation?: boolean;
  legend?: boolean;
  maintainAspectRatio?: boolean;
};

// DoughnutChart component definition
export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  title,
  animation = true,
  legend = true,
  maintainAspectRatio = true,
}) => {

  [ArcElement, Tooltip, Legend ].forEach((ChartPlugin) => {
    Chart.register(ChartPlugin);
  });

  // State variables for the component
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [visibleDatasets, setVisibleDatasets] = useState<number[]>(data.map((_, index) => index));
  const [strikeThrough, setStrikeThrough] = useState<number[]>([]);

  // Transforming the data for display
  const transformedData = data.map(item => {
    return {
      ...item,
      displayValue:   Math.log(item.value + 1) 
    };
  });

 
  const { labels, datasets } = mapBasicDataToChartDataset(transformedData);
  const displayData = transformedData.map(item => item.displayValue);


  const customTooltip = (context) => {
    const { dataIndex } = context;
    if (dataIndex !== null) {
      const value = data[dataIndex].value;
      const label = labels[dataIndex];
      setHoveredValue(`${label}: ${value}`);
      return `${label}: ${value}`;
    }
    return '';
  };

 
  const handleLegendClick = (index: number) => {
    setVisibleDatasets(prevState => {
      if (prevState.includes(index)) {
        return prevState.filter(i => i !== index);
      } else {
        return [...prevState, index];
      }
    });

    setStrikeThrough(prevState => {
      if (prevState.includes(index)) {
        return prevState.filter(i => i !== index);
      } else {
        return [...prevState, index];
      }
    });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ textAlign: 'center', fontSize: '22px', fontFamily: 'Arial', fontWeight: 'normal', color: 'black', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', marginTop: '13px' }}>
        {title}
      </div>
      <div style={{ width: '300px', height: '300px', marginBottom: '15px' }}>
        <Doughnut
          data={{
            labels,
            datasets: [
              {
                data: displayData.filter((_, index) => visibleDatasets.includes(index)),
                backgroundColor: datasets[0].backgroundColor.filter((_, index) => visibleDatasets.includes(index)),
                borderColor: 'white',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            animation: {
              duration: 3000,
            },
            cutout: '78%',
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                boxPadding: 8,
                backgroundColor: 'black',
                titleColor: 'white',
                bodyColor: 'white',
                callbacks: {
                  label: customTooltip,
                },
              },
              datalabels: {
                color: (context) => datasets[0].backgroundColor[context.dataIndex],
                display: (context) => context.active,
                align: 'center',
                anchor: 'center',
                formatter: (value, context) => `${labels[context.dataIndex]}\n${value}`,
              },
            },
          }}
        />
      </div>
      {legend && (
        <div
          className="scrollable-div" // Add the class name here
          style={{
            maxHeight: '70px',
            overflowY: 'scroll',
            marginBottom: '10px',
            marginLeft: '18px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {datasets[0].backgroundColor.map((color, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', marginRight: '10px', marginLeft: '10px' }}>
              <div style={{ width: '20px', height: '10px', backgroundColor: color, marginRight: '10px' }}></div>
              <div className="legend-text" style={{ textDecoration: strikeThrough.includes(index) ? 'line-through' : 'none', fontSize: '12px' }}>
                {labels[index]}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ fontSize: '15px', color: hoveredColor || 'black', marginBottom: '10px' }}>
        {hoveredValue && <span style={{ fontWeight: 'bold' }}>{hoveredValue}</span>}
      </div>
    </div>
  );
  }