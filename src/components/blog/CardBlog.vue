<!-- 博客首页缩略显示 -->
<template>
   <div class='blog-card'>
       <el-row :title="blog.description" :gutter="10">
           <el-col :span="18">
               <div class="blog-title">
                   <p class="title">
                       {{ blog.title }}
                   </p>
               </div>
               <div class="blog-text">
                   <p class="text">
                       {{ blog.body }}...
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
               <el-avatar size="small" :src="blog.author_img_url"></el-avatar>
               &nbsp;&nbsp;{{ blog.author }}
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
    width: 1000px;
    margin:0 auto;
    height: 180px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
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
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
}

.meta-footer{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
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