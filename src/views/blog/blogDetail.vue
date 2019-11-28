<!-- 博客详情 -->
<template>
   <div class='blog-detail'>
       <div class="blog-cont">
            <div class="markdown-cont">
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
            <div class="fixed-box">
                <div class="markdown-meta-right">
                    <div class="author-info">
                        <div class="author-avator">
                            <div style="display:inline-block;cursor:pointer" @click="handleJumpAuthorDetail(blogInfo.author)"><el-avatar :src="blogInfo.author_url"></el-avatar></div>
                        </div>
                        <div class="author-avator-right">
                            <div class="right-top">
                                <span class="author-text" @click="handleJumpAuthorDetail(blogInfo.author)">{{ blogInfo.author }}</span>
                                <!-- <span>123</span> -->
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
                        <span>基本介绍: {{ blogInfo.description }}</span>
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
       </div>
   </div>
</template>

<script>
import qs from 'qs';
export default {
    components: {},
    data() {
        return {
            blogId: '',
            body: '',
            blogInfo: {}
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

        .markdown-cont{
            width: calc(100% - 330px);
            min-width: 600px;
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
                    height: 44px;
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    line-height: 22px;
                    .author-text{
                        cursor: pointer;
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