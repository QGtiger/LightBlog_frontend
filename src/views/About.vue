<template>
  <div class="about">
    <h1>This is an about page</h1>

  <div class="comment-test" style="margin: 100px auto;">
    <lb-comments
     :currentUser="this.$store.state.username"></lb-comments>
  </div>

  

    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <span>123123123213</span>
    </el-tooltip>

    

    <el-popconfirm
      title="这是一段内容确定删除吗？"
      @onConfirm="handleTestPopConfirm"
      :confirmButtonText="'233'"
    >
      <span slot="reference">删除</span>
    </el-popconfirm>
    <!-- <mark-down :initialValue="value" style="width: 1000px;" :theme="Github"/> -->
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="staggered-fade" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <p v-if="show">hellon\nasda asdsad<br/>asdasd<br/>asdasdsad<br/>asdasd<br/>asdasdasd</p>
  </transition>
    <mavon-editor v-model="value" ref="editor" :toolbars="toolbars" @imgAdd="handleAddImg" @imgDel="handleDelImage"></mavon-editor>
    <el-button type="primary" @click="handleTest">显示内容console</el-button>
    <transition name="el-fade-in-linear">
      <mavon-editor
        class="md"
        :value="valueEmoji"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true"
      ></mavon-editor>
    </transition>

    <el-input
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 20}"
      placeholder="请输入内容"
      resize="none"
      v-model="valueEmoji">
    </el-input>
    <div class="icon clearfix">
      <i class="icon iconfont icon-face" @click="showEmoji = !showEmoji">123</i>
      <el-button type="success" size="small" @click="submit" class="submit">提交</el-button>
      <transition name="fade" mode="">
        <div class="emoji-box" v-if="showEmoji" >
          <el-button 
            class="pop-close" 
            :plain="true" 
            type="danger" 
            size="mini" 
            icon="el-icon-close"
            @click="showEmoji = false"></el-button>
            <vue-emoji
              @select="selectEmoji">
            </vue-emoji>
          <span class="pop-arrow arrow"></span>
        </div>       
      </transition>
    </div>
    <transition-group tag="div" name="list" class="comment">
      <p v-for="(item,index) in data" :key="index" class="item">
        <span v-html="emoji(item)"></span>
      </p>
    </transition-group>
  </div>
</template>
<script>
import request from '@/utils/request';
import vueEmoji from '@/components/emoji/emoji.vue';
import  Velocity from 'velocity-animate';



export default {
  components: {
    vueEmoji
  },
  data() {
    return {
      value: "> 年号呀```sadasd```",
      img_file: {},
      valueEmoji: '',
      showEmoji: false,
      data: [],
      toolbars: {
        blod: true,
        italic: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        help: true,
        emoji: true,
        subfield: false,
        defaultOpen: 'edit'
      },

      show: false,
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
      this.$refs.editor.$img2Url(pos, "http://qnpic.top/yoona2.jpg")
    },
    handleDelImage(pos, $file) {
      console.log(pos, typeof(pos));
      delete this.img_file[pos]
    },
    selectEmoji (code) {
      this.showEmoji = false
      this.valueEmoji += code
    },
    submit () {
      this.data.push(this.valueEmoji)
      this.valueEmoji = ''
    },

    beforeEnter(el){
      console.log(el)
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done){
      console.log(el,done);
      var delay = el.dataset.index * 150;
      setTimeout(()=>{
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay)
    },
    leave(el, done){
      var delay = el.dataset.index * 150;
      setTimeout(()=>{
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },
    handleTestPopConfirm(){
      console.log(111111)
    },
  },
  mounted() {
    
  }
}
</script>
<style lang="scss">
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .icon {
    position: relative;
    margin-top: 20px;
    .iconfont {
      cursor: pointer;
      color: #F7BA2A;
    }
    .emoji-box {
      position: absolute;
      z-index: 10;
      left: -10px;
      top: 24px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
      .el-button {
        position: absolute;
        border: none;
        color: #FF4949;
        right: 12px;
        top: 12px;
        z-index: 10;
      }
      .arrow {
        left: 10px;
      }
    }
    .submit {
      float: right;
    }
  }
  .comment {
    margin-top: 20px;
    .item {
      margin-top: 20px;
      padding: 10px;
      margin: 0;
      border-top: 1px solid #bfcbd9;
    }
  }
}

.clearfix {
  &:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}

.el-popconfirm__main{
  margin: 14px 0;
}
</style>