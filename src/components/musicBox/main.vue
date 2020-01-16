<!-- 音乐播放器 -->
<template>
   <div class='music-box'>
       <div class="player-toast" :class="{ 'player-toast-hide': !isShowError }">{{ error }}</div>
       <div class="music-container audioplayer">
           <div class="player__top">
               <div class="player-cover">
                   <transition-group :name="transitionName">
                       <div class="player-cover__item" v-if="index === currentTrackIndex" :style="{backgroundImage: `url(${track.cover})`}" v-for="(track, index) in tracks" :key="track.id">

                        </div>
                   </transition-group>
               </div>
               <div class="player-controls">
                   <div class="player-controls__item">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconaixin_shixin"></use>
                        </svg>
                   </div>
                   <div class="player-controls__item">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconfenxiang"></use>
                        </svg>
                   </div>
                   <div class="player-controls__item" @click="prevTrack">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconshangyishou"></use>
                        </svg>
                   </div>
                   <div class="player-controls__item" @click="nextTrack">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconxiayishou"></use>
                        </svg>
                   </div>
                   <div class="player-controls__item xl" @click="play">
                       <svg class="icon" aria-hidden="true">
                            <use xlink:href="#iconbofang" v-if="isPause"></use>
                            <use xlink:href="#iconzanting" v-else></use>
                        </svg>
                   </div>
               </div>
           </div>
           <div class="player-progress">
               <div class="progress__top">
                   <div class="album-info">
                       <div class="album-info__name">{{ currentTrack.name }}</div>
                       <div class="album-info__track">
                           <!-- <marquee scrollamount="2" width="150px" onmouseover="this.stop()" onmouseout="this.start()">
                               
                           </marquee> -->
                           <span class="album-name">{{ currentTrack.albumName }}</span>&nbsp; - &nbsp;<span class="album-singer">{{ currentTrack.albumSinger }}</span>
                        </div>
                   </div>
                   <div class="progress__time">
                       <span class="progress__currentTime">{{ currentTime }}</span>
                       <span class="progress__duration">{{ duration }}</span>
                   </div>
               </div>
               <div class="progress__bar" ref="progressBar" @mousemove="mouseMoveBar" @mouseout="mouseOutBar" @click="clickBar">
                   <div class="hover__time" v-show="isShowHoverBar" :style="{left: hoverBarWidth}">{{ hoverTime }}</div>
                   <div class="hover__bar" :style="{ width: hoverBarWidth }"></div>
                   <div class="progress__current" :style="{ width : barWidth }"></div>
               </div>
           </div>
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
            },
            audio:null,
            tracks: [
                {
                    id: 1,
                    cover: 'http://qnpic.top/%E6%98%8E%E6%99%BA%E4%B9%8B%E4%B8%BE.jpg',
                    name: '老古董',
                    albumName: "空山新雨后",
                    albumSinger: '许嵩',
                    resourse: 'http://qnpic.top/%E6%98%8E%E6%99%BA%E4%B9%8B%E4%B8%BE.mp3'
                },{
                    id: 2,
                    cover: 'http://qnpic.top/%E9%9B%85%E4%BF%97%E5%85%B1%E8%B5%8F.jpg',
                    name: '玫瑰花的葬礼',
                    albumName: "不知道",
                    albumSinger: '许嵩',
                    resourse: 'http://qnpic.top/%E9%9B%85%E4%BF%97%E5%85%B1%E8%B5%8F.mp3'
                },{
                    id: 3,
                    name: '青衣',
                    albumSinger: '马天宇',
                    albumName: '(*^_^*)',
                    cover: 'http://img.ytmp3.cn/image/5.jpg',
                    resourse: 'http://www.ytmp3.cn/down/43680.mp3',
                }
            ],
            currentTrack: {
                name: '老古董',
                albumName: "空山新雨后",
                albumSinger: '许嵩',
            },
            currentTime: null, //当前时间
            duration: null, //音频时长,
            isPause: true,
            currentTrackIndex: 0, //当前歌曲的名称
            transitionName: null, //transition 样式

            barWidth: null, //
            hoverTime: '-- : --', //hover的时间
            hoverBarWidth: 0,

            hoverTimeLeft: null,

            error: '',
            isShowError: false,
        };
    },
    computed: {
        isShowHoverBar(){
            return this.hoverBarWidth !== 0;
        }
    },
    watch: {},
    mounted() {
        // console.log(this.$route)
    },
    methods: {
        play(){
            this.isPause ? this.audio.play() : this.audio.pause();
            this.isPause = this.isPause ? false : true;
        },
        prevTrack() {
            this.transitionName = 'scale-in';
            if(this.currentTrackIndex === 0){
                this.currentTrackIndex  = this.tracks.length - 1;
            }else{
                this.currentTrackIndex --;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = 'scale-out';
            if(this.currentTrackIndex < this.tracks.length - 1){
                this.currentTrackIndex ++;
            }else{
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer(){
            this.audio.src = this.currentTrack.resourse;
            setTimeout(() => {
                if(this.isPause) {
                    
                } else {
                    this.audio.play();
                    this.isPause = false;
                }
            }, 300);
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + '%';
            let duration = this.audio.duration;
            let durmin = Math.floor(duration / 60);
            let dursec = Math.floor(duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        mouseMoveBar(event){
            // console.log(this.$refs.progressBar.getBoundingClientRect())
            let seekBarPos = this.$refs.progressBar.getBoundingClientRect()
            let seekT = event.clientX - seekBarPos.left;
            this.hoverBarWidth = seekT + 'px';
            let seekLoc = this.audio.duration * (seekT / this.$refs.progressBar.offsetWidth);
            
            let hoverMin = Math.floor(seekLoc / 60);
            let hoverSec = Math.floor(seekLoc - hoverMin * 60);
            if(hoverMin < 10){
                hoverMin = '0' + hoverMin;
            }
            if(hoverSec < 10){
                hoverSec = '0' + hoverSec;
            }
            if( isNaN(hoverMin) || isNaN(hoverSec) ){
                this.hoverTime = '-- : --'
            }else{
                this.hoverTime = `${hoverMin} : ${hoverSec}`
            }

        },
        mouseOutBar() {
            this.hoverBarWidth = 0;
        },
        clickBar(event) {
            let seekBarPos = this.$refs.progressBar.getBoundingClientRect()
            let seekT = event.clientX - seekBarPos.left;
            this.barWidth = seekT + 'px';
            let seekLoc = this.audio.duration * (seekT / this.$refs.progressBar.offsetWidth);
            this.audio.pause();
            this.isPause = true;
            this.audio.currentTime = seekLoc;
            this.audio.play();
            this.isPause = false;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src=this.currentTrack.resourse;
        this.audio.ontimeupdate = function(){
            vm.generateTime();
        }
        this.audio.onloadedmetadata = function() {
            vm.generateTime();
        }
        this.audio.onended = function() {
            vm.nextTrack();
        }
        this.audio.onerror = function() {
            vm.isPause = true;
            vm.isShowError = true;
            console.log('error');
            console.log('-----networkState---------',vm.audio.networkState);
            console.log('-----readyState---------',vm.audio.readyState);
            switch (vm.audio.networkState) {
                case 0:
                    vm.error = '尚未初始化';
                    break;
                case 1:
                    vm.error = '正在下载数据';
                    break;
                case 3:
                    vm.error = '未找到资源';
                    break;
            }
            setTimeout(() => {
                vm.isShowError = false;
            },3000)
        }
    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.music-box{
    width: 230px;
    padding: 15px;
    background-color: #eef3f7;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    border-radius: 10px;
    position: relative;
    .player-toast{
        position: absolute;
        top: -50px;
        padding: 10px 20px;
        background-color: #303133;
        border-radius: 8px;
        color: #fff;
        left: calc(50% - 46px);
        pointer-events: none;
        transition: 0.3s;
        opacity: 1;
        transform: translate(0, 0);
    }
    .player-toast-hide{
        opacity: 0;
        transform: translate(0, 12px);
    }
}
.music-container{
    display: flex;
    flex-direction: column;
    .player__top{
        display: flex;
        align-items: flex-start;
        .player-controls{
            padding-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    .player-progress{
        margin-top: -30px;
        .album-info{
            .album-info__name{
                font-family: "Bitter", serif;
                font-weight: 700;
                margin-bottom: 6px;
            }
            .album-info__track{
                margin-bottom: 6px;
            }
        }
        .progress__time{
            overflow: hidden;
            // margin-bottom: 5px;
            .progress__currentTime{
                float: left;
            }
            .progress__duration{
                float: right;
            }
        }
        .progress__bar{
            height: 6px;
            width: 100%;
            cursor: pointer;
            background-color: #d0d8e6;
            display: inline-block;
            border-radius: 10px;
            position: relative;
            .progress__current{
                width: 0%;
                height: inherit;
                background-color: #a3b3ce;
                border-radius: 10px;
            }
            .hover__bar{
                background-color: #3b3d5030;
                height: inherit;
                position: absolute;
                border-radius: 6px;
            }
            .hover__time{
                position: absolute;
                top: -30px;
                padding: 5px;
                color: #fff;
                border-radius: 5px;
                font-size: 14px;
                margin-left: -26px;
                background-color: #3b3d50;
                display: block;
                white-space: pre;
            }
        }
    }
    .player-cover{
        width: 200px;
        height: 200px;
        margin-left: -30px;
        position: relative;
        border-radius: 10px;
        z-index: 1;
    }
    .player-cover__item{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left:0;
    }
    .player-cover__item::before{
        content: '';
        background:inherit;
        width:100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 1;
        position: absolute;
        top: 18px;
        transform: scale(0.9);
        filter: blur(10px);
        opacity: 0.9;
        border-radius: 10px;
    }
    .player-cover__item::after{
        content: "";
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 2;
        position: absolute;
        border-radius: 10px;
    }
    .player-controls__item{
        font-size: 28px;
        color:#acb8cc;
        cursor: pointer;
        display: inline-flex;
        padding: 5px;
        align-items: center;
        position: relative;
        transition: all .3s ease-in-out;
        justify-content: center;
        margin-bottom: 8px;
        .icon{
            z-index: 2;
        }
    }
    .player-controls__item.xl{
        font-size: 60px;
        width: auto;
        height: auto;
        filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
        color:#851fca87;
    }
    .player-controls__item.xl::before{
        display: none;
    }
    .player-controls__item::before{
        content: '';
        position: absolute;
        border-radius: 50%;
        background-color:#fff;
        width: 100%;
        height: 100%;
        transform: scale(.5);
        opacity: 0;
        box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
        transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
    }
}
@media screen and (min-width: 500px) {
  .player-controls__item:hover {
    color: #532ab9;
  }
  .player-controls__item:hover::before {
    opacity: 1;
    transform: scale(1.3);
  }
}

.scale-out-enter-active {
  transition: all .35s ease-in-out;
}

.scale-out-leave-active {
  transition: all .35s ease-in-out;
}

.scale-out-enter {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}

.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-enter-active {
  transition: all .35s ease-in-out;
}

.scale-in-leave-active {
  transition: all .35s ease-in-out;
}

.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}

.scale-in-leave-to {
  transform: scale(0.55);
  pointer-events: none;
  opacity: 0;
}
</style>