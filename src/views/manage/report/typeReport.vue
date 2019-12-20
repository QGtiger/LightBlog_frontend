<!-- 举报配置 -->
<template>
   <div class='report-type-cont'>
       <Title title="举报配置"></Title>
       <div class="config-header">
           <div class="r-config">
               <el-button type="primary" @click="handleShowAddReport">添加</el-button>
           </div>
       </div>
       <div class="config-table">
           <div class="table">
               <el-table :data="configList">
                   <el-table-column label="序号" width="200" type="index" :index="indexMethod"></el-table-column>
                   <el-table-column label="举报类型" prop="reportType"></el-table-column>
                   <el-table-column label="placeholder" prop="placeholder"></el-table-column>
                   <el-table-column label="操作">
                       <template v-slot="scope">
                           <div style="display:flex;">
                               <span class="operation edit" @click="handleEditConfig(scope.row.id)">编辑</span>
                               <el-popconfirm
                                title="确定删除该评论 ？"
                                @onConfirm="handleConfirmDel(scope.row.id)"
                                :confirmButtonText="'确定'"
                                ref="popconfirm"
                                >
                                    <div class="delete-btn operation del" slot="reference">
                                        <i class="iconfont iconfont-btn delete-icon">&#xe618;</i>
                                        <span class="iconfont-text">删除</span>
                                    </div>
                                    
                                </el-popconfirm>
                               
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
           </div>
       </div>
       <el-dialog
        :title="dislogTitle"
        :visible.sync="showDialog"
        :before-close="handleCancelEdit"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :append-to-body="true"
        width="580px"
        center
       >
        <el-form :model="configForm" label-position="left" :rules="configFormConfig" label-width="140px" ref="configForm">
            <el-form-item label="举报类型:" prop="reportType" class="is-required">
                <el-input v-model="configForm.reportType" placeholder="请输入举报类型"></el-input>
            </el-form-item>
            <el-form-item label="举报 placeholder: " prop="placeholder" class="is-required">
                <el-input type="textarea" placeholder="请输入 placeholder" :autosize="{ minRows: 4, maxRows: 6 }" v-model="configForm.placeholder"></el-input>
            </el-form-item>
            <div style="text-align:center">
                <el-button type="primary" @click="handleSubmitConfig" :loading="loading">确定</el-button>
                <el-button type="primary" plain @click="handleCancelSubmit">取消</el-button>
            </div>
        </el-form>
       </el-dialog>
   </div>
</template>

<script>
import Title from '@/components/title/title'
export default {
    components: {Title},
    data() {
        var checkNotNull = (name) => {
            return (rule, value, callback) => {
                let checkValue = value.replace(/(^\s*)|(\s*$)/g,'')
                if(checkValue.length == 0){
                    callback(new Error(name+'不能为空'));
                }else{
                    callback();
                }
            }
        };
        return {
            configList: [],
            is_update: false, //是否更新
            showDialog: false,
            configForm: {},
            configFormConfig: {
                reportType: [
                    { require: true, validator: checkNotNull('举报类型'), trigger: 'blur' }
                ],
                placeholder: [
                    { require: true, validator: checkNotNull('placeholder'), trigger: 'blur' }
                ]
            },
            loading: false,
        };
    },
    computed: {
        dislogTitle() {
            return this.is_update ? '编辑配置': '新增配置'
        }
    },
    watch: {},
    mounted() {
        this.handleConfigList();
    },
    methods: {
        handleShowAddReport() {
            this.showDialog = true;
        },
        indexMethod(index){
            return index + 1;
        },
        handleConfigList(){
            this.$axios.post('/comment/api/report/config/get', 
                
            ).then(res=>{
                if(res){
                    this.configList = res.data.data;
                }
            })
        },
        handleCancelEdit() {
            this.showDialog = false;
            this.configForm = {
                reportType: '',
                placeholder: '',
            }
            this.$refs.configForm.resetFields();
        },
        handleSubmitConfig() {
            this.loading = true;
            this.$refs.configForm.validate(valid=>{
                if(valid){
                    if(this.is_update){
                        this.$axios.post('/comment/api/report/config/update',
                            this.$qs.stringify(this.configForm)
                        ).then(res=>{
                            if(res){
                                this.$message.success('更新成功');
                                this.handleConfigList();
                                this.handleCancelEdit();
                                this.is_update = false;
                            }
                            this.loading = false;
                        })
                    }else{
                        this.$axios.post('/comment/api/report/config/add',
                            this.$qs.stringify(this.configForm)
                        ).then(res=>{
                            if(res){
                                this.$message.closeAll();
                                this.$message.success('添加成功');
                                this.handleConfigList();
                                this.handleCancelEdit();
                            }
                            this.loading = false;
                        })
                    }
                }else{
                    this.loading = false;
                }
            })
            
        },
        handleCancelSubmit(){
            this.handleCancelEdit();
        },
        handleConfirmDel(id) { //删除 
            this.$axios.post('/comment/api/report/config/del',
                this.$qs.stringify({
                    id
                })
            ).then(res=>{
                if(res){
                    this.$message.success('删除成功');
                    this.handleConfigList();
                }
            })
        },
        handleEditConfig(id){
            this.$axios.post('/comment/api/report/config/detail',
                this.$qs.stringify({
                    id
                })
            ).then(res=>{
                if(res){
                    this.configForm = res.data.data;
                    this.is_update = true;
                    this.showDialog = true;
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
.report-type-cont{
    .operation{
        cursor: pointer;
        padding: 0 10px;
    }
    .edit{
        color: #4395ff;
    }
    .del{
        color: #f14d08;
    }
    .config-header{
        overflow: hidden;
        padding: 20px 10px;
        .r-config{
            float: right;
        }
    }
    .config-table{
        .delete-btn{
            display: flex;
            align-items: center;

        }
    }
}
</style>