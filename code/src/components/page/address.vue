<template>
  <div class="addressList">
    <div class="list">
      <div class="addressItem" v-for="item in addressList" :key="item.id">
        <div class="line1" @click="selectClick(item.id)">
          <div class="line1_name">{{item.personName}}</div>
          <div class="line1_tel">{{item.phoneNumber}}</div>
        </div>
        <div class="line2" @click="selectClick(item.id)">{{item.province + item.city + item.area + item.detailed }}</div>
        <div class="line3">
          <div :class="[item.isDefault == 1 ? 'line3_def': 'line3_def2']" @click="checkBoxClick(item.id,item.isDefault)">
            <span v-if="item.isDefault == 1">默认地址</span>
            <span v-else>默认地址</span>
          </div>
          <!-- <div class="line3_def2" @click="checkBoxClick(item.id,false)" v-else>设为默认地址</div> -->
          <div class="line3_edit" @click="editBtnClick(item.id)">编辑</div>
          <div class="line3_del" @click="delBtnClick(item.id)">删除</div>
        </div>
      </div>
    </div>
    <div @click="addAddressClick" class="addAddress">新增地址</div>
  </div>
</template>

<script>
export default {
  name: 'addressList',
  data () {
    return {
      type: '', // 入口类型  0: 确认订单 1： 其他
      addressList: []
    }
  },
  activated(){
    this.type = this.$route.query.type;
    this.getAddressData();
  },
  methods: {
    // 获取地址
    getAddressData: function(){
      var self = this;
      this.$axios.get('/user/userInfo/findUserAddrees.do',{
        params: {}
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.addressList = res.data.ret_data;
        } else {
          Toast(res.data.ret_msg);
        }
      }).catch(function (error) {
        Toast('网路链接失败');
      });
    },
    // 地址选择事件
    selectClick: function(id){
      if(this.type == 0){
        var len = this.addressList.length;
        for(var i = 0; i < len; i++){
          if (this.addressList[i].id == id) {
            localStorage.setItem('address',JSON.stringify(this.addressList[i]))
          }
        }
        window.history.back();
      }
    },
    // 设置默认 按钮点击事件
    checkBoxClick: function(id,def){
      var len = this.addressList.length;
      for(var i = 0; i < len; i ++){
        if (this.addressList[i].id == id) {
          if (def == 1) {
            this.addressList[i].isDefault = 0;
          } else {
            this.addressList[i].isDefault = 1;
          }
        }
      }
      self.changeDefRequest();
    },
    // 修改默认地址
    changeDefRequest: function(id){
      var self = this;
      var addressItem = {};
      var len = this.addressList.length;
      for(var i = 0; i < len; i ++){
        if (this.addressList[i].id == id) {
          addressItem = this.addressList[i];
        }
      }
      this.$axios.get('/user/userInfo/modifyUserAddress.do',{
        params: {
          id:        addressItem.id,
          name:      addressItem.personName,     // 收货人姓名
          tel:       addressItem.phoneNumber,      // 收货人电话
          province:  addressItem.province, // 省
          city:      addressItem.city,     // 市
          area:      addressItem.area,     // 区县
          detailed:  addressItem.detailed,  // 详细地址
          isDefault: addressItem.isDefault  // 是否是默认地址 0是 1否
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.getAddressData();
        } else {
          Toast(res.data.ret_msg);
        }
      }).catch(function (error) {
        Toast('网路链接失败');
      });
    },
    // 编辑按钮点击事件
    editBtnClick: function(id){
      this.$router.push({
        path: '/editAddress',
        query: {
          id: id
        }
      });
    },
    // 删除按钮点击事件
    delBtnClick: function(id){
      var self = this;
      weui.confirm('确认删除该收获地址吗？', {
        title: '提示',
        buttons: [{
            label: '取消',
            type: 'default',
            onClick: function(){
              console.log('no')
            }
        }, {
            label: '确定',
            type: 'primary',
            onClick: function(){
              self.cancleRequest(id);
            }
        }]
      });
    },
    // 删除请求
    cancleRequest: function(id){
      var self = this;
      this.$axios.get('/user/userInfo/removeUserAddress.do',{
        params: {
          id: id
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.getAddressData();
        } else {
          Toast(res.data.ret_msg);
        }
      }).catch(function (error) {
        Toast('网路链接失败');
      });
    },
    // 定新增地址点击事件
    addAddressClick: function(){
      this.$router.push('/addAddress');
    }

  },
}
</script>
<style scoped>
.list {
  width: 100%;
  height: 1200px;
  overflow: auto;
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
.addressItem {
  height: 200px;
  width: 730px;
  margin: 10px auto;
  background-color: white;
  border-radius: 6px;
}
.line1 {
  height: 30px;
  line-height: 30px;
  font-size: 30px;
  color: #444444;
  padding: 6px 10px;
  background-color: transparent;
  border-bottom: solid 1px #fafafa;
}
.line1_name {
  float: left;
}
.line1_tel {
  float: right;
}
.line2 {
  font-size: 26px;
  color: #666666;
  padding: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 78px;
  border-bottom: solid 1px #fafafa;
}
.line3 {
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
  color: #666666;
  font-size: 24px;
  vertical-align: middle;
}
.line3_def {
  float: left;
  padding-left: 40px;
  background-image: url(../../assets/images/check_box_ok.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.line3_def2 {
  float: left;
  padding-left: 40px;
  background-image: url(../../assets/images/check-box-no.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.line3_del, .line3_edit{
  padding-left: 40px;
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.line3_edit {
  float: right;
  background-image: url(../../assets/images/address_edit.png);
}
.line3_del {
  float: right;
  background-image: url(../../assets/images/address_del.png);
  margin-right: 20px;
}
</style>
