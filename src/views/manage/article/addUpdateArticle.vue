<!-- 发布更新文章 -->
<template>
   <div class='add-update-article'>
       <Title :title="title"></Title>
       <div class="article-form">
           <div class="form">
               <el-form :model="articleForm" ref="articleForm" label-position="left" label-width="100px" :rules="articlRules">
                   <el-form-item label="文章标题" prop="title">
                       <el-input v-model="articleForm.title" placeholder="请输入文章标题"></el-input>
                   </el-form-item>
                   <el-form-item label="文章简介" prop="description">
                       <el-input type="textarea" v-model="articleForm.description" placeholder="请输入文章简介"></el-input>
                   </el-form-item>
                    <el-form-item label="封面" prop="previewImg">
                        <el-upload
                            :class="{disabled: showUploadBtn}"
                            action
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            :on-change="handleUploadImage"
                            :file-list="articleForm.previewImg"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogImage" :append-to-body="true" width="35%">
                            <img width="100%" :src="dialogImageUrl" alt="logo" />
                        </el-dialog>                
                    </el-form-item>
                    <el-form-item label="所属专栏" prop="columnId">
                        <el-select v-model="articleForm.columnId" @change="handleChangeColumn">
                            <el-option
                                v-for="item in columnList"
                                :key="item.id"
                                :label="item.columnName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属专题" prop="themeId">
                        <el-select v-model="articleForm.themeId" placeholder="请先选择专栏">
                            <el-option
                                v-for="item in themeList[articleForm.columnId]"
                                :key="item.id"
                                :label="item.themeName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="个人专栏" prop="personalColumnId">
                        <el-select v-model='articleForm.personalColumnId'>
                            <el-option
                                v-for="item in personalColumnList"
                                :key="item.id"
                                :label="item.columnName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
               </el-form>
           </div>
           <div class="mavon-editor">
               <mavon-editor v-if="isUpdate" style="min-height:600px" v-model="articleForm.body" ref="editor" @imgAdd="handleAddImg" @imgDel="handleDelImage" @save="handleSave"></mavon-editor>
               <div class="meta-footer">
                   <el-button type="primary" @click="handlePublishArticle">确认</el-button>
                   <el-button @click="handleCancelPublishArticle">取消</el-button>
               </div>
           </div>
       </div>
           <el-dialog
                title="文章封面裁剪"
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
                    <div class="meta-footer">
                        <el-button type="primary" @click="handleCropperImage" class="btn">裁剪</el-button>
                    </div>
                </div>
            </el-dialog>
   </div>
</template>

<script>
  import { VueCropper } from 'vue-cropper'
  import Title from '@/components/title/title'
  import qs from 'qs';
