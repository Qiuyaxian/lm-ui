import formater from './format';
/**
 * [each description]
 * @param  {[type]}   obj [description]
 * @param  {Function} fn  [description]
 * @return {[type]}       [description]
 */
export function each (obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn.call(obj[key], key, obj[key]) === false) {
        break
      }
    }
  }
}
/**
 * [trimZero description]
 * @param  {[type]} val [description]
 * @return {[type]}     [description]
 */
export function trimZero (val) {
  val = String(val)
  val = val ? parseFloat(val.replace(/^0+/g, '')) : ''
  val = val || 0
  val = val + ''
  return val
}
/**
 * [generateRange description]
 * @param  {Number} start [description]
 * @param  {[type]} end   [description]
 * @return {[type]}       [description]
 */
export function generateRange (start = 0, end) {
  let results = []
  for (let i = start; i <= end; i++) {
    results.push(addZero(i))
  }
  return results
}
/**
 * [isToday description]
 * @param  {[type]}  val1 [description]
 * @param  {[type]}  val2 [description]
 * @return {Boolean}      [description]
 */
export function isToday (val1, val2) {
  return val1.getFullYear() === val2.getFullYear() && val1.getMonth() === val2.getMonth() && val1.getDate() === val2.getDate()
}
/**
 * [addZero description]
 * @param {[type]} val [description]
 */
export function addZero (val) {
  val = String(val)
  return val.length < 2 ? '0' + val : val
}
/**
 * [isLeapYear description]
 * @param  {[type]}  year [description]
 * @return {Boolean}      [description]
 */
export function isLeapYear (year) {
  return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0
}
/**
 * [getMaxDay description]
 * @param  {[type]} year  [description]
 * @param  {[type]} month [description]
 * @return {[type]}       [description]
 */
export function getMaxDay (year, month) {
  year = parseFloat(year)
  month = parseFloat(month)
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
}
/**
 * [parseRow description]
 * @param  {[type]} tmpl  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function parseRow (tmpl, value) {
  return tmpl.replace(/\{value\}/g, value)
}
/**
 * [parseDate description]
 * @param  {[type]} format [description]
 * @param  {[type]} value  [description]
 * @return {[type]}        [description]
 */
export function parseDate (format, value) {
  const formatParts = format.split(/[^A-Za-z]+/)
  let valueParts = value.replace(/\s/g, '-').replace(/:/g, '-').replace(/\//g, '-').split('-')
  if (formatParts.length !== valueParts.length) {
    // if it is error date, use current date
    const date = formater(new Date(), format)
    valueParts = date.split(/\D+/)
  }

  let result = {}

  for (let i = 0; i < formatParts.length; i++) {
    if (formatParts[i]) {
      result[formatParts[i]] = valueParts[i]
    }
  }
  return result
}
/**
 * [getElement description]
 * @param  {[type]} expr [description]
 * @return {[type]}      [description]
 */
export function getElement (expr) {
  return (typeof expr === 'string') ? document.querySelector(expr) : expr
}
/**
 * [toElement description]
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
export function toElement (html) {
  const tempContainer = document.createElement('div')
  tempContainer.innerHTML = html
  return tempContainer.firstElementChild
}
/**
 * [removeElement description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
export function removeElement (el) {
  el && el.parentNode.removeChild(el)
}