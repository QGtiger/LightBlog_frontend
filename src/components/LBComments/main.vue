<!-- 评论组合 -->
<template>
   <div class="comment-list">
       <transition-group tag="div" name="list">
           <div class='comment-item' v-for="(item,index) in commentsList" :key="index">
                <div class="LBComment--RootComment">
                    <comments-item
                    @clickThumb="handleRootThumb"
                    @clickDel="handleDekRootCom"
                    :currentUser="currentUser" :comment="item.comment_root"></comments-item>
                </div>
                <div class="child-comment-items">
                    <div class="LBComment--ChildComment" v-for="reply in item.comment_reply" :key="reply.id">
                        <reply-item :currentUser="currentUser" :comment="reply"></reply-item>
                    </div>
                </div>
            </div>
        </transition-group>
        
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
                            is_liked: true
                        },
                        comment_reply: [
                            {
                                from: 'lightfish',
                                from_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                                to: 'robot',
                                id: 1,
                                comment_text: '子评论对主评论的评论',
                                created: 1568268265,
                                comment_like: 67,
                                is_liked: false,
                            },
                            {
                                from: 'lightfish',
                                from_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                                to: 'lighthouse',
                                id:2,
                                comment_text: '子评论对子评论的评论',
                                created: 1568268365,
                                comment_like: 56,
                                is_liked: false,
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
        
    },
    methods: {
        handleRootThumb(type){
            console.log(type)
        },
        handleDekRootCom(id){
            console.log(id)
            this.$axios.post('/comment/api/comment/del',
                this.$qs.stringify({
                    commentId: id,
                    commentType: 1
                })
            ).then(res=>{
                if(res){
                    console.log(res)
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
.child-comment-items{
    padding-left: 40px;
}

.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
</style>