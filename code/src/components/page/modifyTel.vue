<template>
  <div class="modifyTel">
    <div class="modifyTel_line">
      <div class="title">手机号</div>
      <div class="input">
        <input v-model="tel" type="tel" maxlength="11" placeholder="请输入验证码" />
      </div>
    </div>
    <div class="modifyTel_line">
      <div class="title">验证码</div>
      <div class="yzm">
        <input v-model="yzm" maxlength="6" placeholder="请输入验证码" />
        <div @click="getValCode" :class="yzmBtnClass">{{yzhText}}</div>
      </div>
    </div>
    <div @click="loginBtnClick" class="sendBtn">确定</div>
  </div>
</template>

<script>
export default {
  name: 'modifyTel',
  data () {
    return {
      tel: '',  // 用户输入的手机号
      yzm: '',  // 用户输入的验证码
      yzhText: '击获取验证码',
      yzmBtnClass: 'yzhBtn',
      time: 60,
      timer: null,
    }
  },
  activated(){
    this.tel = '';  // 用户输入的手机号
    this.yzm = '';  // 用户输入的验证码
    this.yzhText = '获取验证码';
    this.yzmBtnClass = 'yzhBtn';
    this.time = 60;
    this.timer = null;
  },
  methods: {
    // 获取验证码  按钮点击事件
    getValCode: function(){
      var self = this;
      if(self.yzmBtnClass == 'yzhBtn2'){
        return;
      }
      if (!self.$utils.checkTel(self.tel)) {
          weui.toast('请输入正确的手机号');
          return;
      }
      this.$axios.get('user/user/findValidateCode.do',{
        params: {
          phone: self.tel
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
           alert('验证码发送成功');
          //  self.yzm = res.data.ret_data.validateCode;
           self.imer = setInterval(function(){
             if (self.time <= 0) {
               self.yzhText = '获取验证码';
               self.time = 60;
               self.yzmBtnClass = 'yzmBtn';
               clearInterval(self.timer);
             }else{
               self.yzhText = '再次获取' + self.time + 's';
               self.yzmBtnClass = 'yzhBtn2';
               self.time = self.time - 1;
             }
           },1000);
        } else {
           alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网络连接失败');
      });
    },
    // 提交按钮点击事件
    loginBtnClick: function(){
      var self = this;
      if (!self.$utils.checkTel(self.tel)) {
          alert('请输入正确的手机号');
          return;
      }
      if (self.yzm.length < 4) {
          alert('请输入正确的验证码');
          return;
      }
      this.$axios.get('user/user/loginAndNew.do',{
        params: {
          phone: self.tel,
          validateCode: self.yzm
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.$utils.setUserInfo(res.data.ret_data);
          alert('操作成功!');
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网络连接失败');
      });
    }
  },
}
</script>
<style scoped>
.modifyTel {
  padding-top: 100px;
}
.modifyTel_line {
  width: 650px;
  margin: 20px auto;
  color: #444444;
  height: 88px;
  line-height: 88px;
}
.title {
  width: 140px;
  font-size: 30px;
  float: left;
  padding-left: 40px;
  font-weight: bold;
  /* text-align: right; */
}
.input {
  float: right;
}
.yzm {
  float: right;
  border: solid 1px #c1c1c1;
  border-radius: 6px;
  width: 430px;
}
.yzm input{
  float: left;
  width: 220px;
  border: none;
}
.yzhBtn {
  float: right;
  height: 80px;
  line-height: 80px;
  font-size: 12px;
  width: 190px;
  text-align: center;
  border-radius: 6px;
  background-color: #1AAD19;
  color: white;
  text-align: center;
}
.yzhBtn2 {
  float: right;
  height: 80px;
  line-height: 80px;
  font-size: 12px;
  width: 190px;
  text-align: center;
  border-radius: 6px;
  background-color: #c1c1c1;
  color: white;
  text-align: center;
}

input {
  outline: none;
  border-radius: 6px;
  border: solid 1px #c1c1c1;
  height: 80px;
  line-height: 80px;
  padding: 0 8px;
  width: 416px;
}
.sendBtn {
  width: 600px;
  background-color: #1AAD19;
  color: white;
  text-align: center;
  height: 88px;
  line-height: 88px;
  margin: 200px auto;
  border-radius: 8px;
}
</style>
