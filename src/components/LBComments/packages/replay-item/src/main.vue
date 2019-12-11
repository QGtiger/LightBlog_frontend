<!-- 子评论 组件 -->
<template>
   <div class='child-comment'>
       子评论
   </div>
</template>

<script>

export default {
    name: 'ReplyItem',
    components: {},
    props: {
        comment: {
            type: Object,
            default() {
                return {
                    from: 'lightfish',
                    from_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                    to: 'root',
                    id: 1,
                    comment_text: '子评论对主评论的评论',
                    created: 1568268265,
                    comment_like: 67,
                    is_like: false,
                }
            }
        }
    },
    data() {
        return {

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

</style>