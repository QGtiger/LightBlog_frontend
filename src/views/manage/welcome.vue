<!-- 后台管理的欢迎界面 -->
<template>
   <div class='welcome'>
      <Title title="总览"></Title>
       <h1>welcome</h1>
   </div>
</template>

<script>
import Title from '@/components/title/title'

export default {
components: {Title},
data() {
   return {

   };
},
computed: {},
watch: {},
mounted() {

},
methods: {

},
created() {

},
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>