<template>
  <div class="orders">
    <div class="orderType">
      <div class="orderTypeItem" @click="orderTypeClick(item.index)" v-for="item in orderTypes" :key="item.index">
        <div :class="item.className">{{item.name}}</div>
      </div>
    </div>
    <div class="list" v-if="type == 0">
      <div v-if="order.buyState == 6 || order.buyState == 1" class="listItem" v-for="order in orders" :key="order.oId">
        <div class="list_status">待付款</div>
        <div class="goodsList">
          <GoodsItem
          v-for="goods in order.commodityList"
          :imgs="goods.imgUrl1"
          :desc="goods.cName"
          :price="goods.price"
          :num="goods.buyNum"
          :id="goods.cid"
          :key="goods.cid"></GoodsItem>
        </div>
        <div class="list_price">共{{order.commodityList.length}}件商品 合计：{{order.totalPrice}}(含运费0)  </div>
        <div class="list_bottom">
          <!-- <div @click="payClick">立即付款</div> -->
        </div>
      </div>
    </div>
    <div class="list" v-if="type == 1">
      <div v-if="order.buyState == 2 || order.buyState == 5" class="listItem" v-for="order in orders" :key="order.oId">
        <div class="list_status">待发货</div>
        <div class="goodsList">
          <GoodsItem
          v-for="goods in order.commodityList"
          :imgs="goods.imgUrl1"
          :desc="goods.cName"
          :price="goods.price"
          :num="goods.buyNum"
          :id="goods.cid"
          :key="goods.cid"></GoodsItem>
        </div>
        <div class="list_price">共{{order.commodityList.length}}件商品 合计：{{order.totalPrice}}(含运费0)  </div>
        <div class="list_bottom">
          <!-- <div>立即付款</div> -->
        </div>
      </div>
    </div>
    <div class="list" v-if="type == 2">
      <div v-if="order.buyState == 3" class="listItem" v-for="order in orders" :key="order.oId">
        <div class="list_status">已发货</div>
        <div class="goodsList">
          <GoodsItem
          v-for="goods in order.commodityList"
          :imgs="goods.imgUrl1"
          :desc="goods.cName"
          :price="goods.price"
          :num="goods.buyNum"
          :id="goods.cid"
          :key="goods.cid"></GoodsItem>
        </div>
        <div class="list_price">共{{order.commodityList.length}}件商品 合计：{{order.totalPrice}}(含运费0)  </div>
        <div class="list_bottom">
          <!-- <div>立即付款</div> -->
        </div>
      </div>
    </div>
    <div class="list" v-if="type == 3">
      <div v-if="order.buyState == 4" class="listItem" v-for="order in orders" :key="order.oId">
        <div class="list_status">已完成</div>
        <div class="goodsList">
          <GoodsItem
          v-for="goods in order.commodityList"
          :imgs="goods.imgUrl1"
          :desc="goods.cName"
          :price="goods.price"
          :num="goods.buyNum"
          :id="goods.cid"
          :key="goods.cid"></GoodsItem>
        </div>
        <div class="list_price">共{{order.commodityList.length}}件商品 合计：{{order.totalPrice}}(含运费0)  </div>
        <div class="list_bottom">
          <!-- <div>立即付款</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/common/goodsItem.vue'
export default {
  name: 'orders',
  data () {
    return {
      type: 0,
      orderTypes: [
        {
          index: 0,
          name: '待付款',
          className: 'order_item_active'
        },
        {
          index: 1,
          name: '待发货',
          className: 'order_item'
        },
        {
          index: 2,
          name: '已发货',
          className: 'order_item'
        },
        {
          index: 3,
          name: '已完成',
          className: 'order_item'
        }
      ],
      orders: []
    }
  },
  mounted(){
    this.type = this.$route.query.type || 0;
    this.orderTypeClick(this.type);
  },
  activated(){
    this.getOrderList();
  },
  methods: {
    // 支付 按钮点击事件
    payClick: function(){

    },
    // 获取订单列表
    getOrderList: function(){
      var self = this;
      var code = this.$utils.getquerystring('code') || '';
      this.$axios.get('basic/commodity/findOrderList.do',{
        params: {}
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var len = res.data.ret_data.length;
          for(var i = 0; i < len; i ++){
            var goods = res.data.ret_data[i].commodityList;
            var len2 = goods.length;
            var totalPrice = 0;
            for(var j = 0; j < len2; j++){
              totalPrice = totalPrice + goods[j].buyNum * goods[j].price;
            }
            res.data.ret_data[i].totalPrice = totalPrice;
          }
          self.orders = res.data.ret_data;
          console.log(self.orders);
        }
      }).catch(function (error) {

      });
     },
    // 订单类型点击事件
    orderTypeClick: function(index){
      var len = this.orderTypes.length;
      this.type = index;
      for(var i = 0; i < len; i ++){
        if (this.orderTypes[i].index == index) {
          this.orderTypes[i].className = 'order_item_active'
        }else{
          this.orderTypes[i].className = 'order_item'
        }
      }
    }
  },
  components:{
    GoodsItem
  }
}
</script>
<style scoped>
.list {
  width: 730px;
  padding: 10px;
  background-color: white;;
}
.listItem {
  border-bottom: solid 10px #fafafa;
}
.list_status {
  font-size: 14px;
  color: red;
  height: 30px;
  line-height: 30px;
  width: 100%;
  text-align: right;
  background-color: white;
  border-bottom: solid 1px #fafafa;
}
.list_price {
  font-size: 24px;
  color: #999999;
  text-align: right;
  border-bottom: solid 1px #fafafa;
}
.list_bottom {
  height: 70px;
}
.list_bottom div{
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  color: white;
  float: right;
  background-color: red;
  border-radius: 6px;
  font-size: 24px;
  margin-top: 15px;
}
.goodsList {
  widows: 690px;
  margin: 10px auto;
  background-color: #fafafa;
}
.orderType {
  width: 710px;
  padding: 0 20px;
  height: 80px;
  border-bottom: solid 1px #c1c1c1;
  background-color: white;
}
.orderTypeItem{
  width: 25%;
  height: 76px;
  line-height: 76px;
  text-align: center;
  color: #444444;
  float: left;
  font-size: 30px;
}
.order_item {
  margin: auto;
  text-align: center;
  width: 100px;
  border-bottom: solid 4px white;
}
.order_item_active {
  width: 100px;
  text-align: center;
  margin: auto;
  border-bottom: solid 4px red;
}
</style>
