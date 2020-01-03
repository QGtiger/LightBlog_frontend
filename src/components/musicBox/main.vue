<!-- 音乐播放器 -->
<template>
   <div class='music-box'>
       <audio :src="song.url" id="audio" controls></audio>
       <div class="music-container audioplayer">
           <div class="ap-img">
               <img :src="song.img" alt="img">
           </div>
           <dic class="ap-main-cont">
               <div class="ap-title">

               </div>
               <div class="ap-progress-line">

               </div>
               <div class="ap-controller">

               </div>
           </dic>
       </div>
   </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            song:{
                url: 'http://qnpic.top/%E6%98%8E%E6%99%BA%E4%B9%8B%E4%B8%BE.mp3',
                img: 'http://qnpic.top/%E6%98%8E%E6%99%BA%E4%B9%8B%E4%B8%BE.jpg'
            }
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
.music-box{
    width: 250px;
}
.music-container{
    display: flex;
}
</style>