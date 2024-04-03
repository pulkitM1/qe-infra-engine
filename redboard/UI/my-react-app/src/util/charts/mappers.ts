import { BasicChartDataItem } from './types/chart';
import { getChartColor } from './colors';

export const mapBasicDataToChartDataset = (data: BasicChartDataItem[]) => {
  return data.reduce(
    (result, item, index) => {
      return {
        datasets: [
          {
            data: [...result.datasets[0].data, item.value],
            backgroundColor: [...result.datasets[0].backgroundColor, getChartColor(index)],
          },
        ],
        labels: [...result.labels, item.label],
      };
    },
    {
      datasets: [
        {
          data: [] as number[],
          backgroundColor: [] as string[],
        },
      ],
      labels: [] as string[],
    }
  );
};
