import { isNumber, isString } from './tools'
/**
 * [Format 格式化日期数据]
 * @param {[type]} date [description]
 * @param {String} fmt  [description]
 */
 export function format (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return '';
  if (isString(date)) date = new Date(date.replace(/-/g, '/'));
  if (isNumber(date)) date = new Date(date);
  try { 
    let o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    let week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    };
  } catch (e) {
    throw new Error( `错误信息：date文件的format方法${e.message}`);
  } finally {
    return fmt;
  }
}
/**
 * [formatRange 日期范围]
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @param  {String} fmt   [description]
 * @return {[type]}       [description]
 */
 export function formatRange (start, end, fmt = 'YYYY-MM-DD') {
  let rs = [];
  try{
    let startTime = new Date(start).getTime(),
    endTime = new Date(end).getTime(); 
    while (startTime <= endTime) {
      rs.push(format(startTime, fmt))
      startTime += 24 * 60 * 60 * 1000
    }
  }catch(e){  
    throw new Error( `错误信息：date文件的 formatRange 方法${e.message}`);
  } finally {
    return rs;
  }
}

/**
 * [formatTime 给日期前补0]
 * @return {[type]} [description]
 */
 export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export function formatTime (time, format = '-') {
  //判断传入的是日期还是时间戳
  if (isNumber(time)) {
   time = time;
 } else if (isString(time) && time.indexOf('-') != -1) {
  let timeYMD = [], timeHSM = [];
  if(/\S+/.test(time)){
      //带有时分秒
      let [timeYMD, timeHSM] = time.split(' ');
      // endTime1 = endTimeArr[0].split('-'),
      // endTime2 = endTimeArr[1].split(':')
    }else{
      //年月日
      time = new Date(time); 
    }
  } else {
    try{
      time = new Date(time);
    }catch(e){
      stateHandle(`date.js js错误:格式不正确${ e.message }`); 
    }
  }
  const year = time.getFullYear(),
  month = time.getMonth() + 1,
  day = time.getDate(),
  hour = time.getHours(),
  minute = time.getMinutes(),
  second = time.getSeconds();
  if (/\S+/.test(format)) {
    return [year, month, day].map(formatNumber).join(format);
  } else {
    return [year, month, day].map(formatNumber).join(division) + ' ' + [hour, minute, second].map(formatNumber).join(':')  
  }
}

/**
 * [isEndTime 判断是否已经结束]
 * @param  {[type]}  stamp [description]
 * @return {Boolean}       [description]
 */
 export function isEndTime (stamp) {
  let endDate;
  if (!/\s+/gi.test(stamp)) {
    endDate = stamp;
  } else {
    let endTimeArr = stamp.split(' '),
    endTime1 = endTimeArr[0].split('-'),
    endTime2 = endTimeArr[1].split(':'),
    interval = 1000;
    endDate = new Date(endTime1[0], endTime1[1] - 1, endTime1[2], endTime2[0], endTime2[1], endTime2[2]).getTime();
  }
  if (endDate - new Date().getTime() <= 0) {   
    return true;
  }else{
    return false;
  }
}
/**
 * [timer 时间倒计时]
 * @type {[type]}
 */
 let timer = null;
 export function endTime(stamp, callback, endCallback, autoplay = true) {
  let endDate, timer, year, month, day = '00', hour = '00', minute = '00', second = '00', leftTime, leftsecond;
  if (!/\s+/gi.test(stamp)) {
    endDate = stamp;
  } else {
    let endTimeArr = stamp.split(' '),
    endTime1 = endTimeArr[0].split('-'),
    endTime2 = endTimeArr[1].split(':'),
    interval = 1000;
    endDate = new Date(endTime1[0], endTime1[1] - 1, endTime1[2], endTime2[0], endTime2[1], endTime2[2]).getTime();
  }
  
  if (endDate - new Date().getTime() <= 0) {
    if (timer) clearInterval(timer);
    if (endCallback){
      endCallback && endCallback(day, hour, minute, second);
    }else{
      callback && callback(day, hour, minute, second); 
    }    
    return;
  }
  function ShowCountDown() {
    let now = new Date();

    leftTime = endDate - now.getTime();  //时间戳
    //得到剩余的毫秒数
    leftsecond = parseInt(leftTime / 1000);
    //获取年份 
    year = now.getFullYear();
    //获取月份
    month = now.getMonth() + 1;
    //获取天数
    day = Math.floor(leftsecond / (60 * 60 * 24)) >= 0 ? Math.floor(leftsecond / (60 * 60 * 24)):0;
    //获取小时数
    hour = Math.floor((leftsecond - (day * (24 * 60 * 60))) / 3600) >= 0 ? Math.floor((leftsecond - (day * (24 * 60 * 60))) / 3600):0;
    //获取分数
    minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60) >= 0 ? Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60):0;
    //获取秒数
    second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60) ? Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60):0;
    //var dayHour = (day * 24 + hour);
    if (month <= 9) {
      month = '0' + month;
    }
    if (day <= 9) {
      day = '0' + day;
    }
    if (hour <= 9) {
      hour = '0' + hour;
    }
    if (minute <= 9) {
      minute = '0' + minute;
    }
    if (second <= 9) {
      second = '0' + second;
    }
    if ( parseInt(hour) <= 0 && parseInt(minute) <= 0 && parseInt(second) <= 0) {
      if (timer) clearInterval(timer);
      endCallback && endCallback(day, hour, minute, second);
    } else {
      callback && callback(day, hour, minute, second);
    }
  }
  if (autoplay){
    timer = setInterval(function () {
      ShowCountDown();
    }, interval);
  }else{
    if (timer) clearTimeout(timer);
    ShowCountDown();
  }
  
}