import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    if (value != '' && value != null) {
      for (const item of value) {
        if (item.idProduct == args) {
          result.push(item);
        } else if (item.name.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.countryName.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        }
      }
    }
    return result;
  }

}
