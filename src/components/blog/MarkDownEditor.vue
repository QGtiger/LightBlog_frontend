<!-- markdown 编辑器 -->
<template>
   <div>
         <MarkDown></MarkDown>
         <mavon-editor v-model="value"/>
   </div>
</template>

<script>
import MarkDown from 'vue-meditor';

export default {
components: {
    MarkDown
},
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