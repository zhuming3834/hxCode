<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>
<style>
  html,body {
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  }
  .weui-animate-fade-out{
    -webkit-animation:d ease 2s forwards !important;
    animation:d ease 2s forwards !important;
  }
</style>


