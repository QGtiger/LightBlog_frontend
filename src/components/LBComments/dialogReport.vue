<!-- 举报dialog 组件 -->
<template>
   <div class='report-dialog'>
       <el-dialog
        title="举报信息填写"
        :visible.sync="showDialog"
        :before-close="handleCancelEdit"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :append-to-body="true"
        width="580px"
        center
       >
        <el-form :model="reportForm" ref="reportForm" label-position="top" :rules="rules">
            <el-form-item label="举报类型:" required prop="reportId">
                <el-select style="width:100%" v-model="reportForm.reportId" @change="handleChangeType">
                    <el-option
                        v-for="item in reportTypeList"
                        :key="item.id"
                        :label="item.reportType"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="举报具体内容" class="is-required" prop="reportText">
                <el-input type="textarea" :placeholder="reportPlaceholder" :autosize="{ minRows: 3, maxRows: 6 }" v-model="reportForm.reportText"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center">
                <el-button style="width: 100%" type="primary" @click="handleConfirmReport" long>确定 举报</el-button>
            </el-form-item>
        </el-form>
       </el-dialog>
   </div>
</template>

<script>

export default {
    name: 'reportDialog',
    components: {},
    props:{
        showDialog: {
            type: Boolean,
            default() {
                return false;
            }
        },
        reportTypeList: {
            type: Array,
            default() {
                return [{
                    id: 1,
                    reportType: 'test1',
                    placeholder: 'haha'
                }];
            }
        }
    },
    data() {
        var checkNotNull = (name) => {
            return (rule, value, callback) => {
                var checkValue = value.replace(/(^\s*)|(\s*$)/g, '')
                if(checkValue.length === 0){
                    return callback(new Error(name+'不能为空'))
                }else{
                    callback();
                }
            }
        };
        return {
            message: 'reportDialog',
            reportForm:{
                reportId: '',
                reportText: '',
            },
            reportPlaceholder: '请填写信息',

            rules:{
                reportId: [
                    { required: true, message: '举报内容不能为空', trigger: 'blur' }
                ],
                reportText: [
                    { required: true, validator: checkNotNull('举报内容'), trigger: 'blur' }
                ]
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {
        handleCancelEdit() {
            this.reportForm = {
                reportId: '',
                reportText: '',
            };
            this.reportPlaceholder = '请填写信息',
            this.$refs.reportForm.resetFields();
            this.$emit('cancel-edit')
        },
        handleConfirmReport(){
            this.$refs.reportForm.validate(valid=>{
                if(valid){
                    this.$emit('confirm-report', this.reportForm)

                }else{

                }
            })
        },
        handleChangeType(){
            this.reportForm.reportText = '';
            this.reportTypeList.forEach(item => {
                if(item.id === this.reportForm.reportId){
                    this.reportPlaceholder = item.placeholder;
                    return;
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

.el-textarea__inner{
    resize: none;
    font-family: cursive;
}


</style>