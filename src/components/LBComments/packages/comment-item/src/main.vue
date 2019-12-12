<!-- 主评论 组件 -->
<template>
   <div class='parent-comment' @mouseenter="handleMouseOver" @mouseleave="handleMouseOut">
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
                   <div :class="{thumb: !comment.is_liked, thumbed: comment.is_liked }" @click="handleThumb">
                       <i class="iconfont thumb-btn">&#xe600;</i>
                       <span class="like-count">{{ comment.comment_like }}</span>
                   </div>
                   <div class="enter-meta" :class="{LBCommentHover: isHover }">
                       <div class="l-btn" style="display: flex;">
                           <div class="comment-btn" @click="handleShowInput">
                                <i class="iconfont iconfont-btn reply-btn">&#xe616;</i>
                                <span class="iconfont-text">{{ isShowInput ? '取消回复' : '回复' }}</span>
                            </div>
                            <div class="report-btn">
                                <i class="iconfont iconfont-btn report-icon">&#xe656;</i>
                                <span class="iconfont-text">举报</span>
                            </div>
                       </div>
                       <div class="r-content" v-if="comment.commentator === currentUser">
                           <el-popconfirm
                                title="确定删除该评论 ？"
                                @onConfirm="handleConfirmDeleteComment(comment.id)"
                                @onCancel="handleCancelDel"
                                :confirmButtonText="'确定'"
                                ref="popconfirm"
                                >
                                <div class="delete-btn" slot="reference">
                                    <i class="iconfont iconfont-btn delete-icon">&#xe618;</i>
                                    <span class="iconfont-text">删除</span>
                                </div>
                                <!-- <span slot="reference">删除</span> -->
                            </el-popconfirm>
                       </div>
                   </div>
               </div>
           </div>

           <transition name="staggered-fade" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
               <div class="comment-input" v-if="isShowInput">
                    <el-input class="comment-textarea" ref="commentEditor" type="textarea" @focus="isShowCommentBtn=true" :autosize="{ minRows: 3, maxRows: 8 }" v-model="commentText"></el-input>
                    <div class="editor-footer">
                            <transition name="el-fade-in-linear">
                                <div class="meta" v-if="isShowCommentBtn">
                                    <i style="font-size: 26px;padding:10px;display: inline-block;cursor:pointer;" class="iconfont" @click="handleShowEmoji">&#xe745;</i>
                                    <div class="btn-list">
                                        <button class="confirm-comment" :class="{ confirm_hover :  commentText != ''}" @click="handleConfirmComment" :disabled="commentText == ''">发布</button>
                                        <button class="cancel-comment" @click="handleCancelComment">取消</button>
                                    </div>
                                    <transition name="el-fade-in-linear" mode="">
                                        <div class="emoji-box" v-if="showEmoji" >
                                            <i class="iconfont cancel-btn" @click="showEmoji = false">&#xe63a;</i>
                                        
                                            <vue-emoji
                                            @select="selectEmoji">
                                            </vue-emoji>
                                        <span class="pop-arrow arrow"></span>
                                        </div>       
                                    </transition>
                                </div>
                            </transition>
                        </div>
                </div>
           </transition>
       </div>
   </div>
</template>

