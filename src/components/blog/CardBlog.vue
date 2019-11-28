<!-- 博客首页缩略显示 -->
<template>
   <div class='blog-card'>
       <el-row :title="blog.description" :gutter="10" style="padding: 20px 10px 10px;">
           <el-col :span="18" style="text-align:center">
               <div class="blog-title">
                   <router-link :to="'/blog/'+blog.id">
                        <p class="title">
                            {{ blog.title }}
                        </p>
                   </router-link>
                   
               </div>
               <div class="blog-text">
                   <p class="text">
                       {{ blog.body }}
                   </p>
               </div>
           </el-col>
           <el-col :span="6">
                <el-image :src="blog.blog_img_url"
                :preview-src-list="Array.of(blog.blog_img_url)"
                ></el-image>
           </el-col>
       </el-row>
       <div class="meta-footer">
           <div class="article-panel-source">
               <div style="display:inline-block; cursor:pointer" @click="handleJumpDetail(blog.author)">
                   <el-avatar size="small" :src="blog.author_img_url" ></el-avatar>
               </div>
               &nbsp;&nbsp;<span style="cursor: pointer" @click="handleJumpDetail(blog.author)">{{blog.author}}</span>
               <p>
                    <span class="article-status" :title="handleShowTextTitleLike(blog.usersLike)"><i class="iconfont">&#xe600;</i> {{ blog.usersLike }}</span>
                    <span class="article-status" :title="handleShowTextScanCount(blog.scanCount)"><i class="iconfont">&#xe703;</i> &nbsp;{{ blog.scanCount }}</span>
                    <span class="article-status" :title="handleShowTextTitleWord(blog.wordCount)"><i class="iconfont">&#xe861;</i> &nbsp;{{ blog.wordCount }}</span>
               </p>
           </div>
           <div class="time">
               {{ $util.Time.getFormatTime(blog.updated) }}
           </div>
       </div>
   </div>
</template>

<script>

export default {
    props: ['blog'],
    components: {},
    data() {
        return {
            
        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        handleShowTextTitleLike(value){
            return `${value} 人赞`
        },
        handleShowTextScanCount(value){
            return `${value} 人阅读`
        },
        handleShowTextTitleWord(value){
            return ` 字数 ${value}`
        },
        handleJumpDetail(username){ //跳转到个人详情
            this.$router.push({
                path:'/author/detail',
                query:{
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
.blog-card{
    width: 100%;
    margin:0 auto;
    height: 180px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
}

.blog-card:hover{
    margin: 0 -20px;
    padding:0px 20px 10px 20px;
    background: #fafafa;
}

.el-row{
    overflow: hidden;
    height: 152px;
}

.blog-title .title{
    font-size: 22px;
    line-height: 24px;
    font-weight: 700;
}

.blog-text .text{
    font-size: 15px;
    line-height: 24px;
    margin-top: 5px;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.meta-footer{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
}

.meta-footer .article-panel-source{
    display: flex;
    align-items: center;
}

.meta-footer .article-panel-source .article-status{
    margin-left: 10px;
    font-size: 12px;
    color: rgb(107, 81, 81);
    cursor: pointer;;
}

.meta-footer .time{
    font-size: 14px;
}

a{
    color: rgb(44, 62, 80);
}

@media screen and (max-width: 500px){
    .blog-card{
        width: 90%;
        height: 100px;
    }
    .el-row{
        height: 80px;
    }
    .blog-text .text{
        -webkit-line-clamp: 2;
    }
}
</style>