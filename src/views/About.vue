<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <mark-down :initialValue="value" style="width: 1000px;" :theme="Github"/> -->
    <mavon-editor v-model="value" ref="editor" @imgAdd="handleAddImg" @imgDel="handleDelImage"></mavon-editor>
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
    CardBlog
  },
  data() {
    return {
      value: "> 年号呀```sadasd```",
      img_file: {}
    }
  },
  methods: {
    handleTest(){
      console.log(this.$refs.editor.d_render)
      console.log(this.img_file)
    },
    handleAddImg(pos, $file){
      console.log(pos);
      console.log($file)
      this.img_file[pos] = $file;
    },
    handleDelImage(pos, $file) {
      console.log(pos, typeof(pos));
      delete this.img_file[pos]
    }
  },
  mounted() {
  }
}
</script>
<style lang="less">
</style>