<!-- 专栏模块 -->
<template>
   <div class='special-column-cont'>
       <Title title="专栏管理"></Title>
       <div class="search-cont">
           <div>
               <el-button type="primary" @click="handleShowDialogAddSpecial">增加专栏</el-button>
           </div>
       </div>
       <div class="table">
           <el-table :data="specialColumnList">
                <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                width="200">
                </el-table-column>
                <el-table-column prop="specialColumn" label="专栏名称">

                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ $util.Time.getAllTime(scope.row.created) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="专栏简介" ></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <div>
                            <span class="update">编辑</span>
                            <span class="del" @click="handleDelSpecialColumn(scope.row.id,scope.row.specialColumn)">删除</span>
                        </div>
                    </template>
                </el-table-column>
           </el-table>
            <el-pagination
              :current-page.sync="currentPage"
              @current-change="handleGetSpecialColumnList"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="total"
              :hide-on-single-page="true"
            ></el-pagination>             
       </div>
        <el-dialog
            title="添加文章专栏"
            :visible.sync="dialogShowAddSpecial"
            :before-close="handleCancelAddSpecial"
            width="40%"
            center
        >
            <el-form :model="dialogAddSpecialForm" ref="dialogAddSpecialForm" label-width="80px" :rules="rules">
                <el-form-item prop="columnName" label="专栏名称">
                    <el-input v-model="dialogAddSpecialForm.columnName" placeholder="请填写专栏名称"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="简介">
                    <el-input type="textarea" v-model="dialogAddSpecialForm.description"></el-input>                    
                </el-form-item>
                <el-form-item label="封面">
                    <el-upload
                        :class="{disabled: showUploadBtn}"
                        action
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        :on-change="handleUploadImage"
                        :file-list="showImage"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogImage" :append-to-body="true">
                        <img width="100%" :src="dialogImageUrl" alt="logo" />
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddSpecialColumn">提交</el-button>
                    <el-button @click="handleCancelAddSpecial">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
   </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
import Title from '@/components/title/title';
import qs from 'qs';

export default {
    components: {
        Title,
        VueCropper
    },
    data() {
        return {
            rules: {
                columnName: [
                    { required: true, message: '请输入专栏名称', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入专栏简介', trigger: 'blur' }
                ]
            },
            currentPage: 1,
            specialColumnList: [],
            total: 0,
            dialogShowAddSpecial: false,
            dialogAddSpecialForm: {
                columnName: '',
                description: '',
                coverImage: ''
            },
            showUploadBtn: false,
            dialogImageUrl: '',
            dialogImage: false,
            showImage: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialColumnList();
    },
    methods: {
        indexMethod(index) {
            return (index+1) + (this.currentPage-1)*10;
        },
        handleGetSpecialColumnList() {
            this.$axios.get('/article/api/get/special_column').then(res=>{
                this.specialColumnList = res.data.data;
                this.total = res.data.total;
            })
        },
        handleCancelAddSpecial(){
            this.dialogShowAddSpecial = false;
            this.dialogAddSpecialForm= {
                columnName: '',
                description: '',
            }
            this.$refs.dialogAddSpecialForm.resetFields();
        },
        handleShowDialogAddSpecial() {
            this.dialogShowAddSpecial = true;
        },
        handleAddSpecialColumn() {
            this.$refs.dialogAddSpecialForm.validate((valid) => {
                if(valid){
                    const formData = new FormData();
                    const loginData = this.dialogAddSpecialForm;
                    Object.keys(loginData).forEach((key) => {
                        formData.append(key, loginData[key]);
                    });
                    this.$axios.post('/article/api/add/special_column', 
                        formData
                    ).then(res=> {
                        this.$message.success(res.data.tips)
                        this.dialogShowAddSpecial = false;
                        this.dialogAddSpecialForm= {
                            columnName: '',
                            description: '',
                        }
                        this.handleGetSpecialColumnList();
                    })
                }else{
                    this.$message.warning('请认真填写')
                }
            })
        },
        handleDelSpecialColumn(id, columnName) {
            this.$confirm("是否删除专栏 -- "+columnName, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                cancelButtonClass: "el-button--danger",
                type: "warning",
                center: true
            }).then(() => {
                this.$axios.post('/article/api/del/special_column',
                    qs.stringify({columnId: id})
                ).then(res=>{
                    this.$message.success(res.data.tips);
                    this.handleGetSpecialColumnList();
                })
            }).catch(() => {

            })
        },
        handleUploadImage(file, fileList){
            console.log(file)
            this.showUploadBtn = true;
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
        },
        handlePictureCardPreview(file){
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogImage = true;
        },
        handleRemove(file, fileList){
           this.showUploadBtn = false;
        },
    }
}
</script>
<style lang='less' >
//@import url(); 引入公共css类

.special-column-cont .search-cont{
    overflow: hidden;
    div{
        float: right;
        padding-right: 50px;
    }
}

.disabled .el-upload--picture-card{
    display: none;
}
</style>