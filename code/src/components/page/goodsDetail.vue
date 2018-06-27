<template>
  <div class="goodsDetail">
    <!-- 轮播图 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in goodsDeatil.swiperData" :key="item">
            <img :src="item" />
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <!-- 商品描述 -->
    <div class="goodsDes">{{goodsDeatil.cName}}</div>
    <!-- 商品价格 -->
    <div class="goodsPrice">￥{{goodsDeatil.price}}</div>
    <!-- 商品运费和剩余数量 -->
    <div class="goodsNumFree">
      <div class="goodsPostFree">运费:￥{{goodsDeatil.freight}}</div>
      <div class="goodsNum">剩余:{{goodsDeatil.surplus}}</div>
    </div>
    <div class="detail">
      <div class="title">商品详情</div>
      <!-- <img :src="goodsDeatil.detail" /> -->
      <div class="detailHtml" v-html="goodsDeatil.details"></div>
    </div>
    <!-- 底部按钮 -->
    <div class="detailBottom">
      <div @click="goShop" class="goShop">店铺</div>
      <div @click="goShopcar" class="goShopcar">购物车</div>
      <div class="addShopcar" @click="addShopCar(cid)">加入购物车</div>
      <div class="sureBuy" @click="sureBuyClick(cid)">确认购买</div>
    </div>
    <!-- 立即购买 -->
    <div class="likeBuy" v-if="lijiBuy == true">
      <div class="likeBuy_line1">
        <img :src="goodsDeatil.imgUrl1" />
        <div class="bdesc">
          <div class="bdes2">{{goodsDeatil.cName}}</div>
          <div class="bprice">￥{{goodsDeatil.price}}</div>
        </div>
        <div @click="closeClick" class="close"></div>
      </div>
      <div class="likeBuy_line2">
        <div class="likeBuy_line2_left">
          <div>购买数量:</div>
          <div>剩余{{goodsDeatil.surplus}}件</div>
        </div>
        <div class="likeBuy_line2_right">
          <div @click="addClick1" class="add">+</div>
          <div class="add_num">{{buyAddNum}}</div>
          <div @click="jianClick1"  class="jian">-</div>
        </div>
      </div>
      <div @click="nextBtnClick1(cid)"  class="nextBtn">下一步</div>
    </div>
    <!-- 加入购物车 -->
    <div class="likeBuy" v-if="lijiCar == true">
      <div class="likeBuy_line1">
        <img :src="goodsDeatil.imgUrl1" />
        <div class="bdesc">
          <div class="bdes2">{{goodsDeatil.cName}}</div>
          <div class="bprice">￥{{goodsDeatil.price}}</div>
        </div>
        <div @click="closeClick" class="close"></div>
      </div>
      <div class="likeBuy_line2">
        <div class="likeBuy_line2_left">
          <div>购买数量:</div>
          <div>剩余{{goodsDeatil.surplus}}件</div>
        </div>
        <div class="likeBuy_line2_right">
          <div @click="addClick2" class="add">+</div>
          <div class="add_num">{{carAddNum}}</div>
          <div @click="jianClick2" class="jian">-</div>
        </div>
      </div>
      <div @click="nextBtnClick2(cid)" class="nextBtn2">加入购物车</div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
