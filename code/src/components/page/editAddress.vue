<template>
  <div class="addressEdit">
    <div class="line">
      <div class="title">收货人姓名</div>
      <input v-model="addressItem.personName" placeholder="请输入收货人姓名" />
    </div>
    <div class="line">
      <div class="title">收货人电话</div>
      <input v-model="addressItem.phoneNumber" placeholder="请输入收货人电话" />
    </div>
    <div class="line">
      <div class="title">省市区</div>
      <div class="addressPick" @click="addressPickClick">{{addressItem.province}}{{addressItem.city}}{{addressItem.area}}</div>
    </div>
    <div class="line2">
      <div class="title">详细地址</div>
      <textarea v-model="addressItem.detailed" placeholder="请输入详细地址"></textarea>
    </div>
    <div class="line">
      <div class="title">默认地址</div>
      <div @click="checkBoxClick" id="check" :class="[addressItem.isDefault == 1 ? 'checkBoxEd' : 'checkBox']"></div>
    </div>
    <div @click="sureBtnClick" class="addAddress">确定</div>
  </div>
</template>

<script>
export default {
  name: 'addressEdit',
  data () {
    return {
      id: '',  // 地址ID
      addressItem: {},  // 需要修改的地址
    }
  },
  activated(){
    this.id = this.$route.query.id || '';
    this.getAddressData();
  },
  mounted() {

  },
  methods: {
    // 获取地址
    getAddressData: function(){
      var self = this;
      this.$axios.get('/user/userInfo/findUserAddrees.do',{
        params: {}
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var len = res.data.ret_data.length;
          for(var i = 0; i < len; i ++){
            if(res.data.ret_data[i].id == self.id){
              self.addressItem = res.data.ret_data[i];
            }
          }
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    },
    // 确定按钮点击事件
    sureBtnClick: function(){
      var self = this;
      if (self.addressItem.personName.length == 0) {
          alert('请输入收货人姓名');
          return;
      }
      if (!self.$utils.checkTel(self.addressItem.phoneNumber)) {
          alert('请输入正确的手机号');
          return;
      }
      if (self.addressItem.province.length == 0) {
          alert('请选择省市区');
          return;
      }
      if (self.addressItem.detailed.length == 0) {
          alert('请输入详细地址');
          return;
      }
      var self = this;
      this.$axios.get('/user/userInfo/modifyUserAddress.do',{
        params: {
          id:        self.addressItem.id,
          personName:      self.addressItem.personName,     // 收货人姓名
          phoneNumber:       self.addressItem.phoneNumber,      // 收货人电话
          province:  self.addressItem.province, // 省
          city:      self.addressItem.city,     // 市
          area:      self.addressItem.area,     // 区县
          detailed:  self.addressItem.detailed,  // 详细地址
          isDefault: self.addressItem.isDefault  // 是否是默认地址 0是 1否
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          alert('修改成功');
          // setTimeout(function(){
            window.history.back();
          // },3000);
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    },
    // 默认地址点击事件
    checkBoxClick: function(){
      if (this.addressItem.isDefault == 1) {
        this.addressItem.isDefault = 0;
      } else {
        this.addressItem.isDefault = 1;
      }
    },
    // 地址选择器 点击事件
    addressPickClick: function(){
      var self = this;
      weui.picker(self.$citydata, {
        onChange: function (result) {
            // console.log(result)
        },
        onConfirm: function (result) {
            self.addressItem.province = result[0].label;
            self.addressItem.city = result[1].label;
            self.addressItem.area = result[2].label;
        },
        id: 'doubleLinePicker'
      });
    }
  },
}
</script>
<style scoped>

.line #check{
  width: 200px;
  height: 70px;
  float: left;
  margin-left: 20px;
  padding-left: 40px;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.checkBox{
  background-image: url(../../assets/images/check-box-no.png);
}
.checkBoxEd{
  background-image: url(../../assets/images/check_box_ok.png);
}
.addressEdit {
  padding: 40px 0;
  background-color: white;
}
.line {
  background-color: white;
  padding: 10px;
  border-bottom: solid 1px #fafafa;
  height: 90px;
}
.line2 {
  background-color: white;
  padding: 10px;
  border-bottom: solid 1px #fafafa;
  height: 150px;
}
.title {
  float: left;
  color: #444444;
  font-size: 30px;
  height: 70px;
  line-height: 70px;
  width: 180px;
  margin-left: 40px;
}
input{
  border-radius: 8px;
  outline: none;
  border: solid 1px #c1c1c1;
  height: 70px;
  line-height: 70px;
  margin-left: 20px;
  width: 400px;
  padding: 0 10px;
}
.addressPick {
  float: left;
  width: 380px;
  padding: 0 10px;
  height: 70px;
  /* line-height: 70px; */
  margin-left: 20px;
  padding-right: 40px;
  background-image: url(../../assets/images/u261.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
textarea {
  resize: none;
  height: 120px;
  padding: 10px;
  border-radius: 8px;
  outline: none;
  border: solid 1px #c1c1c1;
  margin-left: 20px;
  width: 400px;
}
.addAddress {
  position: fixed;
  width: 710px;
  left: 20px;
  bottom: 20px;
  height: 88px;
  line-height: 88px;
  line-height: 88px;
  border-radius: 44px;
  text-align: center;
  color: white;
  background-color: #1AAD19;
}

</style>
