'use strict'
/**
 * [pad description]
 * @param  {[type]} source [description]
 * @param  {Number} length [description]
 * @return {[type]}        [description]
 */
export function numberPad (source, length = 2) {
  let pre = ""
  const negative = source < 0
  const string = String(Math.abs(source))
  if (string.length < length) {
      pre = (new Array(length - string.length + 1)).join('0')
  }
  return (negative ?  "-" : "") + pre + string
}
/**
 * [range description]
 * @param  {[type]} start    [description]
 * @param  {[type]} end      [description]
 * @param  {Number} padWidth [description]
 * @return {[type]}          [description]
 */
export function numberRange (start, end, padWidth = 2) {
  const rs = []
  while (start <= end) {
    rs.push(padWidth ? numberPad(start, padWidth) : start)
    start++
  }
  return rs
}
