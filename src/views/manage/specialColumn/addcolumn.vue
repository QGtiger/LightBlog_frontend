<!-- 裁剪图片 -->
<template>
<div class="add-column-cont">
    <Title title="新增专栏"></Title>
    <div class="form-cont">
        <el-form :model="specialColumnForm" ref="specialColumnForm" label-width="100px" :rules="rules" label-position="left">
            <el-form-item prop="columnName" label="专栏名称">
                <el-input v-model="specialColumnForm.columnName" placeholder="请填写专栏名称"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="简介">
                <el-input type="textarea" v-model="specialColumnForm.description"></el-input>                    
            </el-form-item>
        </el-form>
    </div>
    <el-dialog
        title="专栏标题"
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
            <label class="btn" for="upload">上传</label>
            <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
                accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,2)">
            <button @click="finish2()" class="btn">裁剪</button>
        </div>
    </el-dialog>
<div class="content">

    <div class="show-info">
    <div class="test">
        <vueCropper ref="cropper" :img="cropper.img " :outputSize="cropper.size" :outputType="cropper.outputType"
        :info="cropper.info" :canScale="cropper.canScale" :autoCrop="cropper.autoCrop"
        :autoCropWidth="cropper.autoCropWidth" :autoCropHeight="cropper.autoCropHeight" :fixed="cropper.fixed"
        :fixedNumber="cropper.fixedNumber" :enlarge="4" @realTime="realTime"></vueCropper>
    </div>
    <label class="btn" for="upload">上传</label>
    <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event,2)">
    <button @click="test" class="btn">裁剪</button>
    </div>
</div>

<div class="preview-image">
    <!-- <img :src="previews.url" :style="previews.img"> -->
    <div v-html="previews.html"></div>
</div>
    </div>
</template>
 
<script>
  import { VueCropper } from 'vue-cropper'
  import Title from '@/components/title/title'
export default {
    components: {
        VueCropper,
        Title
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
                { required: true, message: '请输入专栏名称', trigger: 'blur' }
            ],
            description: [
                { required: true, message: '请输入专栏简介', trigger: 'blur' }
            ]
        },
        specialColumnForm: {
            columnName: '',
            description: '',

        },
        dialogEditImage: false,
        }
    },
    methods: {
        //点击裁剪，这一步是可以拿到处理后的地址
        finish2() {
        this.$refs.cropper.getCropData((data) => {
            this.modelSrc = data
            console.log(data)
            this.model = false;
            //裁剪后的图片显示
            this.cropper.img = this.modelSrc;
            // this.toBlob(data)
            // console.log(data)
            // console.log(this.toBlob(data))

        //   //阿里云处理图片，项目的接口，这里可以不用，上面的地址打印即为base64的地址
        //   this.$api.admin.url(data => {
        //     new OSS.Wrapper({
        //       region: "oss-cn-hangzhou",
        //       accessKeyId: data.accessKeyId,
        //       accessKeySecret: data.accessKeySecret,
        //       stsToken: data.securityToken,
        //       // bucket: 'mybg'c
        //       bucket: 'zhiyuan-hz'
        //     })
        //       .put(data.key, this.toBlob(this.cropper.img))
        //       .then(data => {
        //       console.log(data.url)
        //       })
        //       .catch(function (err) {
        //         console.error("error: %j", err);
        //       });
        //   });
        })

        },

        uploadImg(e, num) {
        //上传图片
        this.cropper.img = ''
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
            let data
            data = e.target.result
            if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
                data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
                data = e.target.result
            }
            this.cropper.img = data
            
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blobcs
        reader.readAsArrayBuffer(file)
        },
        // base64转blob
        toBlob(ndata) {
            //ndata为base64格式地址
            console.log(ndata)
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
        handleCancelEdit() { //放弃编辑图片
            this.dialogEditImage = false;
            this.cropper.img = null;
        },
        test(){
            this.dialogEditImage = true;
        }
    },

}
</script>
 
<style>
 
  .content {
    margin: auto;
    width: 500px;
    max-width: 585px;
    margin-bottom: 100px;
  }
 
  .test-button {
    display: flex;
    flex-wrap: wrap;
  }
 
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
 

 .add-column-cont .form-cont{
     width: 800px;
     margin: 0 auto;
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