<!-- 博客详情 -->
<template>
   <div class='blog-detail'>
       <mavon-editor
            class="md"
            :value="body"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "false"
            :editable="false"
            :scrollStyle="true"
            :ishljs = "true"
        ></mavon-editor>
   </div>
</template>

<script>
import qs from 'qs';
export default {
    components: {},
    data() {
        return {
            blogId: '',
            body: ''
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.blogId = this.$route.params.id == undefined ? "" : this.$route.params.id;
        this.$route.params.id == undefined ? "" : this.handleGetBlogDetail();
    },
    methods: {
        handleGetBlogDetail() {
            this.$axios.post('/article/api/detail/blog',
                qs.stringify({
                    id: this.blogId
                })
            ).then(res => {
                if(res){
                    console.log(res.data)
                    this.body = res.data.data.body
                }
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