webpackJsonp([6],{bHfW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"modifyTel",data:function(){return{tel:"",yzm:"",yzhText:"击获取验证码",yzmBtnClass:"yzhBtn",time:60,timer:null}},activated:function(){this.tel="",this.yzm="",this.yzhText="获取验证码",this.yzmBtnClass="yzhBtn",this.time=60,this.timer=null},methods:{getValCode:function(){var t=this;"yzhBtn2"!=t.yzmBtnClass&&(t.$utils.checkTel(t.tel)?this.$axios.get("user/user/findValidateCode.do",{params:{phone:t.tel}}).then(function(e){0==e.data.ret_code?(alert("验证码发送成功"),t.imer=setInterval(function(){t.time<=0?(t.yzhText="获取验证码",t.time=60,t.yzmBtnClass="yzmBtn",clearInterval(t.timer)):(t.yzhText="再次获取"+t.time+"s",t.yzmBtnClass="yzhBtn2",t.time=t.time-1)},1e3)):alert(e.data.ret_msg)}).catch(function(t){alert("网络连接失败")}):weui.toast("请输入正确的手机号"))},loginBtnClick:function(){var t=this;t.$utils.checkTel(t.tel)?t.yzm.length<4?alert("请输入正确的验证码"):this.$axios.get("user/user/loginAndNew.do",{params:{phone:t.tel,validateCode:t.yzm}}).then(function(e){0==e.data.ret_code?(t.$utils.setUserInfo(e.data.ret_data),alert("操作成功!")):alert(e.data.ret_msg)}).catch(function(t){alert("网络连接失败")}):alert("请输入正确的手机号")}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modifyTel"},[a("div",{staticClass:"modifyTel_line"},[a("div",{staticClass:"title"},[t._v("手机号")]),t._v(" "),a("div",{staticClass:"input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"tel",maxlength:"11",placeholder:"请输入验证码"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"modifyTel_line"},[a("div",{staticClass:"title"},[t._v("验证码")]),t._v(" "),a("div",{staticClass:"yzm"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.yzm,expression:"yzm"}],attrs:{maxlength:"6",placeholder:"请输入验证码"},domProps:{value:t.yzm},on:{input:function(e){e.target.composing||(t.yzm=e.target.value)}}}),t._v(" "),a("div",{class:t.yzmBtnClass,on:{click:t.getValCode}},[t._v(t._s(t.yzhText))])])]),t._v(" "),a("div",{staticClass:"sendBtn",on:{click:t.loginBtnClick}},[t._v("确定")])])},staticRenderFns:[]};var l=a("VU/8")(i,s,!1,function(t){a("vABz")},"data-v-bdbe2d3e",null);e.default=l.exports},vABz:function(t,e){}});
//# sourceMappingURL=6.e490b886c373a2821ec4.js.map