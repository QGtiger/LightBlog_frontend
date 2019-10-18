<!-- 文章列表 -->
<template>
   <div class='article-list-cont'>
       <Title title="文章列表"></Title>
       <div class="search-cont">
           <div class="search-form">
               <el-form :inline="true" :model="searchForm" ref="searchForm">
                   <el-form-item label="文章标题">
                       <el-input v-model="searchForm.articleName"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-button type="primary" @click="handleSearchArticle">搜索</el-button>
                       <el-button type="warning" @click="handleJumpAddArticle">发布文章</el-button>
                   </el-form-item>
               </el-form>
           </div>
       </div>
       <div class="table-cont table">
           <el-table :data="articleList">
               <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                
               ></el-table-column>
               <el-table-column label="文章标题" prop="title"></el-table-column>
               <el-table-column label="文章简介" prop="description"></el-table-column>
               <el-table-column label="所属专栏" prop="specialColumn"></el-table-column>
               <el-table-column label="所属专题" prop="specialTheme"></el-table-column>
               <el-table-column label="所属个人栏目" prop="personalColumn"></el-table-column>
               <el-table-column label="创建时间">
                   <template slot-scope="scope">{{ $util.Time.getAllTime(scope.row.created) }}</template>
               </el-table-column>
               <el-table-column label="更新时间">
                   <template slot-scope="scope">{{ $util.Time.getAllTime(scope.row.updated) }}</template>
               </el-table-column>
               <el-table-column label="是否上推荐">
                   <template v-slot="scope">
                       <div>
                           <span class="is-recommend" v-if="scope.row.isRecommend">是</span>
                           <span v-else>否</span>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="状态">
                   <template v-slot="scope">
                       <div>
                           <span>{{  handleStatusText(scope.row.status) }}</span>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="点赞" prop="usersLike"></el-table-column>
               <el-table-column label="踩" prop="usersDisLike"></el-table-column>
               <el-table-column label="浏览数" prop="scanCount"></el-table-column>
               <el-table-column label="操作">
                   <template v-slot="scope">
                       <div>
                           <span class="update" @click="handleJumpUpdate(scope.row.id)">编辑</span>
                           <span class="up" v-if="scope.row.status === 0" @click="handleUpArticle(scope.row.id, scope.row.title)">发布</span>
                       </div>
                   </template>
               </el-table-column>
           </el-table>
       </div>
   </div>
</template>

<script>
import Title from '@/components/title/title';
import { stat } from 'fs';
export default {
    components: {
        Title
    },
    data() {
        return {
            searchForm: {
                articleName: '',
            },
            articleList: [],
            currentPage: 1,
            size: 10,
            total: 0,
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetArticleList();
    }, 
    methods: {
        handleSearchArticle() { //搜索文章

        },
        indexMethod(index) {
            return index + 1 + (this.currentPage - 1)*this.size;
        },
        handleJumpUpdate(id){ //跳转到编辑页面

        },
        handleGetArticleList() { //获取文章
            this.$axios.post('/article/api/get/articlelist?page='+this.currentPage+'&size='+this.size).then(res=>{
                this.articleList = res.data.data;
            })
        },
        handleStatusText(status){
            let text = '';
            switch(status){
                case  0:
                    text = '未发布';
                    break;
                case  1:
                    text = '待处理';
                    break;
                case  2:
                    text = '已驳回';
                    break;
                case  3:
                    text = '已发布';
                    break;
            }
            return text;
        },
        handleUpArticle(id, title){ //发布文章
            this.$confirm('确定发布 -- 《'+title+'》 ? \n 您需要等待 管理员 审核通过才能发布', '注意', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: 'true',
                type: 'warning'
            }).then(() => {

            }).catch(() => {

            })
        },
        handleJumpAddArticle(){  //跳转 编写文章
            this.$router.push({
                path: 'add'
            })
        }
    },
    created() {

    },
}
</script>
<style>
.is-recommend{
    color: #bf0000;
}
</style>