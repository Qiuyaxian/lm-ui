/**
 * 获取uuid
 */
export function getUUID () {
  return Math.random().toString(36).substring(3, 8);
  // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  //   return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  // })
}