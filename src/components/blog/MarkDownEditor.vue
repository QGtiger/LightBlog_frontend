<!-- markdown 编辑器 -->
<template>
   <div>
      <mavon-editor v-model="value"  ref="editor"></mavon-editor>
   </div>
</template>

<script>

export default {
   props: ['value'],
   components: {
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