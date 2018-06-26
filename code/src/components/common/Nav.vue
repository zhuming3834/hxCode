<template>
	<div id="myNave">
		<div class="myNave_item" v-for="item in navs" :key="item.name">
			<div v-if="$route.name == item.name" @click="navClick(item.name)" :class="item.className_active">{{item.title}}</div>
      <div v-else @click="navClick(item.name)" :class="item.className">{{item.title}}</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'myNave',
  data () {
    return {
      navs: [
      	{
      		name: 'home',
      		title: '首页',
      		className: 'home',
      		className_active: 'home_active'
      	},
      	{
      		name: 'shopcar',
      		title: '购物车',
      		className: 'shopcar',
      		className_active: 'shopcar_active'
      	},
      	{
      		name: 'me',
      		title: '我的',
      		className: 'me',
      		className_active: 'me_active'
      	},
      ]
    }
  },
  methods: {
    navClick(name){
      this.$router.push(name);
    }
  }
}
</script>
<style>
  .content {
    position: fixed;
    top: 0;
    bottom: 100px;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fafafa;
    height: auto;
  }
  #myNave {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    widows: 100%;
    height: 100px;
    background-color: white;
    border-top: solid 1px #fafafa;
    z-index: 9999;
  }
  .myNave_item {
    float: left;
    width: calc((100% - 2px) / 3);
    text-align: center;
    height: 100px;
  }
  .myNave_item div{
    width: 100%;
    background-position: center 4px;
    background-repeat: no-repeat;
    background-size: 62px 62px;
    height: 30px;
    line-height: 30px;
    padding: 62px 0 4px 0;
    font-size: 16px;
  }
  .home {
    background-image: url(../../assets/images/home.png);
    color: #999999;
    border-right: solid 1px #fafafa;
  }
  .home_active {
    background-image: url(../../assets/images/home_active.png);
    color: #ff6600;
    border-right: solid 1px #fafafa;
  }
  .shopcar {
    background-image: url(../../assets/images/shopcar.png);
    color: #999999;
    border-right: solid 1px #fafafa;
  }
  .shopcar_active {
    background-image: url(../../assets/images/shopcar_active.png);
    color: #ff6600;
    border-right: solid 1px #fafafa;
  }
  .me {
    background-image: url(../../assets/images/me.png);
    color: #999999;
  }
  .me_active {
    background-image: url(../../assets/images/me_active.png);
    color: #ff6600;
  }
</style>
