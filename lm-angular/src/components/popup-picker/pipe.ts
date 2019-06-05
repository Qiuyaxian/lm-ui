import { Pipe, PipeTransform } from '@angular/core';
import map from 'array-map'
import find from 'array-find'
/**
 * [Pipe 遍历对象中的key]
 * @param {'keys'}} {name [description]
 */
@Pipe({
  name: 'value2name',
  pure: true
})
export class Value2namePipe implements PipeTransform {
  transform(value: any, list?: any[], delimiter?: string): any {
    if (value && !list.length) {
      return ''
    }

    if (!delimiter) {
      delimiter = ' '
    }

    let rs = map(value, (one, index) => {
      if (list.length && Object.prototype.toString.call(list[0]) === '[object Array]') {
          return find(list[index], item => {
            return item.value === one
        })
      } else {
        return find(list, item => {
          return item.value === one
        })
      }
    })
    rs = rs.filter(one => {
      return typeof one !== 'undefined'
    })

    return map(rs, one => {
      return one.name
    }).join(delimiter).replace('--', '')      
  }
} 



import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core'
@NgModule({
  entryComponents: [],
  imports: [CommonModule],
  exports: [Value2namePipe],
  declarations: [Value2namePipe]
})
export class Value2namePipeModule {
  static forRoot(): ModuleWithProviders {
    return { 
      ngModule: Value2namePipeModule, 
      providers: []
    }
  }
}