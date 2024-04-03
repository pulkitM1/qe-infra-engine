export const getCssProperty = (property: string, element: Element = document.documentElement) => {
  return getComputedStyle(element).getPropertyValue(property).trim();
};
