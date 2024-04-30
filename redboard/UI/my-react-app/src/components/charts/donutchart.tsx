import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LABEL_RECT_COLOR, LABEL_RECT_SIZE } from './charts.constants';
import { BasicChartDataItem } from '../../util/charts/types/chart';
import { mapBasicDataToChartDataset } from '../../util/charts/mappers';
import 'chartjs-plugin-datalabels';

type DoughnutChartProps = {
  data: BasicChartDataItem[];
  title: string; 
  animation?: boolean;
  legend?: boolean;
  maintainAspectRatio?: boolean;
};

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  title,
  animation = true,
  legend = true,
  maintainAspectRatio = true,
}) => {
  [ArcElement, Tooltip, Legend, ChartDataLabels].forEach((ChartPlugin) => {
    Chart.register(ChartPlugin);
  });

  const { labels, datasets } = mapBasicDataToChartDataset(data);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const customTooltip = (context) => {
    const { dataIndex } = context;
    if (dataIndex !== null) {
      const value = datasets[0].data[dataIndex];
      const label = labels[dataIndex];
      setHoveredValue(`${label}: ${value}`);
      return `Value: ${value}`;
    }
    return '';
  };
  
 
return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , width: '100%'}}>
    <div style={{ textAlign: 'center', fontSize: '32px',  fontWeight: 'normal', color: 'black', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>        
      {title}
    </div>
    <div style={{ width: '300px', height: '300px', marginBottom: '15px' }}>
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              data: datasets[0].data,
              backgroundColor: datasets[0].backgroundColor,
              borderColor: 'white', 
              borderWidth: 2, 
            },
          ],
        }}
        options={{
          maintainAspectRatio,
          animation: {
            duration: 3000, 
          },
          cutout: '75%',
          plugins: {
            legend: {
              display: legend,
              position: 'top',
              align: 'start',
              labels: {
                boxHeight: LABEL_RECT_SIZE,
                boxWidth: LABEL_RECT_SIZE,
                color: LABEL_RECT_COLOR,
              },
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
    <div style={{ fontSize: '15px', color: hoveredColor || 'black' , marginBottom: '10px' }}>
      {hoveredValue && <span style={{ fontWeight: 'bold' }}>{hoveredValue}</span>}
    </div>
  </div>
);
};
