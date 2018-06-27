<template>
  <div class="feedBack">
    <textarea v-model="feedBack" placeholder="请写下您对我们的建议~"></textarea>
    <div @click="sendBtnClick" class="sendBtn">提交</div>
  </div>
</template>

<script>
export default {
  name: 'feedBack',
  data () {
    return {
      feedBack: '',
    }
  },
  methods: {
    // 提交按钮点击事件
    sendBtnClick: function(){
      setTimeout(function(){
        alert('提交成功!');
      },1500)
    }
  },
}
</script>
<style scoped>
textarea {
  width: 688px;
  height: 710px;
  resize: none;
  margin: 40px 20px;
  padding: 10px;
  /* border: solid 1px #fafafa; */
  border-radius: 4px;
}
.sendBtn {
  width: 600px;
  background-color: #1AAD19;
  color: white;
  text-align: center;
  height: 88px;
  line-height: 88px;
  margin: 200px auto;
  border-radius: 8px;
}
</style>
