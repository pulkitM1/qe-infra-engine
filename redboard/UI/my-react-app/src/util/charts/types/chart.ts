import { BubbleDataPoint, Chart, ChartTypeRegistry, Point } from 'chart.js';

export type ChartGroupId = string;
export type ChartInstance = Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
export type BasicChartDataItem = {
  label: string;
  value: number;

};
export type ChartAxis = 'x' | 'y' | 'xy';
