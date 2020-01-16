<template>
  <div id="app" v-cloak>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentTitle: '',
    }
  },
  mounted() {
    this.setPageListen();
    // console.log(this.$route.meta.title);
  },
  methods: {
    setPageListen() {
      let _this = this;
      // js判断浏览当前页（关键词：当前，浏览）
      // 可以通过document.hidden属性判断当前页面是否是激活状态。
      // 兼容性：IE10+，Firefox10+,Chrome14+,Opera12.1+,Safari7.1+
      var hiddenProperty = 'hidden' in document ? 'hidden' :
          'webkitHidden' in document ? 'webkitHidden' :
              'mozHidden' in document ? 'mozHidden' :
                  null;
      var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
      var onVisibilityChange = function(){
        if (!document[hiddenProperty]) {
            document.title=this.currentTitle;
            _this.thumbSlide = true;
            setTimeout(() => {
                _this.thumbSlide = false;
            },300)
        }else{
          this.currentTitle = document.title;
          document.title='藏好啦(つд⊂)  ';
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },
  }
}
</script>

<style lang="less">
*{
  padding:0;
  margin: 0;
}

[v-cloak]{ display:none}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#background{
  background: url('./assets/images/bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  zoom: 1;
}
</style>
