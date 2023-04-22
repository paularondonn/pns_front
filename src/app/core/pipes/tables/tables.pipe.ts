import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tables'
})
export class TablesPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    if (value != '' && value != null) {
      for (const item of value) {
        if (item.nameCountry.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.nameCity.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.name.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        }
      }
    }
    return result;
  }

}
