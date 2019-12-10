<!-- 博客详情 -->
<template>
   <div class='blog-detail'>
       <div class="blog-cont">
            <div class="markdown-cont">
                <el-breadcrumb style="padding: 25px;background-color: rgb(251, 251, 251);" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/theme/list', query: {id: blogInfo.specialColumnId} }">{{ blogInfo.specialColumn }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ blogInfo.specialTheme }}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="blog-header">
                    <div class="blog-title">
                        <h1>{{ blogInfo.title }}</h1>
                    </div>
                    <div class="blog-author">
                        <div class="avator">
                            <router-link :to="{ path: '/author/detail', query: { user: blogInfo.author } }"><img :src="blogInfo.author_url" alt="233"></router-link>
                            
                        </div>
                        <div class="author-info">
                            <p><router-link :to="{ path: '/author/detail', query: { user: blogInfo.author } }">{{ blogInfo.author }}</router-link></p>
                            <p class="tips-footer">
                                <span class="create-time">{{ $util.Time.getAllTime(blogInfo.updated) }}</span>
                                &nbsp;&nbsp;
                                <span class="word-count">字数: {{handleNumToThousands(blogInfo.wordCount)}}</span>
                                &nbsp;&nbsp;
                                <span class="read-count">阅读数: {{handleNumToThousands(blogInfo.scanCount)}}</span>
                                &nbsp;&nbsp;
                                <span class="like-count">点赞数: {{handleNumToThousands(blogInfo.usersLike)}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <mavon-editor
                    class="md"
                    :value="body"
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs = "true"
                    :boxShadow = "false"
                ></mavon-editor>
            </div>
            <div class="fixed-box">
                <div class="markdown-meta-right">
                    <div class="author-info">
                        <div class="author-avator">
                            <div style="display:inline-block;cursor:pointer" @click="handleJumpAuthorDetail(blogInfo.author)"><el-avatar :src="blogInfo.author_url"></el-avatar></div>
                        </div>
                        <div class="author-avator-right">
                            <div class="right-top">
                                <span class="author-text" @click="handleJumpAuthorDetail(blogInfo.author)">{{ blogInfo.author }}</span>
                                <div class="follow-cont" v-if="blogInfo.author != $store.state.username" style="display: inline-block; float:right">
                                    <span class="follow-author" v-if="!isFollow" @click="handleFollowAuthor">+ 关注</span>
                                    <span class="follow-author" v-else @click="handleFollowAuthor">- 取消关注</span>
                                </div>
                            </div>
                            <div class="right-bottom">
                                <span class="meta-text">已发布了 {{ blogInfo.author_blogsCount }} 篇文章</span>
                            </div>
                        </div>
                    </div>
                    <div class="blog-description">
                        <span>本篇文章字数 {{ blogInfo.wordCount }}</span>
                        <span>阅读数: {{ blogInfo.scanCount }} 人 </span>
                        <span>点赞数: {{ blogInfo.usersLike }} 人 </span>
                        <span style="word-break: break-word;">基本介绍: {{ blogInfo.description }}</span>
                        <span>更新时间: {{ $util.Time.getAllTime(blogInfo.updated) }}</span>
                    </div>
                    <div class="recommendBlogsList">
                        <div class="recommend-blog" v-for="item in blogInfo.author_recommendBlogsList" :key="item.id">
                            <div class="title-cont">
                                <p class="title-text" style="cursor: pointer;" @click="handleJumpBlogDetail(item.id)">{{ item.title }}</p>
                            </div>
                            <div class="meta-footer">
                                <span>{{ item.scanCount }}人 阅读</span>
                                <span>{{ item.usersLike }}人 点赞</span>
                                <span>{{ $util.Time.getFormatTime(item.updated) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="comment-page-cont">
                <div class="comment-editor">
                    <img :src="this.$store.state.avatorUrl" alt="">
                    <div class="editor-cont">
                        <div class="editor-body">
                            <textarea class="editor" v-model="commentText" @focus="handleFocusTextarea"></textarea>
                        </div>
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
                </div>
            </div>
       </div>
   </div>
</template>

<script>
import qs from 'qs';
import vueEmoji from '@/components/emoji/emoji.vue';
export default {
    components: {
        vueEmoji
    },
    data() {
        return {
            blogId: '',
            body: '',
            blogInfo: {},
            isFollow: false,

            commentText: '', //评论文字
            isShowCommentBtn: false,//是否显示评论按钮,
            showEmoji: false, //是否显示emoji
        };
    },
    computed: {},
    watch: {
        '$route' (to, from) {
            if(to.params.id != from.params.id){
                this.blogId = to.params.id;
                this.init();
            }
        }
    },
    mounted() {
        this.blogId = this.$route.params.id == undefined ? "" : this.$route.params.id;
        this.$route.params.id == undefined ? "" : this.handleGetBlogDetail();
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 80) {
                $('.fixed-box').addClass('fixed-css')
            } else {
                $('.fixed-box').removeClass('fixed-css')
            }
        });
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
                    this.blogInfo = res.data.data;
                    this.body = res.data.data.body
                    this.isFollow = res.data.is_follow;
                }
            })
        },
        handleJumpBlogDetail(id) { //跳转到文章详情
            console.log(id)
            this.$router.push("/blog/" + id);
        },
        handleJumpAuthorDetail(username){
            this.$router.push({
                path: '/author/detail',
                query: {
                    user: username
                }
            })
        },
        handleFollowAuthor() { //关注 用户
            let type = this.isFollow ? 'notFollow' : 'follow';
            this.$axios.post('/account/api/author/follow',
                qs.stringify({
                    follow: this.blogInfo.author,
                    type: type
                })
            ).then(res => {
                if(res){
                    this.$message.success(this.isFollow ? '取消关注成功' : '关注成功')
                    this.isFollow  = this.isFollow ? false : true;
                }
            })
        },
        handleNumToThousands(num){
            var str = (num || 0).toString();
            var result = '';
            while(str.length > 3){
                result = ','+str.slice(-3) + result;
                str = str.slice(0, str.length - 3)
            }
            if(str){
                result = str + result;
            }
            return result;
        },
        handleFocusTextarea(){
            this.isShowCommentBtn = true;
        },
        handleCancelComment() {
            this.isShowCommentBtn = false;
        },
        handleShowEmoji() {
            this.showEmoji = true;
        },
        selectEmoji(code){
            this.commentText += code;
        },
        handleConfirmComment() {
            console.log(213)
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
@media screen and (max-width: 1290px){
    .fixed-css{
        left: 1143px;
    }
}

.fixed-css{
    position: fixed;
    top: 10px;
    right: 10%;
}

.blog-detail{
    min-width: 1270px;
    .blog-cont{
        width: 80%;
        min-width: 1000px;
        padding-top: 40px;
        margin: 0px auto;
        position: relative;
        .comment-page-cont{
            margin-top: 30px;
            width: calc(100% - 330px);
            .comment-editor{
                padding: 20px 0px 20px 30px;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                    box-shadow: 2px 2px 7px #808080;
                    float: left;
                }
                .editor-cont{
                    padding-left: 90px;
                    padding-top: 25px;
                    .editor-body{
                        position: relative;
                    }
                    textarea{
                        padding: 12px 16px;
                        width: calc(100% - 30px);
                        height: 90px;
                        font-size: 15px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        background-color: #eee;
                        resize: none;
                        display: inline-block;
                        vertical-align: top;
                        outline-style: none;
                        border-radius: 4px;
                    }
                    .editor-body::before{
                        content: '';
                        position: absolute;
                        top: 0px;
                        left: -16px;
                        border: 10px solid transparent;
                        border-right: 10px solid #eee;
                        border-top: 10px solid #eee;
                    }
                    .editor-footer{
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
                                cursor: pointer;
                                transition: all .4s;
                            }
                            .cancel-comment:hover{
                                background-color: #eee;
                                transition: all .4s;
                            }
                            .confirm-comment{
                                display: inline-block;
                                padding: 5px 15px;
                                border-radius: 10px;
                                border: 1px solid #f56c6c73;
                                color: #f5f7fa;
                                background-color: #f56c6ccc;
                                cursor: pointer;
                                margin-right: 10px;
                                transition: all .4s;
                            }
                            .confirm_hover:hover{
                                background-color: #f56c6c;
                                transition: all .4s;
                            }
                        }
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

        .markdown-cont{
            width: calc(100% - 330px);
            min-width: 600px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            .blog-header{
                background-color: rgb(251, 251, 251);
                .blog-title{
                    h1{
                        padding-left: 25px;
                        font-size: 40px;
                    }
                }
                .blog-author{
                    margin-top: 20px;
                    padding-left: 25px;
                    padding-bottom: 10px;
                    display: flex;
                    .avator{
                        width: 35px;
                        height: 35px;
                        border-radius: 100%;
                        overflow: hidden;
                        img{
                            width: 100%;
                        }
                    }
                    .author-info{
                        margin-left: 10px;

                        .tips-footer{
                            font-size: 13px;
                            color: #909399d4;
                        }
                    }
                }
            }
        }

        .markdown-meta-right{
            width: 280px;
            height: 450px;
            background-color: rgb(251, 251, 251);
            border-radius: 4px;
            position: absolute;
            right: 0;
            top: 40px;
            padding: 8px 12px;
            box-shadow: 0px 0px 10px #cccc;
            
            .author-info{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;
                padding-bottom: 10px;
                border-bottom: 1px solid #96969670;
                .author-avator-right{
                    width: 100%;
                    height: 44px;
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    line-height: 22px;
                    .author-text{
                        cursor: pointer;
                    }
                    .follow-author{
                        float: right;
                        border: 1px solid #e46c0e;
                        padding: 0px 15px;
                        border-radius: 15px;
                        font-size: 12px;
                        font-weight: 700;
                        cursor: pointer;
                        color: #e46c0e;
                    }
                    .author-text:hover{
                        color: #777;
                    }
                    .right-bottom{
                        font-size: 12px;
                        color: #969696;
                    }
                }
            }

            .blog-description{
                font-size: 12px;
                color: #969696;
                display: flex;
                flex-direction: column;
                padding: 5px;
                border-bottom: 1px solid #96969670;
            }

            .recommendBlogsList{

                .recommend-blog{
                    padding: 5px;
                    .title-cont{
                        padding: 8px 0px 5px;
                        .title-text{
                            font-size: 15px;
                            transition: all .3s ease-out;
                        }
                        .title-text:hover{
                            color:#18b0de;
                        }
                    }

                    .meta-footer{
                        font-size: 12px;
                        color: #969696;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: row;
                    }
                }
            }
        }
    }
}

</style>