export default {
  name: 'goodsDetail',
  data () {
    return {
      cid: '', // 上个页面传递过来的
      goodsDeatil: {},
      buyAddNum: 1,
      carAddNum: 1,
      lijiBuy: false,
      lijiCar: false
    }
  },
  mounted() {
  },
  activated(){
    this.cid = this.$route.query.cid || '';
    this.buyAddNum = 1;
    this.carAddNum = 1;
    this.lijiBuy = false;
    this.lijiCar = false;
    if(this.cid == '' || this.cid == null){
      this.$router.push('/home');
    }
    this.getDetail();
  },
  methods: {
    closeClick(){
      this.lijiBuy = false;
      this.lijiCar = false;
    },
    addClick2(){
      this.carAddNum = this.carAddNum + 1;
    },
    addClick1(){
      this.buyAddNum = this.buyAddNum + 1;
    },
    jianClick1(){
      this.buyAddNum = this.buyAddNum - 1;
      if(this.buyAddNum <= 0){
        this.buyAddNum = 1;
      }
    },
    jianClick2(){
      this.carAddNum = this.carAddNum - 1;
      if(this.carAddNum <= 0){
        this.carAddNum = 1;
      }
    },
    getDetail(){
      var self = this;
      this.$axios.get('basic/commodity/findCommodityByCid.do',{
        params: {
          cid: self.cid
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var mySwiper =  new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            // pagination: '.swiper-pagination',
            pagination: {
              el: '.swiper-pagination',
            },
            autoplay: {
              delay: 2000,
            }
          })
          var swiperData = [res.data.ret_data.imgUrl1,res.data.ret_data.imgUrl2,res.data.ret_data.imgUrl3,res.data.ret_data.imgUrl4];
          self.goodsDeatil = res.data.ret_data;
          self.goodsDeatil.swiperData = swiperData;
          mySwiper.update();
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网络连接失败');
      });
    },
    goShop(){
      this.$router.push('/home');
    },
    // 去购物车
    goShopcar(){
      this.$router.push('/shopcar');
    },
    // 添加进购物车
    addShopCar: function(id){
      this.lijiCar = true;
    },
    // 立即购买下一步
    nextBtnClick1: function(id){
      var self = this;
      this.$axios.get('basic/commodity/lijigoumai.do',{
        params: {
          cId: id,
          buyNum: self.buyAddNum
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.lijiCar = false;
          var item = [res.data.ret_data]
          localStorage.setItem('selectGoods',JSON.stringify(item));
          self.$router.push('/confirmOrder')
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {})
    },
    // 加入购物车下一步
    nextBtnClick2: function(id){
      var self = this;
      this.$axios.get('basic/commodity/createCommodityListToyTrolley.do',{
        params: {
          cId: id,
          buyNum: self.carAddNum
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.lijiCar = false;
          alert('添加成功!',5000);
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {})
    },
    // 立即购买
    sureBuyClick: function(id){
      this.lijiBuy = true;
    }
  },
}
</script>
<style scoped>
.bdesc {
  position: absolute;
  left: 180px;
  top: 10px;
  bottom: 10px;
  height: 100px;
  right: 100px;
}
.bdes2 {
  font-size: 28px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 80px;
}
.bprice {
  font-size: 36px;
  color: #fe0100;
}
.nextBtn {
  width: 100%;
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: white;
  font-weight: bold;
  background-color: #ff6700;
  position: absolute;
  left: 0;
  bottom: 0;
}
.nextBtn2 {
  width: 100%;
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: white;
  font-weight: bold;
  background-color: #fe0100;
  position: absolute;
  left: 0;
  bottom: 0;
}
.likeBuy_line2 {
  height: 140px;
  width: 100%;
}
.likeBuy_line2_left {
  float: left;
  font-size: 30px;
  color: #333333;
  margin-left: 20px;
  margin-top: 20px;
}
.likeBuy_line2_right {
  float: right;
}
.likeBuy_line2_right div{
  float: left;
  width: 70px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin-top: 40px;
}
.likeBuy_line2_right .add {
  background-color: #d9d9d9;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.likeBuy_line2_right .jian {
  background-color: #d9d9d9;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-right: 20px;
}
.likeBuy {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 500px;
  width: 750px;
  background-color: white;
  z-index: 9999;
}
.likeBuy_line1 {
  height: 170px;
  position: relative;
  border-bottom: solid 1px #f2f2f2;
}
.likeBuy_line1 img{
  width: 140px;
  height: 150px;
  margin-top: 10px;
  margin-left: 20px;
}
.likeBuy_line1 .close{
  position: absolute;
  right: 20px;
  top: 10px;
  color: #999999;
  font-size: 40px;
  height: 80px;
  width: 80px;
  text-align: right;
  background-image: url(../../assets/images/close.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 30px 30px;
}
.detailHtml img{
  max-width: 750px;
  width: 750px !important;
  height: auto;
  overflow: hidden;
}
.swiper-container, .swiper-wrapper, .swiper-slide, .swiper-slide img {
  width: 100%;
  height: 500px;
}
.swiper-pagination {
  width: 730px;
  text-align: right;
}
.goodsDes {
  width: 710px;
  padding: 30px 20px 10px;
  color: #444444;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.goodsPrice {
  color: orangered;
  font-size: 36px;
  width: 710px;
  padding: 0 20px 10px;
}
.goodsNumFree {
  width: 100%;
  border-top: solid 1px #fafafa;
  border-bottom: solid 1px #fafafa;
  height: 70px;
  line-height: 70px;
  color: #999999;
  font-size: 26px;
}
.goodsPostFree {
  float: left;
  margin-left: 20px;
}
.goodsNum {
  float: right;
  margin-right: 20px;
}
.detail{
  margin-bottom: 120px;
}
.detail .title{
  margin-left: 20px;
  color: #333333;
  height: 70px;
  line-height: 70px;
}
img {
  width: 100%;
}
.detailBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 120px;
  border-top: solid 1px #fafafa;
  z-index: 100;
  background-color: white;
}
.goShop,.goShopcar {
  height: 60px;
  line-height: 60px;
  padding: 0 10px 0 50px;
  margin: 30px 0;
  width: 132px;
  text-align: center;
  font-size: 28px;
  background-position: 30px center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
  float: left;
}
.goShop{
  border-right: solid 2px #fafafa;
  background-image: url(../../assets/images/detail_shop2.png);
  background-position: 40px center;
}
.goShopcar {
  border-left: solid 2px #fafafa;
  background-image: url(../../assets/images/detail_car2.png);
}
.addShopcar,.sureBuy {
  height: 60px;
  line-height: 60px;
  padding: 30px 0;
  width: 180px;
  text-align: center;
  font-size: 28px;
  color: white;
  float: right;
}
.addShopcar{
  background-color: orangered;
}
.sureBuy {
  background-color: red;
}
</style>
