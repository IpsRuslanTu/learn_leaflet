const palette: string[] = ['#0000fe', '#008001', '#ff7f00', '#fe0000', '#8c01fe', '#008081',
  '#a1b603', '#ffc000', '#ff4403', '#a81780', '#5a00d4', '#5050d4', '#509252', '#d39250', '#d65051',
  '#9851d5', '#509291', '#a1af50', '#d5b351', '#d57451', '#a75d92', '#7e50bd'];

const usedPalette: string[] = [];

export const getAvailableColor = (): string => {
  let color: string | undefined = palette.find((item: string) => (!(usedPalette.includes(item))));
  if (typeof color === 'string') {
    usedPalette.push(color);
  } else {
    color = palette[0];
    usedPalette.length = 0;
    usedPalette.push(palette[0]);
  }
  return color;
}

export const deleteColorFromPalette = (color: string) => {
  let colorIndex = usedPalette.indexOf(color);
  if (colorIndex !== -1) usedPalette.splice(colorIndex, 1);
}