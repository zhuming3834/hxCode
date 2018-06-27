<template>
  <div class="confirmOrder">
    <!-- <div class="sureOrder">
      <div @click="submitClick" class="order_btn">提交订单</div>
      <div class="order_detail">共计{{totalNum}}件商品 合计：<span>￥{{totalPrice - freight}}元</span></div>
    </div> -->
    <div class="confirm_address" @click="changeAddressClick">
      <div class="line1">
        <div class="line1_name">收货人：{{address.personName}}</div>
        <div class="line1_tel">{{address.phoneNumber}}</div>
      </div>
      <div class="line2">
        <div class="line1_name">收货地址：</div>
        <div class="line2_detail">{{address.province + address.city + address.detailed}}</div>
      </div>
      <div class="right_arrow"></div>
    </div>
    <div class="goodsList">
      <GoodsItem
      v-for="goods in goodsList"
      :imgs="goods.imgUrl1"
      :desc="goods.cName"
      :price="goods.price"
      :num="goods.buyNum"
      :id="goods.cid"
      :key="goods.cid"></GoodsItem>
    </div>
    <div class="message">
      <div class="message_title">买家留言：</div>
      <input class="message_input" placeholder="点击添加留言" />
    </div>
    <div @click="selectConpouClick" class="coupon">
      <div class="message_title">优惠卷：</div>
      <div class="coupon_select">暂无此类优惠信息</div>
    </div>
    <div class="about">
      <div class="message_title">商品金额</div>
      <div class="about_detail">￥{{totalPrice}}元</div>
    </div>
    <div class="about">
      <div class="message_title">运费</div>
      <div class="about_detail">+￥{{freight}}</div>
    </div>
    <div class="about">
      <div class="message_title">优惠</div>
      <div class="about_detail">-￥{{conpou.couponAmount}}</div>
    </div>
    <div class="sureOrder">
      <div @click="submitClick" class="order_btn">提交订单</div>
      <div class="order_detail">共计{{totalNum}}件商品 合计：<span>￥{{totalPrice - freight}}元</span></div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/common/goodsItem.vue'
