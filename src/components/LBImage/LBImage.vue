<template>
    <div :class="open ? 'ShowImageOutside LBImage' : 'LBImage'" @click="handleClickOutSide">
        <transition name="bounce-in">
            <div v-if="open" class="innerImg" :style="{width: initW, height: initH}">
                <img @click="handleClose" style="position: absolute;width: 40px;top: -15px;right: -15px;" src="@/assets/images/close-1.png" alt="">
                <img ref="innerImg" :src="initSrc" alt="" style="width: 100%; height: 100%; object-fit: cover" >
                
            </div>
            
        </transition>
        
    </div>
</template>

<script>
export default {
    namne: 'LBImage',
    props: ['open', 'src'],
    components: {},
    data() {
        return {
            img: null,

            initW: 'auto',
            initH: 'auto',

            initSrc: '',
        }
    },
    watch: {
        open (isOpen){
            if(isOpen){
                this.img.src= this.src;
            }
        },
        src(newSrc){
            this.img.src= newSrc;
        }
    },
    mounted() {
        let _this = this;
        // this.img.src=this.src;
    },
    created() {
        let _this = this;
        this.img = new Image();
        this.img.onload = function() {
            let realWidth = this.width;
            let realHeight = this.height;
            let windowW = document.body.offsetWidth;
            let windowH = document.body.offsetHeight;
            let initW, initH;
            let scale = 0.7; //缩放比例
            if(realWidth <= windowW*scale && realHeight <= windowH*scale){
                initW = realWidth;
                initH = realHeight;
            }else if(windowW/windowH <= realWidth/realHeight){
                initW = windowW*scale;
                initH = windowW*scale*realHeight/realWidth;
            }else{
                initH = windowH*scale;
                initW = windowH*scale*realWidth/realHeight;
            }
            _this.initW = initW + 'px';
            _this.initH = initH + 'px';

            _this.initSrc = _this.src;
            
        }
    },
    computed: {
        showImg: {
            get() {
                return this.src;
            }
        }
    },
    methods: {
        handleClose() {
            console.log('close')
            this.$emit('close-img');
        },
        handleClickOutSide(e) {
            let dom = this.$refs.innerImg;
            if(dom && !dom.contains(e.target)){
                this.$emit('close-img');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.bounce-in-enter-active {
  animation: bounce-in .3s;
}
.bounce-in-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
.ShowImageOutside.LBImage{
    position: fixed; width: 100%; height: 100%; top: 0;left: 0;z-index:20200229;background-color:rgba(0,0,0,.13);

}
.LBImage .innerImg{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20200301;
    border: 10px solid rgba(0,0,0,.2);
    border-radius: 10px;
}
</style>