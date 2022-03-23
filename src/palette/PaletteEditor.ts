export class PaletteEditor {
  color: string;
  private readonly palette: string[];
  private usedPalette: string[];

  constructor() {
    this.color = '';
    this.palette = ['#0000fe', '#008001', '#ff7f00', '#fe0000', '#8c01fe', '#008081', '#a1b603',
      '#ffc000', '#ff4403', '#a81780', '#5a00d4', '#5050d4', '#509252', '#d39250', '#d65051',
      '#9851d5', '#509291', '#a1af50', '#d5b351', '#d57451', '#a75d92', '#7e50bd'];
    this.usedPalette = [];
  }

  public setAvailableColor(): string {
    let color: string | undefined =
      this.palette.find((item: string) => (!this.usedPalette.includes(item)));
    if (typeof color === 'string') {
      this.usedPalette.push(color);
    } else {
      color = this.palette[0];
      this.usedPalette.length = 0;
      this.usedPalette.push(this.palette[0]);
    }
    return color;
  }

  public deleteColorFromPalette = (deletedColor: string): void => {
    let colorIndex = this.usedPalette.indexOf(deletedColor);
    if (colorIndex !== -1) this.usedPalette.splice(colorIndex, 1);
    console.log(this.usedPalette);
  }
}