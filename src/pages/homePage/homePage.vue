<!-- 首页 -->
<template>
   <div class='home-page'></div>
</template>

<script>
import {getBlogs} from '@/api/blog';


export default {
    components: {},
    data() {
        return {
            currentPage: 1
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
                console.log(res)
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

</style>