<!-- 评论检举 -->
<template>
   <div class='report-comment-cont'>
       <Title title="评论检举"></Title>
       <div class="search-header">
           <el-form :inline="true" :model="searchForm" label-width="100px" label-position="left">
               <el-form-item label="举报类型">
                   <el-select v-model="searchForm.reportId">
                       <el-option label="全部" value=""></el-option>
                       <el-option
                        v-for="item in reportTypeList"
                        :key="item.id"
                        :label="item.reportType"
                        :value="item.id"
                       ></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="handleCommentReportList">搜索</el-button>
               </el-form-item>
           </el-form>
       </div>
       <div class="report-table table">
           <el-table :data="reportList">
               <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
               <el-table-column label="评论文章" prop="blog"></el-table-column>
               <el-table-column label="举报类型" prop="reportType"></el-table-column>
               <el-table-column label="举报内容" prop="reportText"></el-table-column>
               <el-table-column label="评论内容" width="300">
                   <template v-slot="scope">
                       <div>
                           <div class="line-clamp" :title="scope.row.commentText" v-html="emoji(scope.row.commentText)"></div>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="举报人" prop="reportUser"></el-table-column>
               <el-table-column label="操作">
                   <template v-slot="scope">
                       <div>
                           <span class="detail">详情</span>
                       </div>
                   </template>
               </el-table-column>
           </el-table>
           <el-pagination
            :current-page.sync="currentPage"
            @current-change="handleCommentReportList"
            :size="size"
            :total="total"
            layout="total, prev, pager, next"
           ></el-pagination>
       </div>
   </div>
</template>

<script>
import Title from '@/components/title/title';
export default {
    components: {
        Title
    },
    data() {
        return {
            currentPage: 1,
            size: 7,
            total: 0,

            reportList: [],
            reportTypeList: [],
            searchForm:{
                reportId: ''
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleCommentReportList();
        this.handleReportTypeList();
    },
    methods: {
        handleCommentReportList(){
            this.$axios.post('/comment/api/comment/report/list?page='+this.currentPage+'&size='+this.size,
                this.$qs.stringify({
                    reportId: this.searchForm.reportId
                })
            ).then(res=>{
                if(res){
                    this.reportList = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        indexMethod(index){
            return index + 1 + (this.currentPage - 1)*this.size;
        },
        handleReportTypeList(){
            this.$axios.post('/comment/api/report/config/get', 
                
            ).then(res=>{
                if(res){
                    this.reportTypeList = res.data.data;
                }
            })
        },
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
.report-comment-cont{
    .line-clamp{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        -webkit-box-orient: vertical;
    }
}
</style>