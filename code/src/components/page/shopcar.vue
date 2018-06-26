<template>
  <div class="shopcar">
    <div class="content">
      <div v-if="isShow == true" class="topArea">
        <div @click="deleteBtnClick" class="delete">删除</div>
        <div @click="cancleBtnClick" class="cancle">取消</div>
      </div>
      <div class="goodsItem" v-for="item in goodsList" :key="item.cid">
          <div v-bind:class="[item.ischeck ? 'goodsLeft': 'goodsLeft2']" @click="checkBoxClick(item.tid)"></div>
          <!-- <div v-else @click="checkBoxClick(item.tid)" class="goodsLeft2"></div> -->
          <div class="goodsMiddel" @click="itemClick(item.cid)">
            <img :src="item.imgUrl1" />
          </div>
          <div class="goodsRight">
            <div class="goodsRight_title">{{item.cName}}</div>
            <div class="goodsRight_bottom">
              <div class="goodsPrice"><span>￥</span>{{item.price}}</div>
              <div class="goodsNum">x{{item.buyNum}}</div>
            </div>
          </div>
        </div>
    </div>
    <div class="car_bottom">
      <div @click="allCheckClick" v-bind:class="[isAll ? 'car_bottom_left': 'car_bottom_left2']">
        全选
        <span class="allNum">共<span style="color: red;">{{allNum}}</span>件商品</span>
        <span class="allPrice">合计<span style="color: red;">{{allPrice}}</span>元</span>
      </div>
      <div @click="confirmClick" class="car_bottom_right">结算</div>
      <div @click="editClick" class="car_bottom_edit">编辑</div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/common/Nav.vue'
export default {
  name: 'shopcar',
  data () {
    return {
      isShow: false,
      isAll: false,
      allPrice: 0, // 总价
      allNum: 0, // 总共多少件商品
      cIds: '', // 选中的商品集合  id1,id2, ……
      goodsList: [],
      selectGoods: [], // 选中的商品集合
    }
  },
  activated(){
    this.getCartData();
  },
  watch: {
    goodsList: {  // 这监听对象值的改变
      handler(curVal,oldVal){
        var len = this.goodsList.length;
        this.allPrice = 0;
        this.allNum = 0;
        var count = 0;
        this.cIds = '';
        this.selectGoods = [];
        for(var i = 0; i < len; i ++){
          if (this.goodsList[i].ischeck == true) {
            this.allNum = this.allNum + 1;
            this.allPrice = this.allPrice + this.goodsList[i].price;
            this.cIds = this.cIds + this.goodsList[i].tid + ',';
            this.selectGoods.push(this.goodsList[i]);
            count ++ ;
          }
        }
        if (count == len) {
          this.isAll = true;
        } else {
          this.isAll = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    // 获取购物车商品数量
    getCartData: function(){
      var self = this;
      this.$axios.get('basic/commodity/findCommodityListByTrolley.do',{
        params: {}
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var len = res.data.ret_data.length;
          for(var i = 0; i < len; i ++){
            res.data.ret_data[i].ischeck = false;
          }
          self.goodsList = res.data.ret_data;
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    },
    // checkbox点击事件
    checkBoxClick: function(id){
      var len = this.goodsList.length;
      for(var i = 0;i < len; i ++){
        if (this.goodsList[i].tid == id) {
          this.goodsList[i].ischeck = this.goodsList[i].ischeck == true ? false : true;
        }
      }
    },
    // 全选按钮点事件
    allCheckClick: function(){
      var len = this.goodsList.length;
      if (this.isAll == true) {
        this.isAll = false;
        for(var i = 0;i < len; i ++){
          this.goodsList[i].ischeck = false;
        }
      } else {
        this.isAll = true;
        for(var i = 0;i < len; i ++){
          this.goodsList[i].ischeck = true;
        }
      }
    },
    // 商品点击事件
    itemClick(id){
      this.$router.push({
        path: '/goodsDetail',
        query: {
          cid: id
        }
      });
    },
    // 结算 按钮点击事件
    confirmClick: function(){
      if(this.selectGoods.length == 0){
        alert('请先选择商品');
        return;
      }
      var selectGoodsStr = JSON.stringify(this.selectGoods);
      localStorage.setItem('selectGoods',selectGoodsStr);
      var self = this;
      setTimeout(function(){
        self.$router.push('/confirmOrder');
      },200);
    },
    // 编辑按钮点击事件
    editClick: function(){
      this.isShow = true;
    },
    // 删除按钮点击事件
    deleteBtnClick: function(){
      var self = this;
      if (self.cIds == '') {
        alert('请先选择您要删除的商品');
        return;
      }
      self.cIds = self.cIds.substring(0,self.cIds.length - 1);
      this.$axios.get('basic/commodity/removeCommodityListToTrolley.do',{
        params: {
          tIds: self.cIds
        }
      }).then(function (res){
        console.log(res);
        if (res.data.ret_code == 0) {
          self.isShow = false;
          self.getCartData();
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    },
    // 取消按钮点击事件
    cancleBtnClick: function(){
      this.isShow = false;
    }
  },
  components: {
      NavFooter
    },
}
</script>
<style scoped>
.topArea {
  height: 80px;
  width: 100%;
  background-color: white;
}
.topArea div{
  float: right;
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
  width: 120px;
  text-align: center;
  color: white;
  font-size: 30px;
}
.cancle{
  background-color: #09BB07;
}
.delete{
  background-color: #F43530;
}
.content {
  bottom: 201px;
}
.car_bottom {
  height: 88px;
  line-height: 88px;
  background-color: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 101px;
}
.car_bottom_left {
  float: left;
  background-image: url(../../assets/images/check_box_ok.png);
  background-position: 14px center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
  padding-left: 60px;
  color: #333333;
}
.car_bottom_left span,.car_bottom_left2 span{
  font-size: 24px;
}
.car_bottom_left2 {
  float: left;
  background-image: url(../../assets/images/check-box-no.png);
  background-position: 14px center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
  padding-left: 60px;
  color: #333333;
}
.car_bottom_right {
  width: 140px;
  background-color: red;
  color: white;
  text-align: center;
  float: right;
}
.car_bottom_edit{
  width: 140px;
  background-color: #1AAD19;
  color: white;
  text-align: center;
  float: right;
}
.goodsItem {
  height: 180px;
  /* width: 730px; */
  margin: 8px 10px;
  padding: 20px 10px;
  background-color: white;
}
.goodsLeft {
  width: 60px;
  height: 180px;
  line-height: 180px;
  float: left;
  background-image: url(../../assets/images/check_box_ok.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.goodsLeft2 {
  width: 60px;
  height: 180px;
  line-height: 180px;
  float: left;
  background-image: url(../../assets/images/check-box-no.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size: 36px 36px;
}
.goodsMiddel {
  float: left;
  width: 180px;
  height: 180px;
}
.goodsItem img {
  width: 180px;
  height: 180px;
}
.goodsRight {
  float: left;
  height: 160px;
  padding: 10px 10px 0 20px;
  width: 440px;
  position: relative;
}
.goodsRight_title {
  color: #444444;
  font-size: 28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goodsRight_bottom {
  height: 40px;
  position: absolute;
  top: 120px;
  right: 10px;
  left: 10px;
}
.goodsPrice {
  float: left;
  color: orangered;
  font-size: 36px;
}
.goodsPrice span {
  margin-right: 8px;
}
.goodsNum {
  float: right;
}

</style>
