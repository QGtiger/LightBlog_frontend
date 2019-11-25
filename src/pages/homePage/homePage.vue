<!-- 首页 -->
<template>
   <div class='home-page'>
       <div class="flow_blogs">
           <div class="list-group" v-for="(item, index) in flowBlog" :key="index" >
                <CardBlog :blog="item"></CardBlog>
           </div>
                <p class="waiting" v-if="waiting">努力加载中...</p>
                <p class="nomore" v-if="waiting === false">没有更多了...</p>
       </div>
   </div>
</template>

<script>
import {getBlogs} from '@/api/blog';
import CardBlog from '@/components/blog/CardBlog';

export default {
    components: {
        CardBlog
    },
    data() {
        return {
            currentPage: 1,
            flowBlog: [],
            totalPage: 1,
            waiting: true,
            size: 10,
            timeout: null,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        this.handleGetRecommendBlogs();
    },
    methods: {
        handleGetRecommendBlogs() {
            this.$axios.post('/article/api/get/home/articles?page='+this.currentPage+'&&size='+this.size).then(res => {
                this.flowBlog.push(...res.data.data);
                this.totalPage = res.data.totalPage;
            })
        },
        handleDebounceFun(fn, wait){ // 防抖请求数据
            let timeout = null;
            return function () {
                if(timeout != null){
                    clearTimeout(timeout);
                }
                timeout = setTimeout(fn, wait);
            }
        },
        handleScroll() {
            if(this.timeout != null){
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(()=>{
                let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.offsetHeight;
                if(bottomOfWindow < 20){
                    if(this.currentPage < this.totalPage){
                        this.waiting = true;
                        this.currentPage += 1;
                        this.handleGetRecommendBlogs();
                    }else{
                        this.waiting = false;
                        console.log('break...')
                    }
                }
            }, 500)
        },
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    beforedestroy(){
        
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.handleScroll);
        next();
    }
}
</script>
<style lang='less' scoped>

.flow_blogs{
    width: 800px;
    margin: 30px auto;
    background-color: white;
    padding: 10px 20px;
    .waiting{
        padding: 20px;
        text-align: center
    }
    .nomore{
        padding: 20px;
        text-align: center
    }
}

.flow_blogs .list-group{
    // margin-top: 20px;
}
</style>