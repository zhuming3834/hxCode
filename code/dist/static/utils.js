var utils = {
    // baseKey: 'wx_sc',
    // baseAuth: 'NNSXS',
    // baseToken: 'aebbfde9a8b480ce80e9376ace27f088',
    APP_ID: "wxc7549dde33b0264f",
    APP_SECRET: "964330bdb4bb423c161905112bcd5eb4",
    // 获取路径中的参数
    getquerystring: function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    // 校验手机号
    checkTel: function(tel){
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(tel)) {
            return false;   // 手机号 Error
        } else {
            return true;  // 手机号 OK
        }
    },
    // 存储用户信息
    setUserInfo: function(userInfo){
        var userInfo = JSON.stringify(userInfo);
        localStorage.setItem('userInfo',userInfo);
    },
    // 获取用户信息
    getUserInfo: function(){
        var userInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userInfo);
        return userInfo;
    },
    // 获取用户ID
    getUserID: function(){
        var userInfo = this.getUserInfo();
        if(userInfo == null){
            return ''
        }else{
            return userInfo.userId;
        }
    },
    // 获取openid
    getOpenID: function(){
        var openid = '';
        var userInfo = this.getUserInfo();
        if (userInfo != null) {
          openid = userInfo.openID;
          if (openid != '') {
            return openid;
          }
        }
        var wxData = this.getWxDate();
        if(wxData != ''){
            openid = wxData.openid;
        }
        return openid;
        // return 'o9SEIuJEEaDblYz8UoNBYMzT2Sj4'
    },
    // 存储威信数据
    setWxData: function(wxData){
        var wxData = JSON.stringify(wxData);
        localStorage.setItem('wxData',wxData);
    },
    // 获取微信数据
    getWxDate: function(){
        var wxData = localStorage.getItem('wxData');
        wxData = JSON.parse(wxData);
        if(wxData == null){
            return '';
        }else{
            return wxData;
        }
    },
    // 清除用户信息
    clearUserInfo: function(){
        localStorage.removeItem('userInfo');
    },
    base32Encode: function(srcString){
        var          i        = 0;
        var          index    = 0;
        var          digit    = 0;
        var          currByte;
        var          nextByte;
        var retrunString = '';
        var BASE32CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        for (var i=0; i< srcString.length;) {
            //var          index    = 0;
            currByte = (srcString.charCodeAt(i) >= 0) ? srcString.charCodeAt(i)
                                        : (srcString.charCodeAt(i) + 256);
            if (index > 3) {
                if ((i + 1) < srcString.length) {
                        nextByte = (srcString.charCodeAt(i + 1) >= 0)
                                                  ? srcString.charCodeAt(i + 1)
                                                  : (srcString.charCodeAt(i + 1) + 256);
                } else {
                    nextByte = 0;
                }
                digit     = currByte & (0xFF >> index);
                index     = (index + 5) % 8;
                digit <<= index;
                digit |= (nextByte >> (8 - index));
                i++;
            } else {
                digit     = (currByte >> (8 - (index + 5))) & 0x1F;
                index     = (index + 5) % 8;

                if (index == 0) {
                    i++;
                }
            }
            retrunString = retrunString + BASE32CHAR.charAt(digit);
        }
        return retrunString.toLowerCase();
      }
}
export default utils
