<!-- 推荐文章显示 -->
<template>
   <div class='recommend-list-cont'>
         123123
   </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            count: 10,
            loading: false
        };
    },
    computed: {
        noMore () { 
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    },
    watch: {},
    mounted() {
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      },
      scrollBottom() {
          
          console.log(this.$el)
      }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.recommend-list-cont{
    height: 100px;
    overflow: scroll;
}
</style>