<script>
import vueEmoji from '@/components/emoji/emoji.vue';
export default {
    name: 'CommentsItem',
    components: {
        vueEmoji
    },
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
            isHover: false,
            isClickDel: false, //是否点击了删除，出现了popconfirm,

            isShowInput: false,

            commentText: '', //评论内容
            isShowCommentBtn: false,
            showEmoji: false, //是否显示emoji
        };
    },
    computed: {
    },
    watch: {},
    mounted() {
        
    },
    methods: {
        handleConfirmDeleteComment(id) {
            this.isHover = false;
            this.$emit('clickDel', id)
        },
        handleCancelDel() {
            this.isHover = false;
        },
        handleThumb() {
            this.$emit('clickThumb', this.comment.is_liked ? 'unlike' : 'like')
        },
        handleMouseOver() {
            this.isHover = true;
        },
        handleMouseOut() {
            let visible = this.$refs.popconfirm ? this.$refs.popconfirm.visible : false;
            if(visible){
                return;
            }
            return this.isHover = false;
        },
        handleShowInput() {
            this.isShowInput = this.isShowInput ? false : true;
            this.showEmoji = false;
        },
        handleShowEmoji() {
            this.showEmoji = true;
        },
        handleConfirmComment() {
            console.log(this.$refs.commentEditor.$el.querySelector('textarea').selectionStart)
        },
        handleCancelComment() {
            this.isShowCommentBtn = false;
            this.commentText = '';
        },
        selectEmoji(code){
            let strList = this.commentText.split('');
            let selectionStart = this.$refs.commentEditor.$el.querySelector('textarea').selectionStart;
            strList.splice(selectionStart, 0, code);
            this.commentText = strList.join('');
            this.showEmoji = false;
        },

        beforeEnter(el){
            el.style.opacity = 0;
            el.style.height = 0;
        },
        enter(el, done){
            var delay = el.dataset.index * 150;
            setTimeout(()=>{
                Velocity(
                    el,
                    { opacity: 1, height: '120px' },
                    { complete: done }
                )
            }, delay)
        },
        leave(el, done){
            var delay = el.dataset.index * 150;
            setTimeout(()=>{
                Velocity(
                    el,
                    { opacity: 0, height: 0 },
                    { complete: done }
                )
            }, delay)
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类


.parent-comment{
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
    border-top: 1px solid #e4e7ed;
    .iconfont-btn{
        font-size: 24px;
        padding: 5px;
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
        margin-left: 20px;
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
            white-space: pre-wrap;
        }
        .comment-meta{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
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
                font-size: 23px;
                padding: 5px;
            }
            .thumb:hover{
                color:#303133;
                transition: all .3s linear 0s;
            }
            .like-count{
                padding-top: 5px;
                float: right;
            }
            .enter-meta{
                margin-left: 30px;
                margin-right: 30px;
                display: flex;
                align-items: center;
                flex-grow: 1;
                justify-content: space-between;
                opacity: 0;
                transition: opacity .3s;
                .reply-btn{
                    font-size: 17px;
                }
                .comment-btn{
                    cursor: pointer;
                    color: #909399;
                    display: flex;
                    align-items: center;
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
                    display: flex;
                    align-items: center;
                    .report-icon{
                        font-size:18px;
                        
                    }
                }
                .report-btn:hover{
                    color: #303133;
                    transition: all .3s linear 0s;
                }
                .r-content{
                    .delete-btn{
                        color: #909399;
                        transition: all .3s linear 0s;
                        margin-left: 10px;
                        cursor:pointer;
                        display: flex;
                        align-items: center;
                        .delete-icon{
                            font-size:18px;
                            
                        }
                        .iconfont-text{
                            line-height: 30px;
                        }
                    }
                    .delete-btn:hover{
                        color: #303133;
                         transition: all .3s linear 0s;
                    }
                }
            }
            .LBCommentHover{
                opacity: 1;
            }
        }
    }
    .comment-input{
        margin-top: 15px;
        padding-right: 35px;
        .meta{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .cancel-comment{
                display: inline-block;
                padding: 5px 15px;
                border-radius: 10px;
                border: 1px solid #ccc;
                color: #a1a1a1;
                background-color: #eee;
                cursor: pointer;
                outline: none;
                transition: all .4s;
            }
            .cancel-comment:hover{
                background-color: #ccc;
                color: #303133;
                transition: all .4s;
            }
            .confirm-comment{
                display: inline-block;
                padding: 5px 15px;
                border-radius: 10px;
                border: 1px solid #f56c6c73;
                color: #f5f7fa;
                background-color: #f56c6ccc;
                cursor: not-allowed;
                outline: none;
                margin-right: 10px;
                transition: all .4s;
            }
            .confirm_hover{
                cursor: pointer;
            }
            .confirm_hover:hover{
                background-color: #f56c6c;
                transition: all .4s;
            }

            .emoji-box{
                position: absolute;
                z-index: 10;
                left: -10px;
                top: 44px;
                -webkit-box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
                box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
                background: white;
                .cancel-btn {
                    position: absolute;
                    border: none;
                    color: #FF4949;
                    right: 5px;
                    top: 5px;
                    z-index: 10;
                    padding: 10px;
                    transition: all .4s;
                    border-radius: 7px;
                    cursor: pointer;
                }
                .cancel-btn:hover{
                    background-color: #eee;
                    transition: all .4s;
                }
            }
        }
    }
}


.comment-textarea .el-textarea__inner{
    background-color: #dcdfe69e;
    outline: none;
    border: 1px solid #dcdfe69e;
    font-family: none;
}

</style>