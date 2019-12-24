<!-- 评论组合 -->
<template>
   <div class="comment-list">
       <div class="topBar">
           <p class="topBar-title">
               <i class="iconfont commentIcon">&#xe60c;</i>
               <span class="text">评论{{ commentsCount }}</span>
           </p>
       </div>
       <transition-group name="el-fade-in-linear">
           <div class='comment-item' v-for="(item,index) in commentsList" :key="index">
                <div class="LBComment--RootComment">
                    <comments-item
                    @childComment="handleChildComment"
                    @comment-report="handleCommentReport"
                    :index="index"
                    :currentUser="currentUser" :comment="item.comment_root"></comments-item>
                </div>
                <div class="child-comment-items">
                    <div class="LBComment--ChildComment" v-for="reply in item.comment_reply" :key="reply.id">
                        <reply-item
                        @addComment="handleAddChildComment"
                        @comment-report="handleCommentReport"
                        :index="index"
                        :currentUser="currentUser" :comment="reply"></reply-item>
                    </div>
                </div>
                <div class="more_reply">
                    <span v-if="item.comment_reply_more" @click="handleGetMoreReply(item.comment_root.id, index)">查看全部 {{ item.total_comment_reply }} 条评论</span>
                </div>
            </div>
        </transition-group>
        <el-pagination
        :current-page.sync="page"
        @current-change="handleCommentPage"
        :page-size="size"
        :total="total"
        layout="total, prev, pager, next"
        ></el-pagination>
        <report-dialog :showDialog="showDialog"
            @cancel-edit="handleCancelReport"
            @confirm-report="handleConfirmReport"
            :reportTypeList="reportTypeList"
            ref="reportDialog"
        ></report-dialog>
   </div>
</template>

<script>
import CommentsItem from './packages/comment-item/index.js';
import ReplyItem from './packages/replay-item/index.js';
import reportDialog from './dialogReport';

export default {
    name: 'LbComments',
    components: {
        CommentsItem,
        ReplyItem,
        reportDialog
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
                        ],
                        comment_reply_more: false,
                        total_comment_reply: 3,
                    }
                ]
            }
        },
        currentUser: {
            type: String,
            default() {
                return '';
            }
        },
        commentsCount: {
            type: Number,
            default(){
                return 0;
            }
        },
        total: {
            type: Number,
            default() {
                return 31;
            }
        },
        size: {
            type: Number,
            default() {
                return 10;
            }
        },
        currentPage: {
            type: Number,
            default() {
                return 1;
            }
        }
    },
    data() {
        return {
            page: this.currentPage,
            showDialog: false,
            reportTypeList: [],

            isReportRootComment: true,
            commentId: '',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleReportTypeList();
    },
    methods: {
        handleChildComment(index, data){
            this.commentsList[index].comment_reply.unshift(data);
        },
        handleAddChildComment(index, data){
            this.commentsList[index].comment_reply.unshift(data);
        },
        handleCommentPage() {
            this.$emit('pageChange', this.page)
        },
        handleGetMoreReply(id,index) {
            this.$axios.post('/comment/api/comment_reply/more', 
                this.$qs.stringify({
                    commentId: id
                })
            ).then(res=>{
                if(res){
                    this.commentsList[index].comment_reply.push(...res.data.data);
                    this.commentsList[index].comment_reply_more = false;
                }
            })
        },
        handleCommentReport(id, type) {
            this.isReportRootComment = type === 1 ? true : false;
            this.commentId = id;
            this.showDialog = true;
        },
        handleCancelReport(){
            this.showDialog = false;
        },
        handleReportTypeList(){
            this.$axios.post('/comment/api/report/config/get', 
                
            ).then(res=>{
                if(res){
                    this.reportTypeList = res.data.data;
                }
            })
        },
        handleConfirmReport(data){
            this.$axios.post('/comment/api/comment/report',
                this.$qs.stringify({
                    type: this.isReportRootComment ? 1 : 2,
                    commentId:  this.commentId,
                    reportId: data.reportId,
                    reportText: data.reportText
                })
            ).then(res=>{
                if(res){
                    this.$message.success('举报成功');
                    this.$refs.reportDialog.handleCancelEdit();
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

.more_reply{
    margin-bottom: 10px;
    span{
        display: inline-block;
        padding: 5px 15px;
        width: 100%;
        cursor: pointer;
        text-align: center;
        transition: all .3s linear 0s;
        color: #606266e6;
    }
    span:hover{
        color: #3a8ee6;
    }
}

.comment-list{
    .topBar{
        .topBar-title{
            border-left: 5px solid #e65611;
            padding: 0 15px;
            margin: 20px 0;
            font-weight: 700;
            font-size: 23px;
            font-family: cursive;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            display: flex;
            align-items: flex-end;
            .commentIcon{
                font-size: 23px;
            }
            .text{
                padding: 0 15px;
            }
        }
    }
}

.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
</style>