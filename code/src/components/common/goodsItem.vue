<template>
  <div id="goodsItemDiv">
    <div class="goodsItem" @click="goodsItemClick(id)">
        <div class="goodsItem_left">
          <img :src="imgs"  />
        </div>
        <div class="goodsItem_right">
          <div class="goodsItem_desc">{{desc}}</div>
          <div class="goodsItem_pn">
            <div class="goodsItem_price">￥{{price}}</div>
            <div class="goodsItem_num">x{{num}}</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'goodsItemDiv',
  props: {
    imgs: String,
    desc: String,
    price: Number,
    id: String,
    num: Number,
  },
  methods: {
    goodsItemClick: function(id){
      this.$router.push({
        path: '/goodsDetail',
        query: {
          id: id
        }
      });
    }
  }
}
</script>

<style scoped>
#goodsItemDiv {
  widows: 690px;
  margin: 10px auto;
  background-color: #fafafa;
}
.goodsItem {
  height: 120px;
  border-bottom: solid 1px #fafafa;
  background-color: white;
}
.goodsItem_left {
  float: left;
  width: 120px;
  height: 100px;
  padding-top: 10px;
  text-align: center;
}
.goodsItem_left img {
  height: 100px;
  will-change: 100px;
}
.goodsItem_right {
  float: left;
}
.goodsItem_desc {
  float: left;
  font-size: 28px;
  color: #444444;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 440px;
  height: 80px;
  padding: 10px 0 10px 20px;
}
.goodsItem_pn {
  float: right;
  text-align: right;
  width: 140px;
  padding: 10px 0;
}
.goodsItem_price {
  font-size: 24px;
  color: #444444;
}
.goodsItem_num{
  font-size: 24px;
  color: #999999;
}
</style>
