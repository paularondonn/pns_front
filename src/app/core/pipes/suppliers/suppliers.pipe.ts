import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suppliers'
})
export class SuppliersPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    if (value != '' && value != null) {
      for (const item of value) {
        if (item.idSupplier == args) {
          result.push(item);
        } else if (String(item.nit).toLowerCase().indexOf(args.toLowerCase())>-1) {
          result.push(item);
        } else if (String(item.name).toLowerCase().indexOf(args.toLowerCase())>-1) {
          result.push(item);
        } else if (String(item.email).toLowerCase().indexOf(args.toLowerCase())>-1) {
          result.push(item);
        } else if (String(item.telephone).toLowerCase().indexOf(args.toLowerCase())>-1) {
          result.push(item);
        }
      }
    }
    return result;
  }

}
