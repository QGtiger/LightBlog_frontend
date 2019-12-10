<!-- 文章审核 -->
<template>
   <div class='check-cont'>
       <Title title="文章详情" :back="true"></Title>
        <div class="article-form">
           <div class="form">
               <el-form :model="articleForm" label-position="left" label-width="100px">
                   <el-form-item label="文章标题">
                       {{articleForm.title}}
                   </el-form-item>
                   <el-form-item label="文章状态">
                       <span class="status-text">{{handleStatusText(articleForm.status)}}</span>
                   </el-form-item>
                   <el-form-item label="更新时间">
                       {{ $util.Time.getAllTime(articleForm.updated) }}
                   </el-form-item>
                   <el-form-item label="文章简介">
                       {{articleForm.description}}
                   </el-form-item>
                    <el-form-item label="封面">
                        <el-image 
                            style="width: 200px; height: 200px"
                            :src="articleForm.previewImg[0].url" 
                            :preview-src-list="articleForm.previewImg.map(item=>item.url)">
                        </el-image>              
                    </el-form-item>
                    <el-form-item label="所属专栏">
                        {{articleForm.columnName}}
                    </el-form-item>
                    <el-form-item label="所属专题">
                        {{articleForm.themeName}}
                    </el-form-item>
               </el-form>
           </div>
           <div class="mavon-editor">
               <mavon-editor
                    class="md"
                    :value="articleForm.bodyHtml"
                    :subfield = "false"
                    :defaultOpen = "'preview'"
                    :toolbarsFlag = "false"
                    :editable="false"
                    :scrollStyle="true"
                    :ishljs = "true"
                ></mavon-editor>
               <div class="meta-footer">
                   <el-button @click="handleCancelBack">确认</el-button>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
import Title from '@/components/title/title';
import qs from 'qs';
export default {
    components: {
        Title
    },
    data() {
        return {
            id: '',
            articleForm: {
                title: '',
                description: '',
                previewImg: [{url:''}],
                columnName: '',
                themeName: '',
                bodyHtml: '',
                bodyHtml: ''
            },
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.id = this.$route.query.id === undefined ? '' : this.$route.query.id;
        this.$route.query.id === undefined ? '' : this.handleGetArticleDetail();
    },
    methods: {
        handleGetArticleDetail(){
            this.$axios.post('/article/api/detail/article', 
                qs.stringify({
                    id: this.id
                })
            ).then(res => {
                this.articleForm = res.data.data;
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
        handleCancelBack(){ //取消返回上一级
            this.$router.back();
        },

    },
    created() {

    }
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
.check-cont{
    .article-form{
        margin-bottom: 80px;
        .form{
            width: 800px;
            margin: 30px auto;
            .status-text{
                color: #ff4f01;
            }
            .status-text::before{
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #ff4f01;
                border-radius: 3px;
                vertical-align: middle;
                margin-right: 3px;
            }
        }
        .mavon-editor{
            min-width: 1000px;
            width: 80%;
            margin: 20px auto;
            .meta-footer{
                display: flex;
                justify-content: center;
                margin-top:30px;
            }
        }
    }
}
</style>