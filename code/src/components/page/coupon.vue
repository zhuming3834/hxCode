<template>
  <div class="coupon">
    <div class="couponHeader">
      <div @click="canUserClick" :class="couponHeader_L">可使用</div>
      <div @click="canNotUserClick" :class="couponHeader_R">已失效</div>
    </div>
    <div class="couponList" v-if="isCan == 0">
      <div v-if="couponList.length > 0" class="couponItem" v-for="item in couponList" :key="item.couponId">
        <div class="top">
          <div class="couponItemLeft">
            <div class="manUse"><span>￥</span>{{item.couponAmount}}</div>
            <div class="man">满{{item.conditions}}元可用</div>
          </div>
          <div class="couponItemRight">
            <div class="title">{{item.couponName}}</div>
            <div class="time">{{item.startTime.split(' ')[0]}} - {{item.endTime.split(' ')[0]}}</div>
            <div @click="goHomeClick(item.couponId)" class="btn">立即使用</div>
          </div>
        </div>
        <div class="bottom">{{item.describ}}</div>
      </div>
    </div>
    <div class="couponList" v-else>
      <div v-if="couponList.length > 0" class="couponItem nocan" v-for="item in couponList" :key="item">
        <div class="top">
          <div class="couponItemLeft">
            <div class="manUse"><span>￥</span>{{item.couponAmount}}</div>
            <div class="man">满{{item.conditions}}元可用</div>
          </div>
          <div class="couponItemRight">
            <div class="title">{{item.couponName}}</div>
            <div class="time">{{item.startTime.split(' ')[0]}} - {{item.endTime.split(' ')[0]}}</div>
            <!-- <div class="btn">立即使用</div> -->
          </div>
        </div>
        <div class="bottom">{{item.describ}}</div>
      </div>
    </div>
    <div @click="exchangeBtnClick" class="exchange">兑换</div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data () {
    return {
      couponHeader_L: 'couponHeader_left active',
      couponHeader_R: 'couponHeader_right',
      isCan: 0,   // 0 可使用  2 不可使用
      couponList: [], // 优惠卷数据集合
      type: 0, // 0 我进来的  1 选择优惠卷进来的
      price: '',
    }
  },
  activated(){
    this.type = this.$route.query.type || 0;
    this.price = this.$route.query.price || 0;
    this.getCouponData();
  },
  methods: {
    // 获取优惠卷列表
    getCouponData: function(){
      var self = this;
      this.$axios.get('/user/userInfo/findUserCoupon.do',{
        params: {
          couponState: self.isCan
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.couponList = res.data.ret_data;
          self.couponList = [];
        } else {
          weui.toast(res.data.ret_msg);
        }
      }).catch(function (error) {
        weui.toast('网路链接失败');
      });
    },
    // 可使用的
    canUserClick: function(){
      this.couponHeader_L = 'couponHeader_left active';
      this.couponHeader_R = 'couponHeader_right';
      this.isCan = 0;
      this.getCouponData();
    },
    // 不可使用的
    canNotUserClick: function(){
      this.couponHeader_L = 'couponHeader_left';
      this.couponHeader_R = 'couponHeader_right active';
      this.isCan = 2;
      this.getCouponData();
    },
    // 去使用  点击事件
    goHomeClick: function(couponId){
      if (this.type == 1) {  // 确认 订单 进来的
        var len = this.couponList.length;
        var conpouItem = {};
        for(var i = 0; i < len; i ++){
          if(this.couponList[i].couponId == couponId){
            if (this.price < parseInt(this.couponList[i].conditions)) {
              weui.toast('不满足使用条件');
              return;
            } else {
              conpouItem = this.couponList[i];
              localStorage.setItem('conpouItem',JSON.stringify(conpouItem));
              window.history.back();
            }
          }
        }
      } else {  // 其他
        this.$router.push('/home');
      }
    },
    // 兑换按钮点击事件
    exchangeBtnClick: function(){
      this.$router.push('/exchange');
    },
  },
}
</script>
<style scoped>
.exchange {
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
  display: none;
}
.couponList {
  height: 1100px;
  overflow: auto;
  width: 750px;
  background-color: #fafafa;
  margin-top: 20px;
}
.couponItem {
  height: 200px;
  width: 710px;
  background-color: #ff6b6d;
  border-radius: 8px;
  margin: auto;
  position: relative;
  margin-bottom: 20px;
}
.nocan {
  background-color: #d6d9dd;
}
.top {
  height: 140px;
  width: 100%;
}
.couponItemLeft {
  float: left;
  width: 200px;
  text-align: center;
  color: white;
  margin: 20px 0;
  border-right: 1px #ffffff dashed;
}
.manUse span, .man{
  font-size: 24px;
}
.couponItemRight {
  float: left;
  margin: 20px 20px;
  color: white;
  font-size: 28px;
}
.title {
  margin-top: 4px;
}
.time {
  font-size: 22px;
}
.btn {
  position: absolute;
  right: 20px;
  top: 44px;
  background-color: #fee5e8;
  color: #ff6b6d;
  border-radius: 4px;
  height: 44px;
  line-height: 44px;
  padding: 2px 10px;
}
.bottom {
  background-color: white;
  padding: 10px 20px;
  border-top: 1px #ffffff dotted;
  color: #b7b7b7;
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.couponHeader {
  widows: 100%;
  height: 80px;
  line-height: 60px;
  color: #444444;
  padding: 0 20px;
  border-bottom: solid 1px #fafafa;
  background-color: white;
  text-align: center;
}
.couponHeader div{
  float: left;
  text-align: center;
  height: 60px;
  padding: 10px 0;
}
.couponHeader_left {
  width: 354px;
  border-right: solid 1px #fafafa;
}
.couponHeader_right {
  width: 354px;
}
.active {
  color: #ff6b6d;
  border-bottom: solid 1px #ff6b6d;
}
</style>
