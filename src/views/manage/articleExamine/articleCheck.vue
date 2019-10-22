<!-- 文章审核 -->
<template>
   <div class='check-cont'>
       <Title title="文章审核" :back="true"></Title>
        <div class="article-form">
           <div class="form">
               <el-form :model="articleForm" label-position="left" label-width="100px">
                   <el-form-item label="文章标题">
                       {{articleForm.title}}
                   </el-form-item>
                   <el-form-item label="文章简介">
                       {{articleForm.description}}
                   </el-form-item>
                    <el-form-item label="封面">
                        <el-image 
                            style="width: 100px; height: 100px"
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
                :value="articleForm.body"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable="false"
                :scrollStyle="true"
                :ishljs = "true"
            ></mavon-editor>
               <div class="meta-footer">
                   <el-button type="primary" >确认</el-button>
                   <el-button >取消</el-button>
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
                previewImg: [],
                columnName: '',
                themeName: '',
                body: ''
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