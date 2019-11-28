<!-- 用户编辑 -->
<template>
   <div class='author-edit'>
       <div class="edit-cont">
           <div class="edit-header">

           </div>
           <div class="edit-main">
               <div class="form-cont">
                   <el-form :model="authorForm" ref="authorForm" label-width="140px" label-position="left">
                       <div class="avator-form-cont">
                           <div class="avator">
                               <img :src="this.$store.state.avatorUrl" alt="">
                           </div>
                           <div class="avator-right">
                               <label for="chooseImg" title="上传图片" class="choose-btn">
                                   <input type="file" accept="image/jpg,image/jpeg,image/png" name="file" id="chooseImg" ref="selectImg" class="hidden" @change="hanldeSelectImg">
                                   更换图片
                               </label>
                               <el-button @click="handleTest">ceshi</el-button>
                           </div>
                       </div>
                       <el-form-item label="昵称" style="padding-left:40px;margin-top:25px;">
                           <span>{{this.$store.state.username}}</span>
                       </el-form-item>
                   </el-form>
               </div>
           </div>
       </div>
       <el-dialog
            title="用户头像编辑"
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
                <div class="meta-footer" style="display:flex;justify-content:center;">
                    <button @click="handleCropperImage" class="btn">上传图片</button>
                    <button class="btn r-btn" @click="handleCancelEdit">取消</button>
                </div>
            </div>
        </el-dialog>
   </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import qs from 'qs';
export default {
    components: {VueCropper},
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


            authorForm: {},
            dialogEditImage: false,
        };
    },
    computed: {},
    watch: {},
    mounted() {
    },
    methods: {
        handleCancelEdit() {
            this.dialogEditImage = false;
            this.$refs.selectImg.value = null;
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
        realTime(data){
            this.previews = {
                ...data
            }
        },
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },
        hanldeSelectImg(){
            // if (!file.files || !file.files[0]){
            //     return;
            // }
            var file = this.$refs.selectImg.files[0]
            console.log(this.getObjectURL(file))
            this.cropper.img = this.getObjectURL(file);
            this.dialogEditImage = true;
        },
        handleCropperImage() {
            this.$refs.cropper.getCropData((data) => {
                //裁剪后的图片显示
                if (typeof data === 'object') {
                // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([data]))
                }
                const formData = new FormData();
                const postData = {
                    uploadimg: this.handleToBlob(data)
                }
                Object.keys(postData).forEach((key) => {
                    formData.append(key, postData[key]);
                });
                this.$axios.post('/account/api/upload/avator',
                    formData
                ).then(res => {
                    if(res){
                        this.$store.commit('setAvatorUrl',res.data.avator)
                        this.dialogEditImage =false;

                    }else{

                    }
                })
            })      
        },
        handleTest(){
            console.log(this.$store.state)
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类

.edit-cont{
    width: 800px;
    margin: 50px auto 20px;
    .edit-main{
        .form-cont{
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
            .hidden{
                display: none
            }
            .choose-btn{
                display: inline-block;
                outline: none;
                resize: none;
                border: none;
                padding: 5px 10px;
                background: #8C85E6;
                color: #fff;
                border: solid 1px #8C85E6;
                border-radius: 3px;
                font-size: 16px;
                cursor: pointer;
                margin: 50px;
            }
            .avator-form-cont{
                height: 150px;
                display: flex;
                justify-content: flex-start;
                .avator{
                    width: 150px;
                    height: 150px;
                    box-shadow: 0px 0px 10px #666;
                    border-radius: 100%;
                    img{
                        width: 100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                .avator-right{
                    button{
                        margin: 50px;
                    }
                }
            }
        }
    }
}

</style>