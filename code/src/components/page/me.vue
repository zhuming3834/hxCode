<template>
  <div class="me">
    <div class="content">
      <div class="userInfo">
        <div class="userInfo_left">
          <img :src="wxdata.headimgurl" />
        </div>
        <div class="userInfo_middle">
          <div class="userInfo_name">{{wxdata.nickname || '昵称'}}</div>
          <div class="userInfo_tel">{{userInfo.phoneNum}}</div>
        </div>
        <div v-if="userInfo.phoneNum == '' " class="userInfo_right" @click="loginClick">{{loginText}}</div>
      </div>
      <div class="myOrder">我的订单<div @click="allOrdersClick">查看全部订单</div></div>
      <div class="orderType">
        <div class="orderItem" @click="orderItemClick(item.index)"  v-for="item in orderTypes" v-bind:style="{backgroundImage:'url(' + item.imagePath + ')'}" :key="item.index">{{item.name}}</div>
      </div>
      <div class="meunList">
        <div class="meunItem" @click="meunItemClick(item.index)" v-for="item in menuList" :key="item.index">{{item.name}}</div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/common/Nav.vue'
export default {
  name: 'me',
  data () {
    return {
      loginText: '绑定手机号',
      isShowLogin: true, // 是否显示登录按钮
      wxdata: {  // 微信数据
        openid: "",
        nickname: "",
        sex: 1,
        language: "",
        city: "",
        province: "",
        country: "",
        headimgurl: "",
        privilege: []
      },
      userInfo: {
        headerImage: require('../../assets/images/u242.png'),
        nickname: '罗斯才尔德',
        phoneNum: ''
      },
      orderTypes: [
        {
          index: 0,
          name: '待付款',
          imagePath: require('../../assets/images/order_pay2.png')
        },
        {
          index: 1,
          name: '待收货',
          imagePath: require('../../assets/images/order_send2.png')
        },
        {
          index: 2,
          name: '已发货',
          imagePath: require('../../assets/images/order_sending2.png')
        },
        {
          index: 3,
          name: '已完成',
          imagePath: require('../../assets/images/order_done2.png')
        }
      ],
      menuList: [
        {
          index: 0,
          name: '修改手机号',
          path: 'modifyTel',
        },
        {
          index: 1,
          name: '收货地址',
          path: 'address',
        },
        {
          index: 2,
          name: '我的优惠券',
          path: 'coupon',
        },
        {
          index: 3,
          name: '意见反馈',
          path: 'feedBack',
        },
         {
          index: 4,
          name: '退出登录',
          path: '',
        }
      ]
    }
  },
  activated(){
    this.userInfo = this.$utils.getUserInfo();
    this.wxdata = this.$utils.getWxDate();
  },
  methods: {
    // 登录点击事件
    loginClick: function(){
      this.$router.push({
        path: '/login',
        query: {
          title: this.loginText
        }
      });
    },
    // 查看全部订单
    allOrdersClick: function(){
      this.$router.push({
        path: '/orders',
        query: {
          type: 0
        }
      });
    },
    // 订单类型点击事件
    orderItemClick(index){
      this.$router.push({
        path: '/orders',
        query: {
          type: index
        }
      });
    },
    // 菜单列表点击事件
    meunItemClick(index){
      var path = '/' + this.menuList[index].path;
      if (index == 2) {
        this.$router.push({
          path: path,
          query: {
            type: 0
          }
        });
      } else if(index == 4){
        // alert('您确定要退出登录吗？');
        // localStorage.clear();
        window.location.href = 'http://m.ijiakj.com/auth.html'
        weui.confirm('您确定要退出登录吗？', {
          title: '提示',
          buttons: [{
              label: '取消',
              type: 'default',
              onClick: function(){ console.log('no') }
          }, {
              label: '确定',
              type: 'primary',
              onClick: function(){
                localStorage.clear();
                window.location.href = 'http://m.ijiakj.com/auth.html'
              }
          }]
        });
      }else{
        this.$router.push(path);
      }
    }
  },
  components: {
    NavFooter
  },
}
</script>
<style scoped>
.userInfo {
  height: 120px;
  width: 710px;
  padding: 40px 20px;
  background-color: white;
}
.userInfo_left {
  float: left;
}
.userInfo_left img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.userInfo_middle {
  float: left;
  height: 80px;
  padding: 20px;
}
.userInfo_name {
  font-size: 30px;
  color: #444444;
  margin-top: 4px;
}
.userInfo_tel{
  font-size: 26px;
  color: #666666;
}
.userInfo_right {
  float: right;
  background-color: #1AAD19;
  color: white;
  padding: 8px 12px;
  height: 44px;
  line-height: 44px;
  font-size: 24px;
  border-radius: 30px;
  margin-top: 30px;
}
.myOrder {
  height: 80px;
  line-height: 80px;
  width: 730px;
  padding-left: 20px;
  border-top: solid 1px #fafafa;
  border-bottom: solid 1px #fafafa;
  color: #444444;
  font-size: 30px;
  background-color: white;
}
.myOrder div{
  float: right;
  font-size: 24px;
  color: #666666;
  padding-right: 40px;
  background-image: url(../../assets/images/u261.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
.orderType {
  width: 100%;
  height: 140px;
  background-color: white;
}
.orderItem {
  width: 25%;
  float: left;
  text-align: center;
  padding-top: 90px;
  background-position: center 20px;
  background-repeat: no-repeat;
  background-size: 70px 70px;
  color: #444444;
  font-size: 24px;
}
.meunList {
  background-color:white;
  width: 100%;
  margin-top: 10px;
  color: #444444;
  font-size: 30px;
}
.meunItem {
  height: 80px;
  line-height: 80px;
  padding: 0 20px;
  width: 710px;
  border-bottom: solid 1px #fafafa;
  background-image: url(../../assets/images/u261.png);
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
}
</style>
