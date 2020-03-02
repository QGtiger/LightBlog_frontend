<!-- 主lauout -->
<template>
   <div class='wrap'>
       <div class="header">
           <NavMenu></NavMenu>
       </div>
       <div class="body-cont">
           <AppMain></AppMain>
       </div>
   </div>
</template>

<script>
import AppMain from './component/appMain.vue';
import NavMenu from './component/NavMenu';

export default {
    components: {
        AppMain,
        NavMenu,
    },
    data() {
    return {

    };
    },
    computed: {},
    watch: {},
    mounted() {
        document.querySelector('body').removeAttribute('id', 'background');
    },
    beforeDestroy() {
    },
    methods: {

    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
@font-face{
  font-family: MainFont;
  src: url('../assets/font/GoodVibrationsROB Script.ttf');
}


.body-cont{
  height: calc(100% - 61px);
}


.el-popconfirm__main{
  margin: 14px 0;
}

.el-textarea__inner{
  resize: none;
}

textarea{
  resize: none;
}

a{
color: #525f6d;
}
a:hover{
color:#18b0de
}

a:hover{
  transition: all .3s ease-out 0s;
}

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

 .add-column-cont .disabled .el-upload--picture-card{
    display: none;
}

.r-btn{
  background-color: #808080;
  border-color: #808080;
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