<template>
  <div id="app" v-cloak>
      <router-view></router-view>

       <div class="music-zhaocaimao" :class="showMusicBox ? 'show-iconzhaocaimao':''" @click="handleShowMusicBox">
         <svg class="icon" style="font-size: 50px" aria-hidden="true">
            <use xlink:href="#iconzhaocaimao"></use>
        </svg>
       </div>
       <div class="music-plug" :class="showMusicBox ? 'show-musicbox' : ''">
         <MusicBox></MusicBox>
       </div>
  </div>
</template>

<script>
import MusicBox from '@/components/musicBox/main';
export default {
  components: {
    MusicBox
  },
  data() {
    return {
      currentTitle: '',

      showMusicBox: false,
    }
  },
  mounted() {
    this.setPageListen();
    // console.log(this.$route.meta.title);
  },
  methods: {
    handleShowMusicBox() {
      this.showMusicBox = !this.showMusicBox;
    },
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

.color-red{
  color: red !important;
}

.color-bf0000{
  color: #bf0000 !important;
}

.color-67c23a{
  color: #67c23a !important;
}

.music-zhaocaimao{
  position: fixed;
    right: 0;
    top: 200px;
    transform: translate(50%, 50%) rotate(-45deg);
    cursor: pointer;
    z-index: 1021301230;
    transition: all .3s ease;
    transform-origin: top left;
}
.music-zhaocaimao:hover{
  transform: rotate(-30deg)
}
.show-iconzhaocaimao{
  transform: rotate(0);
}
.music-plug{
  position: fixed;
  top: 240px;
  right: 10px;
  z-index: 2030;
  transition: all .3s ease;
  transform: translateX(80%) scale(.5);
  opacity: 0;
}
.show-musicbox{
  opacity: 1;
  transform: translateX(0) scale(1);
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
