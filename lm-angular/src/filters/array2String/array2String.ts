import { Pipe, PipeTransform } from '@angular/core';
import map from 'array-map'
import find from 'array-find'
/**
 * [Pipe 遍历对象中的key]
 * @param {'keys'}} {name [description]
 */
@Pipe({
  name: 'array2String',
  pure: true
})
export class array2StringPipe implements PipeTransform {
  transform(array): any {
    return array.length === 1 ? array[0] : array.join(' ')
  }
}