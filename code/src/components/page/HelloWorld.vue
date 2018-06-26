<template>
  <div class="hello">
    <div class="text">我是测试测vm</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
  .text{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
</style>
