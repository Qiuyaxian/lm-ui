//引入微信配置
var wx;
if(window){
  wx = require('weixin-js-sdk');
}
/**
 * [isWechat 判断是否是微信浏览器]
 * @param  {[type]}  userAgent [description]
 * @return {Boolean}           [description]
 */
export function isWechat(userAgent = (window && window.navigator.userAgent) || '') {
  return /micromessenger/gi.test(userAgent);
}
/**
 * [isShareUrl 是否是分享url]
 * @param  {[type]}  url [description]
 * @return {Boolean}     [description]
 */
export function isShareUrl (url = (window && window.location.href) || '') {
  if(/shareType/i.test(url)) return true;
  else return false;
}


/**
 * [urlParse 处理url地址栏上的参数]
 * https://f.jzmt168.com/?code=001ocPs50wJ8HK1Dbkt503LVs50ocPsz&state=STATE#/classify/1942/1
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function urlParse(url) {
  url = url ? url : (window && window.location.href)?window.location.href:'';
  let router = {};
  if(url.indexOf('#') != -1){
    let protocol = /(https|http):\/\//, //匹配协议
        //domain = /([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.+[a-zA-Z0-9]+\.*[a-zA-Z0-9]*|localhost)/,//域名
        domain = /([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.*[a-zA-Z0-9]*\.*[a-zA-Z0-9]*|localhost)/,
        port = /:([0-9]{4})/, //端口号
        route = url.indexOf('#') != -1?url.split('#'):[url],
        code = /code=([0-9a-zA-Z]{32})&state=(STATE|state)/i;//code值
    if(route && route.length != 0){
      router['protocol'] = route[0].match(protocol)[1];
      router['domain'] = route[0].match(domain)[1];
      if(port.test(route[0])){
        router['port'] = route[0].match(port)[1];
      }
      if(code.test(route[0])){
         router['code'] = route[0].match(code)[1];
         router['state'] = route[0].match(code)[2];
      }
      if(route[1] && route[1].indexOf('?') != -1){
        if(code.test(route[1])){
          router['code'] = route[1].match(code)[1];
          router['state'] = route[1].match(code)[2];
        }
        //参数
        router['path'] = route[1].substring(0,route[1].indexOf('?'));
        route[1] = route[1].substring(route[1].indexOf('?')+1);
        let queryArray = route[1].split('&');
        let query = {};
        queryArray.forEach( queryItem => {
           let item = queryItem.split('=');
           query[item[0]] = item[1];
        });
        router['query'] = query;
      }else{
        router['path'] = route[1];
      }
    }
  }else{
    let urlReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
        domain = /(https|http:\/\/)*([a-zA-Z0-9]+\.[a-zA-Z0-9]+\.*[a-zA-Z0-9]*\.*[a-zA-Z0-9]*|localhost)/,
        route = url.match(urlReg),
        protocol = /(https|http):\/\//;
    if(!route && route.length == 0) return null; 
    if(url.match(protocol) && url.match(protocol).length != 0 && url.match(protocol)[1]){
      router['protocol'] = url.match(protocol)[1];
    }
    if(url.match(domain) && url.match(domain).length != 0 && url.match(domain)[2]){
      router['domain'] = url.match(domain)[2]; 
    }
    if(route[4]){ 
      if(url.indexOf('?') != -1){
        let path = route[4].substring(0,route[4].indexOf('?'));
        router['path'] = path;
        path = route[4].substring(route[4].indexOf('?') + 1);
        let queryArray = path.split('&');
        let query = {};
        queryArray.forEach( queryItem => {
           let item = queryItem.split('=');
           query[item[0]] = item[1];
        });
        router['query'] = query;
      }else{
        router['path'] = route[4];
      } 
    }
  }
  return router;
}
/**
 * [canNotUse 不是微信浏览器禁止使用]
 * @return {[type]} [description]
 */
export function isNotWechat(){
  let urlParseQuery = urlParse((window && window.location.href) || ''),
      author = `${ urlParseQuery.protocol }://${ urlParseQuery.domain }/#/author`;
  redirectAuthorize(author);
  return;
}
/**
 * [redirectAuthorize 定向微信授权]
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
export function redirectAuthorize(url){
  if(!window) return;
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ APPID }&redirect_uri=${ encodeURIComponent( url ) }&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
}
/**
 * [isCodeAuth 是否微信授权生成token]
 * @return {Boolean} [description]
 */
export function isCodeAuth(){
  if(!isWechat()) return;
  let token = _localStorage.getSync('token');
  let urlParseQuery = urlParse((window && window.location.href) || '');  
  if (!token || !/\S/.test(token)) {
    if(_localStorage.getSync('WxOAuthCode')){
      //存在就清除缓存
      _localStorage.delSync('WxOAuthCode');
    }
    _localStorage.setSync('redirect', urlParseQuery);
    let author = `${ urlParseQuery.protocol }://${ urlParseQuery.domain }/#/author`;
    redirectAuthorize(author)
    return false;
  }else{
    return true;
  }
}
/**
 * [wxShare 微信分享]
 * @return {[type]} [description]
 */
export function wxShareHandle (option) {
  if(!wx) {
    option.success && option.success();
    return;
  }
  wx.onMenuShareTimeline({
    title: option.title, // 分享标题
    link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: option.imgUrl, // 分享图标
    success: function () {
      option.success && option.success();
    }
  });
  wx.onMenuShareAppMessage({
    title: option.title, // 分享标题
    desc: option.desc, // 分享描述
    link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: option.imgUrl, // 分享图标
    type: option.type, // 分享类型,music、video或link，不填默认为link
    dataUrl: option.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户确认分享后执行的回调函数
      option.success && option.success();
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      option.cancel && option.cancel();
    }
  });
}
/**
 * [onBridgeReady 微信支付]
 * @return {[type]} [description]
 */
export function onBridgeReadyHandle(payArg , success, cancel){
  if (typeof WeixinJSBridge == "undefined"){
    if(document.addEventListener){
      document.addEventListener('WeixinJSBridgeReady', function(){
        onBridgeReady(payArg , success, cancel);
      }, false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', function(){
        onBridgeReady(payArg , success, cancel);
      }); 
      document.attachEvent('onWeixinJSBridgeReady', function(){
        onBridgeReady(payArg , success, cancel);
      });
    }
  }else{
     onBridgeReady(payArg , success, cancel)
  }
}
/**
 * [onBridgeReady 调用微信支付]
 * @param  {[type]} payArg  [description]
 * @param  {[type]} success [description]
 * @param  {[type]} cancel  [description]
 * @return {[type]}         [description]
 */
function onBridgeReady(payArg , success, cancel) { 
  if(isString(payArg)) payArg = JSON.parse(payArg);
  loading.hide();
  if(!payArg.appId || !payArg.timeStamp || !payArg.packageValue || !payArg.signType || !payArg.paySign){
    alert.show({
      title : '支付提示',
      content: '支付签名错误~'
    })
    return;
  }

  WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId": payArg.appId,     //公众号名称，由商户传入     
      "timeStamp": payArg.timeStamp,         //时间戳，自1970年以来的秒数     
      "nonceStr": payArg.nonceStr, //随机串     
      "package": payArg.packageValue,     
      "signType": payArg.signType,         //微信签名方式：     
      "paySign": payArg.paySign //微信签名 
    },
    function(res){
      if(res.err_msg == "get_brand_wcpay_request:ok"){
         //支付成功
        success && success();
      }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
        //支付失败，取消支付
        cancel && cancel();
      }else{
        alert.show({
          title : '支付提示',
          content: '支付失败!'
        })
      } 
    }
  ); 
}

