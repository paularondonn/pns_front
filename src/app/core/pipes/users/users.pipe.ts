import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const result = [];
    if (value != '' && value != null) {
      for (const item of value) {
        if (item.documentNumber.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.names.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.surnames.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.nameUser.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        } else if (item.nameRole.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          result.push(item);
        }
      }
    }
    return result;
  }

}