export default {
  name: 'confirmOrder',
  data () {
    return {
      address: {
        id: '',
        personName: '', // 收货人姓名
        phoneNumber: '',  // 收货人电话
        province: '',// 省
        city: '',    // 市
        area: '',     // 区县
        detailed: '',// 详细地址
        isDefault: 1 // 是否是默认地址 0是 1否
      },
      goodsList: [],
      totalPrice: 0, // 商品总价
      freight: 0, // 运费
      totalNum: 0, // 多少件商品
      conpouText: '选择优惠券',
      conpou: {  //  优惠卷
        couponAmount: 0,
        couponId: ''
      },
      tids: '', // 商品  商品1,商品2 ……
    }
  },
  activated(){
    this.totalPrice = 0; // 商品总价
    this.freight = 0; // 运费
    this.totalNum = 0; // 多少件商品
    this.conpouText =  '选择优惠券';
    this.conpou = {  //  优惠卷
      couponAmount: 0,
      couponId: ''
    };
    this.tids = ''; // 商品  商品1,商品2 ……
    var backAddrerss = localStorage.getItem('address');
    backAddrerss = JSON.parse(backAddrerss);
    if (backAddrerss == '' || backAddrerss == null || backAddrerss == 'null') {
      this.getAddressData();
    } else {
      this.address = backAddrerss;
    }
    this.goodsList = JSON.parse(localStorage.getItem('selectGoods'));
    this.makeTotalPrice();
  },
  methods: {
    // 提交订单 按钮点击事件
    submitClick: function(){
      var self = this;
      if (self.address.id == '') {
        var conf = confirm('请选择收货地址');
        if (conf == true) {
          self.$router.push({
            path: '/address',
            query: {
              type: 0
            }
          });
        } else {
          return;
        }
      }else{;
        self.$axios.get('basic/commodity/createOrder.do',{
          params: {
            tids: self.tids,
            couponId: '', // 优惠卷ID
            openId: self.$utils.getOpenID() // openid
          }
        }).then(function (res){
          if (res.data.ret_code == 0) {
            self.wxBridgeReady(res.data.ret_data);
          } else {
            alert(res.data.ret_msg);
          }
        }).catch(function (error) {
          alert('网路链接失败');
        });
      }
    },
    // 掉起 微信支付
    wxBridgeReady:function(data){
      var self = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',{
          "appId":data.appId,     //公众号名称，由商户传入
          "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
          "nonceStr":data.nonceStr, //随机串
          "package":data.package,
          "signType":data.signType, //微信签名方式：
          "paySign":data.paySign //微信签名
        },
        function(res){
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if(res.err_msg == "get_brand_wcpay_request：ok" ){
            self.changeOrderStatus(data.oId,5); // 支付成功
          }else{
            self.changeOrderStatus(data.oId,6); // 支付失败
          }
        }
      );
    },
    // 修改订单状态
    changeOrderStatus: function(oId,buyState){
      var self = this;
      self.$axios.get('basic/commodity/modifyOrderState.do',{
        params: {
          oId: oId,   // 订单号
          buyState: buyState, // 状态： 5成功 6失败
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var type = buyState == 5 ? 1:0;
          self.$router.push({
            path: '/orders',
            query: {
              type: type
            }
          });
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    },
    // 选择优惠卷  点击事件
    selectConpouClick: function(){
      this.$router.push({
        path: '/coupon',
        query: {
          type: 1,
          price: this.totalPrice
        }
      });
    },
    // 计算商品总价
    makeTotalPrice: function(){
      var len = this.goodsList.length;
      var tempconpou = localStorage.getItem('conpouItem');
      this.conpou = JSON.parse(tempconpou);
      if(this.conpou == null){
        this.conpou = {
          couponAmount: 0,
          couponId: ''
        };
      }else{
        this.conpou.couponAmount = parseInt(this.conpou.couponAmount);
        this.conpouText = '满' + this.conpou.conditions + '减' +  this.conpou.couponAmount;
      }
      for(var i = 0; i < len; i ++){
        this.goodsList[i].buyNum = this.goodsList[i].buyNum == 0? 1: this.goodsList[i].buyNum;
        this.totalPrice = this.totalPrice + this.goodsList[i].price * this.goodsList[i].buyNum;
        this.freight = this.goodsList[i].freight;
        this.totalNum = this.totalNum + this.goodsList[i].buyNum;
        this.tids = this.tids + this.goodsList[i].tid + ',';
      }
      this.freight = parseInt(this.freight);
      this.totalPrice = this.totalPrice + this.freight - parseInt(this.conpou.couponAmount);
    },
    // 选择地址 点击事件
    changeAddressClick: function(){
      this.$router.push({
        path: '/address',
        query: {
          type: 0
        }
      });
    },
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
              self.address = res.data.ret_data[i];
            }
          }
        } else {
           alert(res.data.ret_msg);
        }
      }).catch(function (error) {
         alert('网络连接失败');
      });
    },
  },
  components:{
    GoodsItem
  }
}
</script>
<style scoped>
.confirmOrder {
  position: fixed;
  bottom: 110px;
  left: 0;
  right: 0;
  top: 0;
}
.sureOrder{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 100px;
  line-height: 100px;
  border-top: solid 1px #fafafa;
}
.order_detail {
  float: right;
  text-align: right;
  font-size: 24px;
  color: #444444;
  text-align: right;
  margin-right: 20px;
}
.order_detail span{
  font-size: 40px;
  color: red;
}
.order_btn {
  float: right;
  width: 140px;
  height: 70px;
  border-radius: 8px;
  background-color: #1AAD19;
  color: white;
  line-height: 70px;
  text-align: center;
  margin-top: 15px;
  margin-right: 10px;
}
.about{
  height: 60px;
  line-height: 60px;
  background-color: white;
  font-size: 28px;
}
.about_detail {
  float: right;
  margin-right: 10px;
  /* font-family: Arial; */
}
.message {
  height: 88px;
  line-height: 88px;
  color: #444444;
  font-size: 28px;
  width: 100%;
  background-color: white;
}
.message_title {
  float: left;
  padding-left: 10px;
}
.message_input {
  float: left;
  border: none;
  outline: none;
  width: 540px;
  height: 88px;
  line-height: 88px;
  padding: 0 20px;
}
.coupon {
  height: 88px;
  line-height: 88px;
  color: #444444;
  font-size: 28px;
  width: 100%;
  background-color: white;
  margin: 10px 0;
}
.coupon_select {
  float: right;
  padding-right: 40px;
  background-image: url(../../assets/images/u261.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
.confirm_address {
  width: 750px;
  padding-bottom: 20px;
  padding-top: 10px;
  background-color: white;
  background-image: url(../../assets/images/u651.png);
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: 100% 18px;
  position: relative;
}
.right_arrow {
  position: absolute;
  right: 0;
  width: 60px;
  top: 0;
  bottom: 0;
  background-image: url(../../assets/images/u261.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
.line1 {
  height: 30px;
  line-height: 30px;
  font-size: 28px;
  color: #444444;
  padding: 6px 10px;
  background-color: transparent;
  /* border-bottom: solid 1px #fafafa; */
}
.line1_name {
  float: left;
  font-size: 28px;
  color: #444444;
}
.line1_tel {
  float: right;
  margin-right: 50px;
}
.line2 {
  font-size: 26px;
  color: #666666;
  padding: 6px 10px;
}
.line2_detail {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 78px;
  margin-right: 50px;
}
</style>
