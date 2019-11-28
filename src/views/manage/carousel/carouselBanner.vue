<!-- 走马灯后台管理 -->
<template>
   <div class='manage-carousel-cont'>
       <Title title="Banner 管理"></Title>
       <div class="main-header">
           <div class="add-banner">
               <el-button type="primary" @click="handleShowAddBanner">添加 Banner</el-button>
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
                    <el-button type="primary" @click="handleAddBanner">确认</el-button>
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
        };
    },
    computed: {
        title() {
            return this.isUpdate ? "编辑 Banner" : "新增 Banner";
        }
    },
    watch: {},
    mounted() {

    },
    methods: {
        handleShowAddBanner() { //
            this.dialogShowAddBanner = true;
        },
        handleCancelAddBanner() {
            this.dialogShowAddBanner = false;
            this.showUploadBtn = false;
            this.$refs.bannerForm.resetFields();
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
            console.log(this.bannerForm)
            this.$refs.bannerForm.validate(valid=>{
                if(valid){
                    if(this.isUpdate){

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
                            // this.$message.success(res.data.tips)
                            // this.specialColumnForm= {
                            //     columnName: '',
                            //     description: '',
                            //     coverUrl: []
                            // }
                            // this.$router.back();
                            console.log(res)
                        }) 
                    }
                }else{

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