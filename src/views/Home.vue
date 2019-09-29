<template>
  <div class="home" @click="handleGo">
    <HelloWorld msg="Hello, LightBlog"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    handleGo() {
      console.log(213)
      this.$router.push('/login');
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