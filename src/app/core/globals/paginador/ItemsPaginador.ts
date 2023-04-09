export class ItemsPaginador {
  items = 4;

  ShowItems(items1: number, items2: number, items3: number, items4: number) {
    if (screen.height <= 626) {
      this.items = items1;
    }
    if (screen.height <= 720) {
      this.items = items2;
    }
    if (screen.height < 1100 && screen.height > 720) {
      this.items = items3;
    }
    if (screen.height >= 1100) {
      this.items = items4;
    }
  }

  /* Calculo cantidad de items a mostrar */
  ShowItemsP(tm: any, tr: any, obj: any = 2) {
    let calc = (tm / tr) - obj;
    this.items = Math.round(calc);
  }
}
