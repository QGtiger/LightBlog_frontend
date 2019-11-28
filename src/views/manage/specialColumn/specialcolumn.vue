<!-- 专栏模块 -->
<template>
   <div class='special-column-cont'>
       <Title title="专栏管理"></Title>
       <div class="search-cont">
           <div class="status-cont">
               <span :class="{'active': status === ''}" class="status-change" @click="handleChangeStatus('')">全部状态</span>
               <span class="space">/</span>
               <span :class="{'active': status === 1}" class="status-change" @click="handleChangeStatus(1)">已发布</span>
               <span class="space">/</span>
               <span :class="{'active': status === 0}" class="status-change" @click="handleChangeStatus(0)">未发布</span>
           </div>
           <div>
               <el-button type="warning" @click="handleJumpAddSpecialColumn">增加专栏</el-button>
           </div>
       </div>
       <div class="table">
           <el-table :data="specialColumnList">
                <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                width="100">
                </el-table-column>
                <el-table-column prop="specialColumn" label="专栏名称">

                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ $util.Time.getAllTime(scope.row.created) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="专栏简介" ></el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">
                        <div>
                            {{ scope.row.status === 1 ? '已发布' : '未发布' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="是否推荐">
                    <template v-slot="scope">
                        <div>
                            <span>{{ scope.row.isRecommend ? "推荐" : "未推荐" }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <div>
                            <span class="update" @click="handleJumpUpdateSpecialColumn(scope.row.id)">编辑</span>
                            <span class="up" v-if="scope.row.status === 0" @click="handleUpColumn(scope.row.id,scope.row.specialColumn )">发布</span>
                            <span class="down" v-else @click="handleDownColumn(scope.row.id, scope.row.specialColumn)">下架</span>
                            <span class="recommend" @click="handleRecommendColumn(scope.row)">{{ scope.row.isRecommend ? "不推荐" : "推荐" }}</span>
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
            ></el-pagination>             
       </div>
        <!-- <el-dialog
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
        </el-dialog> -->
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
            status: '', //专栏状态
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
            this.$axios.post('/article/api/get/special_column',
                qs.stringify({
                    status: this.status
                })
            ).then(res=>{
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
            this.$confirm("是否删除专栏 -- 《"+columnName+"》", "提示", {
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
        handleUpColumn(id, columnName) { //发布专栏
            this.$confirm("是否发布专栏 -- 《"+columnName+"》", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.post('/article/api/publish/special_column',
                    qs.stringify({
                        columnId: id
                    })
                ).then(res=>{
                    if(res){
                        this.$message.success('发布成功');
                        this.handleGetSpecialColumnList();
                    }
                })
            }).catch(() => {

            })
        },
        handleDownColumn(id, columnName) { //下架专栏
            this.$confirm("是否下架专栏 -- 《"+columnName+"》", '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.post('/article/api/down/special_column',
                    qs.stringify({
                        columnId: id
                    })
                ).then(res=>{
                    if(res){
                        this.$message.success('下架成功');
                        this.handleGetSpecialColumnList();
                    }
                })
            }).catch(() => {

            })
        },
        handleRecommendColumn(row){ //推荐专栏
            if(row.status === 0){
                this.$message.warning('请先发布，再进行推荐该专栏')
            }else{
                let type = row.isRecommend ? "notRecommend" : "recommend";
                let text = row.isRecommend ? "下架推荐" : "推荐";
                this.$confirm("确定 "+ text + " 该专栏?", "注意", {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$axios.post('/article/api/recommend/special_column',
                        qs.stringify({
                            type: type,
                            columnId: row.id
                        })
                    ).then(res=>{
                        if(res){
                            let data = res.data;
                            if(data.code == 200){
                                this.$message.success(data.tips);
                                this.handleGetSpecialColumnList();
                            }else{
                                this.$message.warning(data.tips);
                            }
                        }
                    })

                }).catch(() => {

                })
            }
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

        handleJumpAddSpecialColumn(){
            this.$router.push('/specialcolumn/add');
        },
        handleJumpUpdateSpecialColumn(id){
            this.$router.push({
                path: '/specialcolumn/update',
                query: {
                    id
                }
            })
        },
        handleChangeStatus(status){
            this.status = status;
            this.handleGetSpecialColumnList()
        }
    }
}
</script>
<style lang='less' >
//@import url(); 引入公共css类

.special-column-cont .search-cont{
    overflow: hidden;
    .status-cont{
        padding: 10px 0 20px;
        .space{
            margin: 0 20px;
        }
        .status-change{
            cursor: pointer;
        }
        .active{
            color: #0066cc;
            font-weight: 700;
        }
    }
}

.disabled .el-upload--picture-card{
    display: none;
}

.recommend{
    cursor: pointer;
    padding: 0 6px;
}
</style>