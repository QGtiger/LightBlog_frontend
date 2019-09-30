<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <mark-down :initialValue="value" style="width: 1000px;" :theme="Github"/> -->
    <mavon-editor v-model="value"  ref="editor"></mavon-editor>
    <el-button type="primary" @click="handleTest">显示内容console</el-button>
    <transition name="el-fade-in-linear">
      <mavon-editor
        class="md"
        :value="value"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true"
        v-show="showEditor"
      ></mavon-editor>
    </transition>
    <CardBlog></CardBlog>
  </div>
</template>
<script>
import CardBlog from '@/components/blog/CardBlog';
import request from '@/utils/request';
export default {
  components: {
    CardBlog,
  },
  data() {
    return {
      value: "> 年号呀```sadasd```",
      renderHtml: '',
      showEditor: false
    }
  },
  methods: {
    handleTest(){
      console.log(this.$refs.editor.d_render)
      this.renderHtml = this.$refs.editor.d_render;
      this.showEditor = true;
      request({
        url:'/account/test',
        method: 'get'
      }).then(res=>{
        console.log(res)
      }).catch(error=>{
        console.log(error);
      })
    }
  }
}
</script>
<style lang="less">
</style>