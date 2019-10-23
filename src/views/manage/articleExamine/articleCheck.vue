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
                :value="articleForm.body"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable="false"
                :scrollStyle="true"
                :ishljs = "true"
            ></mavon-editor>
               <div class="meta-footer">
                   <el-button type="primary" @click="handleShowDialogCheck">审核</el-button>
                   <el-button @click="handleCancelBack">取消</el-button>
               </div>
           </div>
       </div>
       <el-dialog
        title="文章审核"
        :visible.sync="dialogShowCheck"
        :before-close="handleCancelCheck"
        width="35%"
        center
        :close-on-click-modal="false"
       >
            <el-form :model="checkForm" ref="checkForm" :rules="rules" label-position="left" label-width="100px">
                <el-form-item label="文章标题">
                    {{ articleForm.title }}
                </el-form-item>
                <el-form-item label="文章审核">
                    <div>
                        <el-radio v-model="checkForm.status" label="3" border size="medium">文章通过</el-radio>
                        <el-radio v-model="checkForm.status" label="2" border size="medium">文章驳回</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="是否上推荐">
                    <el-checkbox v-model="checkForm.isRecommend">推荐</el-checkbox>
                </el-form-item>
                <el-form-item label="审核模板">
                    <el-select v-model="checkForm.templateId" @change="handleChangeTemplate">
                        <el-option label="自定义" value=""></el-option>
                        <el-option
                            v-for="item in templateList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核内容" prop="content">
                    <el-input type="textarea" :autosize="{minRows:5}" v-model="checkForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleConfirmCheck">确认</el-button>
                    <el-button @click="handleCancelCheck">取消</el-button>
                </el-form-item>
            </el-form>
       </el-dialog>
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
        var checkContent = (rule,value,callback) => {
            if(value.replace(/(^\s*)|(\s*$)/g, "").length === 0){
                return callback(new Error('审核内容不能为空'));
            }
            setTimeout(()=>{
                if(value.length>200){
                    callback(new Error('标题长度最多200个字符'));
                }
                else if(value.length < 2){
                    callback(new Error('标题长度最少2个字符'));
                }
                else{
                    callback();
                }
            }, 1000);
        };
        return {
            rules: {
                content: [
                    { validator: checkContent, trigger: 'blur' }
                ]
            },
            id: '',
            articleForm: {
                title: '',
                description: '',
                previewImg: [{url:''}],
                columnName: '',
                themeName: '',
                body: '',
                bodyHtml: ''
            },
            dialogShowCheck: false,
            checkForm: {
                status: '3',
                templateId: '',
                content: '',
                isRecommend: false
            },
            templateList: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.id = this.$route.query.id === undefined ? '' : this.$route.query.id;
        this.$route.query.id === undefined ? '' : this.handleGetArticleDetail();
        this.handleGetTemplateList();
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
        handleCancelCheck() { //取消审核
            this.checkForm = {
                status: '3',
                templateId: '',
                content: '',
                isRecommend: false
            };
            this.$refs.checkForm.resetFields();
            this.dialogShowCheck=false;
        },
        handleShowDialogCheck() { //显示审核dialog
            this.handleGetArticleCheck();
            this.dialogShowCheck = true;
        },
        handleConfirmCheck() { //上传审核结果
            this.$axios.post('/article/api/check/article', 
                qs.stringify({
                    id: this.id,
                    content:this.checkForm.content,
                    status: this.checkForm.status,
                    isRecommend: this.checkForm.isRecommend
                })
            ).then(res => {
                if(res){
                    this.$message.success('文章已审核');
                    this.handleCancelCheck();
                    this.$router.back();
                }
            })
        },
        handleGetTemplateList() { //获取模板
            this.$axios.post(`/article/api/get/replay/template`).then(res=>{
                if(res){
                    this.templateList = res.data.data;
                }
            })
        },
        handleChangeTemplate() { //change 模板
            this.checkForm.content = '';
            this.templateList.forEach(item => {
                if(item.id === this.checkForm.templateId){
                    this.checkForm.content = item.content;
                    return;
                }
            })
        },
        handleGetArticleCheck(){ //获取文章审核内容
            this.$axios.post('/article/api/get/articlecheck',
                qs.stringify({
                    id: this.id
                })
            ).then(res => {
                let data = res.data.data;
                if(res){
                    this.checkForm.isRecommend = data.isRecommend;
                    this.checkForm.status = data.status+'';
                    this.checkForm.content = data.content;
                }
            })
        }

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