<template>
  <div class="home" @click="handleGo">
    <HelloWorld msg="Hello, LightBlog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import {islogin} from '@/api/user';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  mounted() {
    document.querySelector('body').setAttribute('id', 'background');
  },
  methods: {
    handleGo() {
      islogin().then(res=>{
        console.log(res)
        if(res){
          const h = this.$createElement;
          this.$notify({
            title: '欢迎来到LightBlog',
            message: h('i', { style: 'color: teal'}, 'LightBlog是基于Django后端处理，和Vue的前端展示的博客网站，Just for fun.')
          });
          this.$router.push('/index');
        }else{
          this.$router.push('/login');
        }
      })
    }
  }
}
</script>

<style lang="less">
.home{
  position: absolute;
  top:calc(50% - 49px);
  left: calc(50% - 224px);
  cursor: default;
  transform:translateX(0px);
  transition: all .3s;
}

.home:hover{
  transform: translateX(-60px);
  cursor: pointer;
}


</style>