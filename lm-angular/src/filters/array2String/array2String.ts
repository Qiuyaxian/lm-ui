export function array2string(array: any[]): any {
  return array.length === 1 ? array[0] : array.join(' ')
}