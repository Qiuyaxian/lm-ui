import { Pipe, PipeTransform } from '@angular/core';
import { value2name } from './value2name'

@Pipe({
  name: 'value2name',
  pure: true
})
export class Value2namePipe implements PipeTransform {
  transform(value: any, list?: any[], delimiter?: string): any {
    return value2name(value, list, delimiter);
  }
}