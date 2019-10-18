<!-- 新增或者编辑专栏 -->
<template>
   <div class='add-update-column'>
       <Title :title="title" :back="true"></Title>
       <div class="form-cont">
           <el-form :model="columnForm" ref="columnForm" :rules="rules" label-width="120px" label-position="left">
               <el-form-item label="个人专栏名称:" prop="columnName">
                   <el-input v-model="columnForm.columnName" placeholder="请输入个人专栏标题"></el-input>
               </el-form-item>
               <el-form-item label="专栏简介:" prop="description">
                   <el-input type="textarea" v-model="columnForm.description" placeholder="请填写简介"></el-input>
               </el-form-item>
               <el-form-item label="封面:" prop="previewImg">
                    <el-upload
                        :class="{disabled: showUploadBtn}"
                        action
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        :on-change="handleUploadImage"
                        :file-list="columnForm.previewImg"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogImage" :append-to-body="true">
                        <img width="100%" :src="dialogImageUrl" alt="logo" />
                    </el-dialog>                     
               </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="handleAddColumn">确认</el-button>
                   <el-button @click="handleCancelAddColumn">取消</el-button>
               </el-form-item>
           </el-form>
       </div>
    <el-dialog
        title="专题标题"
        :visible.sync="dialogEditImage"
        :before-close="handleCancelEdit"
        width="868px"
        center
    >
        <div class="dialogCropper">

            <div class="show-info">
                <div class="main-cropper">
                    <vueCropper ref="cropper" :img="cropper.img " :outputSize="cropper.size" :outputType="cropper.outputType"
                    :info="cropper.info" :canScale="cropper.canScale" :autoCrop="cropper.autoCrop"
                    :autoCropWidth="cropper.autoCropWidth" :autoCropHeight="cropper.autoCropHeight" :fixed="cropper.fixed"
                    :fixedNumber="cropper.fixedNumber" :enlarge="4" @realTime="realTime"></vueCropper>
                </div>
                <div class="preview-cont">
                    <p style="margin-bottom: 10px;">图片预览</p>
                    <div class="box-preview" v-html="previews.html">

                    </div>

                    <div class="radius-preview" v-html="previews.html"></div>
                </div>
            </div>
            <!-- <label class="btn" for="upload">上传</label>
            <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
                accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,2)"> -->
            <button @click="handleCropperImage" class="btn">裁剪</button>
        </div>
    </el-dialog>
   </div>
</template>

