<!-- loading 组件 -->
<template>
   <div class='LBLoading-cont'>
      <div style="height:50px;">
         <div :class="'rect'+index +' rect'" v-for="index of rectNum" :key="index" :style="{animationDelay: -1.3+index*0.1+'s'}">

         </div>
      </div>
      <div class="loading-text">正在加载...</div>
   </div>
</template>

<script>

export default {
   name: 'LBLoading',
   props: {
      rectNum: {
         type: Number,
         default() {
            return 5
         }
      }
   },
   components: {},
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
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@keyframes stretchdelay{
   0%, 40%, 100% {
		transform: scaleY(0.4);
		-webkit-transform: scaleY(0.4);
   }  
   20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
   }
}
.LBLoading-cont{
   margin-top: 20px;
   display: flex;
   justify-content: center;
   align-items: center;
   .rect{
      background-color: #66b1ff;
      height: 100%;
      width: 6px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
      animation: stretchdelay 1.2s infinite ease-in-out;
      margin: 0 2px;
   }
   .loading-text{
      padding-left: 20px;
   }
}
</style>