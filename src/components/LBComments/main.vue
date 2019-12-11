<!-- 评论组合 -->
<template>
   <div class="comment-list">
        <div class='comment-item' v-for="item in commentsList" :key="item.id">
            <div class="LBComment--RootComment">
                <comments-item :currentUser="currentUser" :comment="item.comment_root"></comments-item>
            </div>
            <div class="LBComment--ChildComment" v-for="reply in item.comment_reply" :key="reply.id">
                <reply-item :currentUser="currentUser" :comment="reply"></reply-item>
            </div>
        </div>
   </div>
</template>

<script>
import CommentsItem from './packages/comment-item/index.js';
import ReplyItem from './packages/replay-item/index.js';

export default {
    name: 'LbComments',
    components: {
        CommentsItem,
        ReplyItem
    },
    props: {
        commentsList: {
            type: Array,
            default() {
                return [
                    {
                        comment_root: {
                            id: 1,
                            commentator: 'robot',
                            commentator_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                            created: 1568268265,
                            comment_like: 233,
                            comment_text: '只是一段简单的测试 :smiley:',
                            is_liked: false
                        },
                        comment_reply: [
                            {
                                from: 'lightfish',
                                from_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                                to: 'robot',
                                id: 1,
                                comment_text: '子评论对主评论的评论',
                                created: 1568268265,
                                comment_like: 67
                            },
                            {
                                from: 'lightfish',
                                from_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                                to: 'lighthouse',
                                id:2,
                                comment_text: '子评论对子评论的评论',
                                created: 1568268365,
                                comment_like: 56
                            }
                        ]
                    }
                ]
            }
        },
        currentUser: {
            type: String,
            default() {
                return '';
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
        console.log(this.currentUser)
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