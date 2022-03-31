export class PaletteEditor {
  private readonly palette: string[];
  private usedColors: string[];

  constructor() {
    this.palette = ['#0000fe', '#008001', '#ff7f00', '#fe0000', '#8c01fe', '#008081', '#a1b603',
      '#ffc000', '#ff4403', '#a81780', '#5a00d4', '#5050d4', '#509252', '#d39250', '#d65051',
      '#9851d5', '#509291', '#a1af50', '#d5b351', '#d57451', '#a75d92', '#7e50bd'];
    this.usedColors = [];
  }

  public getNextColor(): string {
    let color: string | undefined =
      this.palette.find((item: string) => (!this.usedColors.includes(item)));
    if (typeof color === 'string') {
      this.usedColors.push(color);
    } else {
      color = this.palette[0];
      this.usedColors.length = 0;
      this.usedColors.push(this.palette[0]);
    }
    return color;
  }

  public returnColor = (color: string): void => {
    let colorIndex = this.usedColors.indexOf(color);
    if (colorIndex !== -1) this.usedColors.splice(colorIndex, 1);
    console.log(this.usedColors);
  }
}