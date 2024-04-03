import { getCssProperty } from '../common';

export const CHART_COLORS_NUMBER = 9;

export const getColorOfGivenIndex = (index: number) => {
  if (index < 1 || index > CHART_COLORS_NUMBER) {
    throw new Error('Index overflow');
  }

  return getCssProperty(`--color-chart-${index}`);
};

/**
 * Util dedicated for generating distinct colors for charts.
 * @param chartIndex index of element in array, should be greater or equal 0
 */
export const getChartColor = (chartIndex: number) => {
  const shiftedIndex = chartIndex + 1; // for some reason svelte application starts with 2nd color

  const snappedIndex = Math.max(1, shiftedIndex % CHART_COLORS_NUMBER);
  const color = getColorOfGivenIndex(snappedIndex);

  const fallbackColor = getColorOfGivenIndex(1);
  return color || fallbackColor;
};
