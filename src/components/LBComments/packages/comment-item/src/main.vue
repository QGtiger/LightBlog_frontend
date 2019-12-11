<!-- 主评论 组件 -->
<template>
   <div class='parent-comment'>
       <div class="comment-avator">
           <a :href="'/author/detail?user='+comment.commentator" target="_blank">
                <img :src="comment.commentator_img_url" alt="try">
           </a>
       </div>
       <div class="comment-cont">
           <div class="comment-info">
               <div class="commentator">
                   <a :href="'/author/detail?user='+comment.commentator" target="_blank">{{ comment.commentator }}</a>
               </div>
               <div class="comment-time">
                   <span class="tips">{{ $util.Time.getFormatTime(comment.created) }}</span>
               </div>
               <div class="comment-content" v-html="emoji(comment.comment_text)">
               </div>
               <div class="comment-meta">
                   <div :class="{thumb: !comment.is_liked, thumbed: comment.is_liked }">
                       <i class="iconfont thumb-btn">&#xe600;</i>
                       <span class="like-count">{{ comment.comment_like }}</span>
                   </div>
                   <div class="enter-meta">
                       <div class="l-btn" style="display: flex;">
                           <div class="comment-btn">
                                <i class="iconfont iconfont-btn reply-btn">&#xe616;</i>
                                <span class="iconfont-text">回复</span>
                            </div>
                            <div class="report-btn">
                                <i class="iconfont iconfont-btn report-icon">&#xe656;</i>
                                <span class="iconfont-text">举报</span>
                            </div>
                       </div>
                       <div class="r-btn">
                           <div class="delete-btn" v-if="comment.commentator === this.$store.state.username">
                               213
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>

export default {
    name: 'CommentsItem',
    components: {},
    props: {
        comment: {
            type: Object,
            default() {
                return {
                    id: 1,
                    commentator: 'root',
                    commentator_img_url: '/media/avator/7/lightfish_2Na8ROv.jpg',
                    created: 1568268265,
                    comment_like: 233,
                    comment_text: '只是一段简单的测试  :smiley:',
                    is_liked: true
                }
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

.parent-comment{
    display: flex;
    justify-content: flex-start;
    .iconfont-btn{
        font-size: 24px;
        padding: 5px;
    }
    .iconfont-text{
        float: right;
        padding-right: 5px;
        padding-top: 1px;
    }
    .comment-avator{
        img{
            width: 45px;
            height: 45px;
            object-fit: cover;
            border-radius: 100%;
            overflow: hidden;
        }
    }
    .comment-cont{
        flex-grow: 1;
        margin: 0 0 15px 20px;
        .commentator{
            font-size: 18px;
            font-family: -webkit-pictograph;
            display: flex;
            align-items: center;
            font-weight: 500;
            height: 25px;
        }
        .tips{
            font-size: 13px;
            color: #808080;
        }
        .comment-content{
            word-break:break-word;
            line-height: 22px;
            text-indent: 10px;
            margin-top: 10px;
        }
        .comment-meta{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .thumb{
                color: #909399;
                cursor: pointer;
                transition: all .3s linear 0s;
            }
            .thumbed{
                color: #f25151;
                cursor: pointer;
            }
            .thumb-btn{
                font-size: 24px;
                padding: 5px;
            }
            .thumb:hover{
                color:#303133;
                transition: all .3s linear 0s;
            }
            .like-count{
                padding-top: 7px;
                float: right;
            }
            .enter-meta{
                margin-left: 30px;
                display: flex;
                align-items: center;
                flex-grow: 1;
                justify-content: space-between;
                .reply-btn{
                    font-size: 20px;
                }
                .comment-btn{
                    cursor: pointer;
                    color: #909399;
                }
                .comment-btn:hover{
                    color:#303133;
                    transition: all .3s linear 0s;
                }
                .report-btn{
                    color: #909399;
                    transition: all .3s linear 0s;
                    margin-left: 10px;
                    cursor:pointer;
                    .report-icon{
                        font-size:22px;
                        
                    }
                }
                .report-btn:hover{
                    color: #303133;
                    transition: all .3s linear 0s;
                }
            }
        }
    }
}

</style>