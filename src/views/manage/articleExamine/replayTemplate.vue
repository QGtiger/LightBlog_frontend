<!-- 回复模板 -->
<template>
   <div class='reply-template'>
       <Title title="回复模板"></Title>
       <div class="template-header">
           <el-button type="primary" @click="handleShowAddTemplate">新增模板</el-button>
       </div>
       <div class="template-cont">
           <div class="table">
               <el-table :data="templateList">
                   <el-table-column label="模板简称" prop="title" width="200"></el-table-column>
                   <el-table-column label="模板内容" prop="content"></el-table-column>
                   <el-table-column label="操作">
                       <template v-slot="scope">
                           <div>
                               <span class="update" @click="handleUpdateTemplate(scope.row.id)">修改</span>
                               <span class="del" @click="handleDelTemplate(scope.row.id)">删除</span>
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
           </div>
       </div>
       <el-dialog
        :title="title"
        :visible.sync="dialogShowAddTemplate"
        :before-close="handleCancelAdd"
        width="35%"
        center
       >
        <el-form :model="dialogTemplateForm" ref="dialogTemplateForm" :rules="rules" label-position="right" label-width="80px">
            <el-form-item label="模板简称" prop="title">
                <el-input v-model="dialogTemplateForm.title" placeholder="请输入模板标题"></el-input>
            </el-form-item>
            <el-form-item label="模板内容" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 4}" v-model="dialogTemplateForm.content" placeholder="请输入模板内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAddTemplate">确定</el-button>
                <el-button @click="handleCancelAdd">取消</el-button>
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
        var checkTitleName = (rule, value, callback) => {
            if(value.replace(/(^\s*)|(\s*$)/g, "").length === 0){
                return callback(new Error('标题不能为空'));
            }
            setTimeout(()=>{
                if(value.length>30){
                    callback(new Error('标题长度最多30个字符'));
                }
                else if(value.length < 2){
                    callback(new Error('标题长度最少2个字符'));
                }
                else{
                    callback();
                }
            }, 1000);
        };
        var checkContent = (rule, value, callback) => {
            if(value.replace(/(^\s*)|(\s*$)/g, "").length === 0){
                return callback(new Error('内容不能为空'));
            }
            setTimeout(()=>{
                if(value.length>300){
                    callback(new Error('标题长度最多300个字符'));
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
                title: [
                    { validator: checkTitleName, trigger: 'blur' }
                ],
                content: [
                    { validator: checkContent, trigger: 'blur' }
                ]
            },
            templateList:[],
            dialogShowAddTemplate: false,
            dialogTemplateForm: {
                title: '',
                content: ''
            },
            currentPage: 1,
            size: 10,
            total: 0,
            isUpdate: false, //是否修改模板
            updateId: ''
        };
    },
    computed: {
        title() {
            return this.isUpdate ? '修改模板' : '新增模板';
        }
    },
    watch: {},
    mounted() {
        this.handleGetTemplateList()
    },
    methods: {
        handleShowAddTemplate() { //回复模板
            this.isUpdate = false;
            this.dialogShowAddTemplate = true;
        },
        handleUpdateTemplate(id){ //修改模板
            this.isUpdate = true;
            this.$axios.post('/article/api/detail/replay/template',
                qs.stringify({
                    id
                })
            ).then(res => {
                if(res){
                    this.dialogTemplateForm = {
                        title: res.data.data.title,
                        content: res.data.data.content
                    }
                    this.updateId = res.data.data.id;
                }
            })
            this.dialogShowAddTemplate = true;

        },
        handleDelTemplate(id){ //删除模板
            this.$confirm('确定删除该模板？', '注意', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: 'true',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/article/api/del/replay/template',
                    qs.stringify({
                        id
                    })
                ).then(res=>{
                    if(res){
                        this.$message.success('删除成功');
                        this.handleGetTemplateList();
                    }
                })
            }).catch(() => {

            })
        },
        handleCancelAdd() { //取消新增
            this.dialogShowAddTemplate = false;
            this.dialogTemplateForm ={
                title: '',
                content: ''
            }
            this.$refs.dialogTemplateForm.resetFields();
        },
        handleAddTemplate() { //新增模板
            this.$refs.dialogTemplateForm.validate(valid => {
                if(valid){
                    if(this.isUpdate){
                        this.$axios.post('/article/api/update/replay/template',
                            qs.stringify({
                                id: this.updateId,
                                title: this.dialogTemplateForm.title,
                                content: this.dialogTemplateForm.content
                            })
                        ).then(res => {
                            if(res){
                                this.$message.success('修改成功')
                                this.handleCancelAdd();
                                this.handleGetTemplateList();
                            }
                        })
                    }else{
                        this.$axios.post('/article/api/add/replay/template',
                            qs.stringify({
                                title: this.dialogTemplateForm.title,
                                content: this.dialogTemplateForm.content
                            })
                        ).then(res => {
                            if(res){
                                this.$message.success('新增成功')
                                this.handleCancelAdd();
                                this.handleGetTemplateList();
                            }
                        })
                    }
                }else{
                    this.$message.warning('请认真输入')
                }
            })
        },
        handleGetTemplateList() {
            this.$axios.post(`/article/api/get/replay/template?page=${this.currentPage}&size=${this.size}`).then(res=>{
                if(res){
                    this.total = res.data.total;
                    this.templateList = res.data.data;
                }
            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类

</style>