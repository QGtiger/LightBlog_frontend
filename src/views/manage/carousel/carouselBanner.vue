<!-- 走马灯后台管理 -->
<template>
   <div class='manage-carousel-cont'>
       <Title title="Banner 管理"></Title>
       <div class="main-header">
           <div class="add-banner">
               <el-button type="primary" @click="handleShowAddBanner">添加 Banner</el-button>
           </div>
       </div>
       <div class="main-cont">
           <div class="table">
               <el-table :data="bannerList">
                   <el-table-column label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
                   <el-table-column label="Banner 名称" prop="title"></el-table-column>
                   <el-table-column label="Banner 描述" prop="desc"></el-table-column>
                   <el-table-column label="Banner 指向URL" prop="url"></el-table-column>
                   <el-table-column label="操作">
                       <template v-slot="scope">
                           <div>
                               <span class="update" @click="handleUpdateBanner(scope.row.id)">编辑</span>
                               <span class="del" @click="handleDelBanner(scope.row.id)">删除</span>
                           </div>
                       </template>
                   </el-table-column>
               </el-table>
           </div>
       </div>
       <el-dialog
        :title="title"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogShowAddBanner"
        :before-close="handleCancelAddBanner"
        :center="true"
        width="600px"
       >
        <div class="banner-form">
            <el-form :model="bannerForm" ref="bannerForm" :rules="bannerFormRules" label-position="left" label-width="120px">
                <el-form-item label="Banner 名称" prop="bannerName" class="is-required">
                    <el-input v-model="bannerForm.bannerName" placeholder="请输入 Banner 名称"></el-input>
                </el-form-item>
                <el-form-item label="Banner 介绍" prop="bannerDesc" class="is-required">
                    <el-input type="textarea" rows="4" v-model="bannerForm.bannerDesc" placeholder="请输入 Banner 介绍"></el-input>
                </el-form-item>
                <el-form-item label="Banner URL" prop="bannerUrl" class="is-required">
                    <el-input v-model="bannerForm.bannerUrl" placeholder="请输入 Banner 跳转Url"></el-input>
                </el-form-item>
                <el-form-item label="Banner 图片" prop="bannerPreview" class="is-required">
                    <el-upload
                        :class="{disabled: showUploadBtn}"
                        action
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        :on-change="handleUploadImage"
                        :file-list="bannerForm.bannerPreview"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddBanner" :loading="loadButton">确认</el-button>
                    <el-button type="primary" plain @click="handleCancelAddBanner">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
       </el-dialog>
       <el-dialog
        :visible.sync="dialogimg"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        >
        <img width="100%" :src="dialogImageUrl" alt="logo" />
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
            dialogShowAddBanner: false,
            isUpdate: false,
            bannerForm: {
                bannerName: '',
                bannerDesc: '',
                bannerUrl: '',
                bannerPreview: [],
            },
            bannerFormRules: {
                bannerName: [
                    {required: true, validator: checkNotNull('banner 名称'), trigger: 'blur'}
                ],
                bannerDesc: [
                    {required: true, validator: checkNotNull('banner 介绍'), trigger: 'blur'}
                ],
                bannerUrl: [
                    {required: true, validator: checkNotNull('banner 跳转Url'), trigger: 'blur'},
                    {type: 'url', message: 'Url 格式不正确', trigger: 'blur'}
                ],
                bannerPreview: [
                    {required: true, message: "请上传图片", trigger: 'blur'}
                ]
            },
            showUploadBtn: false,
            dialogImageUrl: '',
            dialogimg: false,

            loadButton: false,
            bannerList: [],

            updateId: '',
            isUpdateImg: false, //是否更新了图片
        };
    },
    computed: {
        title() {
            return this.isUpdate ? "编辑 Banner" : "新增 Banner";
        }
    },
    watch: {},
    mounted() {
        this.handleBannerList();
    },
    methods: {
        handleBannerList(){ //获取banner list
            this.$axios.post('/article/api/get/banner').then(res=>{
                if(res){
                    this.bannerList = res.data.list;
                }
            })
        },
        handleShowAddBanner() { //
            this.dialogShowAddBanner = true;
        },
        handleCancelAddBanner() {
            this.dialogShowAddBanner = false;
            this.showUploadBtn = false;
            this.$refs.bannerForm.resetFields();
            this.bannerForm = {
                bannerName: '',
                bannerDesc: '',
                bannerUrl: '',
                bannerPreview: [],
            };
        },
        // base64转blob
        handleToBlob(ndata) {
            //ndata为base64格式地址
            let arr = ndata.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {
                type: mime
            })
        },
        handleAddBanner(){ //确认添加Banner
            this.loadButton = true;
            this.$refs.bannerForm.validate(valid=>{
                if(valid){
                    if(this.isUpdate){
                        const formData = new FormData();
                        const postData = {
                            title: this.bannerForm.bannerName,
                            desc: this.bannerForm.bannerDesc,
                            url: this.bannerForm.bannerUrl,
                            image: this.isUpdateImg ? this.handleToBlob(this.bannerForm.bannerPreview[0].url) : '',
                            isUpdateImg: this.isUpdateImg,
                            id: this.updateId
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/update/banner',
                            formData
                        ).then(res=>{
                            if(res){
                                this.$message.success('更新成功');
                                this.isUpdate = false;
                                this.isUpdateImg = false;
                                this.handleCancelAddBanner();
                                this.handleBannerList();
                            }
                            this.loadButton = false;
                        })
                    }else{
                        const formData = new FormData();
                        const postData = {
                            title: this.bannerForm.bannerName,
                            desc: this.bannerForm.bannerDesc,
                            url: this.bannerForm.bannerUrl,
                            image: this.handleToBlob(this.bannerForm.bannerPreview[0].url)
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/add/banner', 
                            formData
                        ).then(res=> {
                            if(res){
                                this.$message.success('添加成功')
                                this.handleCancelAddBanner();
                                this.handleBannerList();
                            }
                            this.loadButton = false;
                        }) 
                    }
                }else{
                    this.loadButton = false;
                }
            })
        },
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url; 
            this.dialogimg = true;
        },
        handleRemove() {
            this.bannerForm.bannerPreview = [];
            this.showUploadBtn = false;
            this.$refs.bannerForm.validateField("bannerPreview");
        },
        handleBeforeUpload(file) {
            //上传图片格式限制
            const isLt5M = file.size / 1024 / 1024 < 5;
            const isImg = file.raw.type.indexOf("image/") != -1;
            if (!isImg) {
                this.$message.warning("请选择图片");
                return isLt5M && isImg;
            }

            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isLt5M && isImg;
        },
        handleUploadImage(file) { //change 
            if (!this.handleBeforeUpload(file)) {
                this.bannerForm.bannerPreview = [];
                return;
            }
            if(this.isUpdate){
                this.isUpdateImg = true;
            }
            this.showUploadBtn = true;
            let reader = new FileReader(); //html5读文件
            let bs64Url;
            reader.readAsDataURL(file.raw); //转BASE64
            reader.onload = e => {
                bs64Url = e.target.result;
                this.bannerForm.bannerPreview = [{
                    url: bs64Url,
                    uid: file.raw.uid,
                }]
            }
            this.$refs['bannerForm'].clearValidate('bannerPreview');
        },
        indexMethod(index) {
            return index + 1;
        },
        handleUpdateBanner(id) { //更新Banner
            this.$axios.post('/article/api/detail/banner',
                qs.stringify({
                    id
                })
            ).then(res=>{
                if(res){
                    this.updateId = id;
                    this.isUpdate = true;
                    let resData = res.data.data;
                    this.bannerForm.bannerName = resData.title;
                    this.bannerForm.bannerDesc = resData.desc;
                    this.bannerForm.bannerUrl = resData.url;
                    this.bannerForm.bannerPreview.splice(0,1,{
                        url: resData.image
                    })
                    this.dialogShowAddBanner = true;
                    this.showUploadBtn = true;
                }
            })
            
        },
        handleDelBanner(id) { //删除Banner
            this.$confirm('确认删除此 Banner ?', '注意', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                cancelButtonClass: 'el-button-danger',
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.post('/article/api/del/banner',
                    qs.stringify({
                        id
                    })
                ).then(res => {
                    if(res){
                        this.$message.success('删除成功');
                        this.handleBannerList();
                    }
                })
            }).catch(() => {

            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
.manage-carousel-cont{
    .main-header{
        overflow: hidden;
        padding: 0 30px;
        .add-banner{
            float: right;
        }
    }
    
}
.disabled .el-upload--picture-card{
    display: none;
}
</style>