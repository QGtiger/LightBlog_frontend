<!-- 博客首页缩略显示 -->
<template>
   <div class='blog-card'>
       <el-row :gutter="10">
           <el-col :span="16">
               <div class="blog-title">测试首页Card</div>
               <div class="blog-text">实习之路 实习啦，希望再实习期间能把我的这个博客网站成功的向前后端分离进发。前端页面用vue重构下，弄好看点，目标人群要明确点。加油吧 ...</div>
           </el-col>
           <el-col :span="8">
                <el-image :src="src"></el-image>
           </el-col>
       </el-row>
   </div>
</template>

<script>

export default {
components: {},
data() {
   return {
       src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
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
.blog-card{
    width: 1000px;
    margin:0 auto;
    height: 200px;
    color: #fff;
}
</style>