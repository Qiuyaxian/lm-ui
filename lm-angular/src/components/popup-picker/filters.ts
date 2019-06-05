import map from 'array-map'
import find from 'array-find'

export function value2name (value: any, list?: any, delimiter?: any): any {
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

export function array2string(array: any): any {
  return array.length === 1 ? array[0] : array.join(' ')
}