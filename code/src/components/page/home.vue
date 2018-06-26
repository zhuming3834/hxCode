<template>
  <div class="home">
    <div class="mescroll content" id="mescroll">
      <div id="mescroll_content">
        <!-- 轮播图 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in swiperData" :key="item.id">
                <img :src="item.imgs" />
              </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
        <!-- 商品列表 -->
        <div class="goodsList">
          <div :class="[idx%2 == 0 ? 'goodsItem1': 'goodsItem2']" v-for="(item, idx) in goodsList" :key="idx">
            <img @click="goodsItemClick(item.cid)" class="goodsImg" :src="item.imgUrl1"  />
            <div class="desc">{{item.cName}}</div>
            <div class="bay">
              <div class="price"><span>￥</span>{{item.price}}</div>
              <div @click="addCarClcik(item.cid)" class="car"></div>
            </div>
          </div>
          <br clear="all" />
        </div>
      </div>
    </div>
    <!-- 底部Tab切换 -->
    <nav-footer></nav-footer>
  </div>
</template>

<script>
// swiper  轮播图
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
// 上拉加载更多
import '../../assets/mescroll/mescroll.js'
import '../../assets/mescroll/mescroll.css'
// 底部Tab切换
import NavFooter from '@/components/common/Nav.vue'

export default {
  name: 'home',
  data () {
    return {
      mescroll: null,
      page: 0,  // 当前页
      pageSize: 100, // 每页的个数
      swiperData: [
        {
          id: 1,
          imgs: require('../../assets/images/u28.png')
        },
        {
          id: 2,
          imgs: require('../../assets/images/u30.png')
        },
        {
          id: 3,
          imgs: require('../../assets/images/u32.png')
        },
        {
          id: 4,
          imgs: require('../../assets/images/u34.png')
        }
      ],
      // 商品列表
      goodsList: []
    }
  },
  mounted() {
    var self = this;
    self.mescroll = new MeScroll("mescroll", {
      up: {
        callback: self.upCallback, //上拉回调
        auto: true,
        empty:{ //配置列表无任何数据的提示
          warpId:"mescroll_content",
        },
      },
      down: {
        callback: self.downCallBack, //下拉回调
        auto: false,
        use: false
      }
    }),
    new Swiper ('.swiper-container', {
      loop: true,
      // 如果需要分页器
      // pagination: '.swiper-pagination',
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2000,
      }
    });
    // this.upCallback();
  },
  activated(){
    this.getOpenID2();
  },
   methods: {
     // 获取用户的 openid
     getOpenID2: function(){
      var self = this;
      var openid = self.$utils.getOpenID() || '';
      var code = self.$utils.getquerystring('code') || '';
      self.$axios.get('user/user/getWxUserInfo.do',{
        params: {
          state: 123,
          code: code
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          self.$utils.setWxData(res.data.ret_data);
          if(self.$utils.getUserID() == ''){
            self.$router.push('/login');
          }else{
            self.autoLogin(res.data.data.openid);
          }
        }else{
          // window.location.href = 'http://gitlab.hgdqdev.cn/auth.html'
        }
      }).catch(function (error) {});
     },
     downCallBack: function(){
       console.log('downCallBack');
     },
     // 自动登录
     autoLogin: function(openId){
      var self = this;
      this.$axios.get('user/user/autoLogin.do',{
        params: {
          openId: openId,
        }
      }).then(function (res){
        // alert(JSON.stringify(res.data));
        if (res.data.ret_code == 0) {
          // alert('自动登录成功')
          self.$utils.setUserInfo(res.data.ret_data);
        } else{
          // alert('自动登录失败');
        }
      }).catch(function (error) {

      });
     },
    // 上拉加载更多
    upCallback: function(){
      console.log('upCallback');
      var self = this;
      this.$axios.get('basic/commodity/findCommodityList.do',{
        params: {
          rowNum: self.page,
          limit: self.pageSize
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          var totalPage = (res.data.ret_data.rows/self.pageSize).toString();
          if (totalPage.indexOf('.') != -1) { // 包含  小数
            totalPage = parseInt(totalPage) + 1;
            totalPage = totalPage;
          } else {  // 整数
            totalPage = totalPage;
          }
          if (self.page == 1) {
            self.goodsList = res.data.ret_data.data;
          } else {
            self.goodsList = self.goodsList.concat(res.data.ret_data.data);
          }
          self.page = self.page + 1;
          if (self.page >= totalPage) {
            self.page = totalPage;
          }
          var len = self.goodsList.length;
        } else {

        }
        var cur_len = res.data.ret_data.data.length;
        self.mescroll.endByPage(cur_len,totalPage);
      }).catch(function (error) {
        self.mescroll.endErr();
      });
    },
    // 商品点击进商品详情
    goodsItemClick(id){
      console.log('详情');
      this.$router.push({
        path: '/goodsDetail',
        query: {
          cid: id
        }
      });
    },
    // 添加到购物车
    addCarClcik: function(id){
      var self = this;
      this.$axios.get('basic/commodity/createCommodityListToyTrolley.do',{
        params: {
          cId: id,
          buyNum: 1
        }
      }).then(function (res){
        if (res.data.ret_code == 0) {
          weui.topTips('添加成功!');
        } else {
          alert(res.data.ret_msg);
        }
      }).catch(function (error) {
        alert('网路链接失败');
      });
    }
  },
  components: {
      NavFooter
    },
}
</script>
<style scoped>

  .mescroll-upwarp {
    min-height: 0 !important;
    height: 30px !important;
    z-index: 0;
    margin-top: 1000px;
  }
  .swiper-container, .swiper-wrapper, .swiper-slide, img {
    width: 100%;
    height: 364px;
  }

  .swiper-pagination {
    width: 730px;
    text-align: right;
  }
  .goodsList {
    width: 740px;
    margin: auto;
    padding-bottom: 20px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
.goodsList::before, .container::after {
    content:"";
    display:table;
}
.goodsList::after {
    clear:both;
}
  .goodsItem1 {
    width: 359px;
    margin: 0 0 6px 3px;
    /* float: left; */
    display: inline-table;
    border: 1px solid #fafafa;
    text-align: center;
    background-color: white;
  }
  .goodsItem2 {
    width: 359px;
    margin: 0 3px 6px 0;
    /* float: right; */
    display: inline-table;
    border: 1px solid #fafafa;
    text-align: center;
    background-color: white;
  }
  .goodsImg {
    width: 360px;
    height: 360px;
  }
  .desc {
    text-align: left;
    font-size: 20px;
    color: #444444;
    padding: 0 6px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    height: 80px;
  }
  .bay {
    padding-bottom: 10px;
    height: 60px;
  }
  .price {
    float: left;
    color: orangered;
    font-size: 36px;
  }
  .price span {
    margin-right: 8px;
  }
  .car {
    float: right;
    margin-right: 8px;
    width: 60px;
    height: 60px;
    background-color: orangered;
    border-radius: 50%;
    background-image: url(../../assets/images/home_car.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 60px 60px;
  }
</style>