export default {
    components: {
        VueCropper,
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
        var checkDescription = (rule, value, callback) => {
            if(!value){
                return callback(new Error('简介不能为空, 管理员会查看'));
            }
            setTimeout(()=>{
                if(value.length>180){
                    callback(new Error('用户名长度最多180个字符'));
                }
                else if(value.length < 2){
                    callback(new Error('用户名长度最少2个字符'));
                }
                else{
                    callback();
                }
            }, 1000);
        };
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

            articlRules: {
                title: [
                    { validator: checkTitleName, trigger: 'blur'}
                ],
                description: [
                    { validator: checkDescription, trigger: 'blur' }
                ],
                previewImg: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ],
                columnId: [
                    { required: true, message: '请选择专栏', trigger: 'blur'}
                ],
                themeId: [
                    { required: true, message: '请选择专题', trigger: 'blur' }
                ],
                personalColumnId: [
                    { required: true, message: '请选择所属个人专栏', trigger: 'blur' }
                ]
            },
            isUpdate: false, //是否更新
            updateId: '',
            isUpdateImg: 0,
            articleForm: {
                title: '',
                description: '',
                previewImg: [],
                columnId: '',
                themeId: '',
                personalColumnId: '',
                body: ''
            },
            showUploadBtn: false,
            dialogImage: false,
            dialogImageUrl: '',
            dialogEditImage: false,
            columnList: [], //专栏
            themeList: {}, //专题
            personalColumnList: [], //个人专栏
            fileUid: '', //上传图片的uid
        };
    },
    computed: {
        title() {
            return this.isUpdate ? '编辑文章' : '发布文章';
        }
    },
    watch: {},
    mounted() {
        this.handleGetColumnTheme();
        this.handleGetColumnList();
        this.updateId = this.$route.query.id === undefined ? '' : this.$route.query.id;
        this.isUpdate = this.$route.query.id === undefined ? false : true;
        this.$route.query.id === undefined ? '' : this.handleGetArticleDetail();
    },
    methods: {
        handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogImage = true;
        },
        handleRemove(){
            this.showUploadBtn = false;
            this.articleForm.previewImg = [];
        },
        handleBeforeUpload(file) {
            //上传图片格式限制
            const isLt2M = file.size / 1024 / 1024 < 2;
            const isImg = file.raw.type.indexOf("image/") != -1;
            if (!isImg) {
                this.$message.warning("请选择图片");
                return isLt2M && isImg;
            }

            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M && isImg;
        },
        handleUploadImage(file) { //change 
            if (!this.handleBeforeUpload(file)) {
                this.articleForm.previewImg = [];
                return;
            }
            this.showUploadBtn = true;
            this.dialogEditImage = true;
            this.cropper.img = file.url;
            this.fileUid = file.raw.uid;
        },
        handleCancelEdit() { //取消裁剪
            this.dialogEditImage = false;
            this.articleForm.previewImg = [];
            this.showUploadBtn = false;
        },
        realTime(data){ //实时裁剪
            this.previews = {
                ...data
            }
        },
        handleToBlob(ndata) { //转blob
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
        handleCropperImage() { //裁剪后的图片
            this.isUpdateImg = 1;
            this.$refs.cropper.getCropData((data) => {
                this.articleForm.previewImg.splice(0,1,{
                    uid: this.fileUid,
                    url: data
                })
                this.dialogEditImage =false;
            })      
        },
        handleGetColumnTheme(){
            this.$axios.post('/article/api/get/columnTheme').then(res=>{
                if(res){
                    this.columnList = res.data.data.columnList;
                    this.themeList = res.data.data.themeList;
                }
            })
        },
        handleGetColumnList() {
            this.$axios.post('/article/api/get/personal_column'
            ).then(res => {
                if(res){
                    this.personalColumnList = res.data.data;
                }
            })
        },
        handlePublishArticle(){ //发布文章
            // console.log(this.articleForm)
            this.$refs.articleForm.validate(valid => {
                if(valid){
                    if(this.isUpdate){
                        if(this.articleForm.body.replace(/(^\s*)|(\s*$)/g, "") === ''){
                            this.$message.warning('文章正文不能为空哦~~');
                            return;
                        }
                        const formData = new FormData();
                        let coverImageBlob = this.isUpdateImg === 1 ? this.handleToBlob(this.articleForm.previewImg[0].url) : '';
                        const postData = {
                            id: this.updateId,
                            title: this.articleForm.title.replace(/(^\s*)|(\s*$)/g, ""),
                            description: this.articleForm.description,
                            specialColumnId: this.articleForm.columnId,
                            specialThemeId: this.articleForm.themeId,
                            personalColumnId: this.articleForm.personalColumnId,
                            body: this.emoji(this.articleForm.body),
                            body_html: this.articleForm.body,
                            isUpdateImg: this.isUpdateImg,
                            previewImg: coverImageBlob
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/update/article',
                            formData
                        ).then(res => {
                            if(res){
                                this.$message.success('发布成功');
                                this.$router.back();
                            }
                        })
                    }else{
                        const formData = new FormData();
                        const postData = {
                            title: this.articleForm.title.replace(/(^\s*)|(\s*$)/g, ""),
                            description: this.articleForm.description,
                            specialColumnId: this.articleForm.columnId,
                            specialThemeId: this.articleForm.themeId,
                            personalColumnId: this.articleForm.personalColumnId,
                            isUpdateImg: this.isUpdateImg,
                            previewImg: this.handleToBlob(this.articleForm.previewImg[0].url)
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        console.log(postData)
                        this.$axios.post('/article/api/publish/article',
                            formData
                        ).then(res => {
                            if(res){
                                this.$message.success('发布成功');
                                this.isUpdate = true;
                                this.updateId = res.data.data.id;
                                this.isUpdateImg = 0;
                            }
                        })
                    }
                }else{
                    this.$message.warning('请认真填写')
                }
            })
        },
        handleCancelPublishArticle() { //取消
            this.$router.back();
        },
        handleGetArticleDetail() {
            this.$axios.post('/article/api/detail/article', 
                qs.stringify({
                    id: this.updateId
                })
            ).then(res => {
                this.articleForm = res.data.data;
                this.showUploadBtn = true;  
            })
        },
        handleAddImg(pos, $file){ //图片上传
            // if($file.size > 1024*1024*2){
            //     this.$message.warning('图片大小不能大于2MB');
            //     return;
            // }
            let formData = new FormData();
            let postData = {
                id: this.updateId,
                imageName: $file.name.split('.').join(`-${pos}.`),
                image: this.handleToBlob($file.miniurl)
            }
            console.log(postData)
            Object.keys(postData).forEach((key) => {
                formData.append(key, postData[key]);
            });
            this.$axios.post('/article/api/upload/image',
                formData
            ).then(res => {
                this.$refs.editor.$img2Url(pos, res.data.data.imageCompress)
            })
            // this.$refs.editor.$img2Url(pos, "http://qnpic.top/yoona2.jpg")
        },
        handleDelImage(pos, $file) { //图片删除
        },
        handleSave(){ //文章保存上传
            this.$refs.articleForm.validate(valid => {
                if(valid){
                    if(this.isUpdate){
                        if(this.$refs.editor.d_render === ''){
                            this.$message.warning('文章正文不能为空哦~~');
                            return;
                        }
                        const formData = new FormData();
                        let coverImageBlob = this.isUpdateImg === 1 ? this.handleToBlob(this.articleForm.previewImg[0].url) : '';
                        const postData = {
                            id: this.updateId,
                            title: this.articleForm.title.replace(/(^\s*)|(\s*$)/g, ""),
                            description: this.articleForm.description,
                            specialColumnId: this.articleForm.columnId,
                            specialThemeId: this.articleForm.themeId,
                            personalColumnId: this.articleForm.personalColumnId,
                            body: this.articleForm.body,
                            body_html: this.$refs.editor.d_render,
                            isUpdateImg: this.isUpdateImg,
                            previewImg: coverImageBlob
                        }
                        Object.keys(postData).forEach((key) => {
                            formData.append(key, postData[key]);
                        });
                        this.$axios.post('/article/api/update/article',
                            formData
                        ).then(res => {
                            if(res){
                                this.$message.success('保存成功');
                            }
                        })
                    }
                }else{
                    this.$message.warning('请认真填写')
                }
            })
        },
        handleChangeColumn(){ //切换专栏，专题为空
            this.articleForm.themeId = '';
        }
    },
    created() {

    },
}
</script>
<style lang="less">
.add-update-article{
    margin-bottom: 80px;
    .article-form{
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
    .disabled .el-upload--picture-card{
        display: none;
    }
    .main-cropper {
        height: 415px;
        width: 518px
    }
    .dialogCropper{
        .meta-footer{
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    }
    
    .dialogCropper .show-info{
        display: flex;
        justify-content: space-around;
        .preview-cont{
            width: 218px;
            .radius-preview{
                width:168px;
                height: 168px;
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid #ccc;
                background-color: #eeeeee;
                margin-top: 30px;
            }
            .box-preview{
                width:168px;
                height: 168px;
                overflow: hidden;
                border: 1px solid #ccc;
                background-color: #eeeeee;
            }
        }
    }
}
</style>