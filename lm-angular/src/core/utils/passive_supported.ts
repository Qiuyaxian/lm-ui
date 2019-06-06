/**
 * vue 
 */
let passiveSupported: boolean = false
try {
  let options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
} catch (err) {}

export {
  passiveSupported
}