<script>
import Title from '@/components/title/title';
import { VueCropper } from 'vue-cropper'
import qs from 'qs';
export default {
    components: {
        Title,
        VueCropper
    },
    data() {
        return {
            crap: false,
            previews: {
                div: {
                    html: ''
                }
            },
            cropper: {
                //img的路径自行修改
                img: '',
                info: true,
                size: 1,
                outputType: 'jpeg',
                canScale: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 168,
                autoCropHeight: 168,
                fixed: true,
                // 真实的输出宽高
                infoTrue: true,
                fixedNumber: [4, 4]
            },
            downImg: '#',

            rules: {
                columnName: [
                    { required: true, message: '请填写个人专栏标题', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请填写简介', trigger:'blur'}
                ],
                previewImg: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ]
            },
            isUpdate: false,
            updateId: '',
            columnForm: {
                columnName: '',
                description: '',
                previewImg: []
            },
            showUploadBtn: false,
            dialogImage: false,
            dialogImageUrl: '',
            dialogEditImage: false, //裁剪dialog
            isUpdateImage: 0, //是否更新图片
        };
    },
    computed: {
        title() {
            return this.isUpdate ? '编辑个人专栏' : '新增个人专栏';
        }
    },
    watch: {},
    mounted() {
        this.updateId = this.$route.query.id === undefined ? '' : this.$route.query.id;
        this.isUpdate = this.$route.query.id === undefined ? false : true;
        this.$route.query.id === undefined ? '' : this.handleGetColumnData();
    },
    methods: {
        handlePictureCardPreview(file) { //显示图片 放大
            this.dialogImageUrl = file.url;
            this.dialogImage = true;
        },
        handleRemove(file, fileList) { //删除图片
           this.showUploadBtn = false;
           this.columnForm.previewImg = [];
        },
        handleUploadImage(file) { //裁剪图片
            console.log(file)
            this.showUploadBtn = true;
            this.dialogEditImage = true;
            this.cropper.img = file.url;
        },
        handleCancelEdit() { //取消裁剪
            this.dialogEditImage = false;
        }, 
        handleToBlob(ndata) {       // base64转blob
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
        realTime(data){
            this.previews = {
                ...data
            }
        },
        handleCropperImage(){
            this.isUpdateImage = 1;
            this.$refs.cropper.getCropData((data) => {
                //裁剪后的图片显示
                if (typeof data === 'object') {
                // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([data]))
                }
                this.columnForm.previewImg.splice(0,1,{
                    url: data
                })
                this.dialogEditImage =false;
            })    
        },
        handleCancelAddColumn() { //取消新增
            this.$router.back();
        },
        handleAddColumn() { //新增专栏
            this.$refs.columnForm.validate(valid => {
                if(valid){
                    if(this.isUpdate){
                        let coverImageBlob = this.isUpdateImage === 1 ? this.handleToBlob(this.columnForm.previewImg[0].url) : '';
                        const formData = new FormData();
                        const postData = {
                                columnId: this.updateId,
                                description: this.columnForm.description,
                                columnName: this.columnForm.columnName,
                                isUpdateImage: this.isUpdateImage,
                                cover_image: coverImageBlob
                            }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/update/personal_column',
                            formData
                        ).then(res=>{
                            if(res){
                                this.$message.success(res.data.tips)
                                this.$router.back();
                            }
                        })
                    }else{
                        const formData = new FormData();
                        const postData = {
                            columnName: this.columnForm.columnName,
                            description: this.columnForm.description,
                            cover_image: this.handleToBlob(this.columnForm.previewImg[0].url)
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/add/personal_column',
                            formData
                        ).then(res => {
                            if(res){
                                this.$message.success('添加成功');
                                this.$router.back();
                            }
                        })
                    }
                }else{
                    this.$message.success('请认真填写信息');
                }
            })
        },
        handleGetColumnData() {
            this.$axios.post('article/api/detail/personal_column', 
                qs.stringify({
                    columnId: this.updateId
                })
            ).then(res => {
                if(res){
                    this.columnForm = {
                        columnName: res.data.data.columnName,
                        description: res.data.data.description,
                        previewImg: [{
                            url: res.data.data.previewImg
                        }]
                    }
                    this.showUploadBtn = true;  
                    }
            })
        }
    },
    created() {

    },
}
</script>
<style lang="less">

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }

  .main-cropper {
    height: 415px;
    width: 518px
  }

  .dialogCropper .preview-cont{
      width: 218px;
  }
 
 .dialogCropper .show-info{
     display: flex;
     justify-content: space-around;
 }

 .dialogCropper .show-info .radius-preview{
     width:168px;
     height: 168px;
     overflow: hidden;
     border-radius: 50%;
     border: 1px solid #ccc;
     background-color: #eeeeee;
     margin-top: 30px;
 }

  .dialogCropper .show-info .box-preview{
     width:168px;
     height: 168px;
     overflow: hidden;
     border: 1px solid #ccc;
     background-color: #eeeeee;
 }

 .add-update-column{
    .disabled .el-upload--picture-card{
        display: none;
    }
    .form-cont{
        width: 880px;
        margin: 30px auto;
    }
}


 @keyframes slide {
    0% {
      background-position: 0 0;
    }
 
    100% {
      background-position: -100% 0;
    }
  }
 
  @media screen and (max-width: 1000px) {
    .content {
      max-width: 90%;
      margin: auto;
    }
 
    .main-cropper {
      height: 400px;
    }
  }

</style>