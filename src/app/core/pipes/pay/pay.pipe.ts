import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pay'
})
export class PayPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    if (value != '' && value != null) {
      for (const item of value) {
        if (String(item.idTakeOrder).toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.name.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.totalValue.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        }
      }
    }
    return result;
  }

}
