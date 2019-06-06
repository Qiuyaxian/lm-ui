import { Pipe, PipeTransform } from '@angular/core';
import { array2string } from './array2string'
@Pipe({
  name: 'array2String',
  pure: true
})
export class array2StringPipe implements PipeTransform {
  transform(array: any[]): any {
    return array2string(array);
  }
}