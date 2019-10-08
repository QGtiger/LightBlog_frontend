<!-- 首页 -->
<template>
   <div class='home-page'>
       <div class="flow_blogs">
           <div class="list-group" v-for="(item, index) in flowBlog" :key="index" >
                <CardBlog :blog="item"></CardBlog>
           </div>
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
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetBlogs(this.currentPage)
    },
    methods: {
        handleGetBlogs(page) {
            getBlogs(page).then(res=>{
                console.log(res);
                this.flowBlog = res.data.data;
            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

.flow_blogs .list-group{
    margin-top: 20px;
}
</style>