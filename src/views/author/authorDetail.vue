<!-- 用户个人界面 -->
<template>
   <div class='author-detail' >
       <div class="author-cont">
           <div class="author-header" :style="'background-image:url('+userinfo.authorBg+')'">
               <div class="author-avator">
                   <img :src="userinfo.avatorUrl" :title="userinfo.username" alt="">
               </div>
               <h2 class="author-name">{{ userinfo.username }}</h2>
               <div class="change-bg" v-if="userinfo.username === this.$store.state.username">
                   <label for="chooseImg" title="上传图片" class="choose-btn">
                        <input type="file" accept="image/jpg,image/jpeg,image/png" name="file" id="chooseImg" ref="selectImg" class="hidden" @change="hanldeSelectImg">
                        <i class="el-icon-video-camera"></i>&nbsp;编辑背景图片
                    </label>
               </div>
               <!-- <div class="author-info">
                   <div class="author-title">
                       <div class="author-title-text">
                           <p>{{userinfo.username}}</p>
                       </div>
                   </div>
                   <div class="author-description">
                       <div class="description-header">
                           <p><span class="l-text">已经发布了 {{ userinfo.publishBlogs }} 篇文章</span></p>
                       </div>
                       <div class="description-cont">
                           
                       </div>
                   </div>
               </div> -->
           </div>
           <div class="author-blogs">
                <el-tabs v-model="activeName" style="text-align:center" @tab-click="handleTabClick">
                    <el-tab-pane label="推荐文章" name="recommend">
                        <div class="recommend-list">
                            <div class="recommend-item item" v-for="(item,index) in recommendList" :key="index">
                                <BlogCard :blog="item"></BlogCard>
                            </div>
                            <p class="waiting"><span v-if="recommendWaiting">努力加载中...</span><span v-else>没有更多了...</span></p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="发布文章" name="publish">
                        <div class="publish-list">
                            <div class="publish-item item" v-for="(item,index) in publishList" :key="index">
                                <BlogCard :blog="item"></BlogCard>
                            </div>
                            <p class="waiting"><span v-if="publishWaiting">努力加载中...</span><span v-else>没有更多了...</span></p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="点赞文章" name="like">
                        <div class="like-list">
                            <div class="like-item item" v-for="(item,index) in likeList" :key="index">
                                <BlogCard :blog="item"></BlogCard>
                            </div>
                            <p class="waiting"><span v-if="likeWaiting">努力加载中...</span><span v-else>没有更多了...</span></p>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
import qs from 'qs';
import RecommendList from './recommendList';
import BlogCard from '@/components/blog/CardBlog';
import { VueCropper } from 'vue-cropper';
export default {
    components: {
        RecommendList,
        BlogCard,
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
                // autoCropWidth: 168,
                // autoCropHeight: 168,
                fixed: true,
                // 真实的输出宽高
                infoTrue: true,
                fixedNumber: [8, 3]
            },
            downImg: '#',
            dialogEditImage: false,

            activeName: "recommend",
            username: "",
            userinfo: {},
            recommendList: [],
            publishList: [],
            likeList: [],
            recommendWaiting: true,
            publishWaiting: true,
            likeWaiting: true,
            timeout: null,
            recommendPage: 1,
            recommendTotal: '',
            publishPage: 1,
            publishTotal: '',
            likePage: 1,
            likeTotal: '',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.username = this.$route.query.user == undefined ? this.$store.state.username : this.$route.query.user;
        this.hanldeGetAuthor();
        this.handleGetAuthorBlogs('recommend');
        this.handleGetAuthorBlogs('publish');
        this.handleGetAuthorBlogs('like');
        window.addEventListener('scroll', this.handleScroll)
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
            this.$refs.selectImg.value = null;
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
                this.$axios.post('/account/api/upload/author_bg',
                    formData
                ).then(res => {
                    if(res){
                        this.dialogEditImage =false;
                        this.userinfo.authorBg = res.data.author_bg

                    }else{

                    }
                })
            })      
        },
        hanldeGetAuthor(){
            this.$axios.post('/account/api/detail/author',
                qs.stringify({
                    username: this.username
                })
            ).then(res=>{
                this.userinfo = res.data.userDetail;
            })
        },
        handleGetAuthorBlogs(type){
            this.$axios.post('/account/api/get/blogs', 
                qs.stringify({
                    username: this.username,
                    blogtype: type,
                    page: this[type+'Page'],
                    size: 7
                })
            ).then(res => {
                this[type+'Total'] = res.data.totalpage;
                if(this[type+'Total'] < 2){
                    this[type+'Waiting'] = false;
                }
                this[type+'List'].push(...res.data.blogList);
            })
        },
        handleScroll() {
            if(this.timeout != null){
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(()=>{
                let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.offsetHeight;
                if(bottomOfWindow < 20){
                    if(this[this.activeName+'Page'] < this[this.activeName+'Total']){
                        this[this.activeName+'Waiting'] = true;
                        this[this.activeName+'Page'] += 1;
                        this.handleGetAuthorBlogs(this.activeName);
                    }else{
                        this[this.activeName+'Waiting'] = false;
                        console.log(this.activeName + 'break...')
                    }
                }
            }, 500)
        },
        handleTabClick() {
            console.log(233)
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.handleScroll);
        next();
    }
}
</script>
<style lang='less'>
//@import url(); 引入公共css类

.el-tabs__nav{
    float: none;
}
.el-tabs__active-bar{
    left: 276px;
}
.author-detail{
    .author-cont{
        width: 800px;
        padding-top: 50px;
        margin: 0px auto 30px;
        .author-header{
            height: 300px;
            background-size: 100% 100%;
            position: relative;
            border-radius: 8px;
            .author-name{
                color: white;
                position: absolute;
                top: 170px;
                width: 100%;
                text-align: center;
                font-family: MainFont;
            }
            .change-bg{
                display: inline-block;
                border: 1px solid;
                border-radius: 5px;
                padding: 5px 10px;
                color: hsla(0,0%,100%,.7);
                border-color: hsla(0,0%,100%,.24);
                position: absolute;
                top: 8px;
                right: 10px;
                cursor: pointer;
                font-size: 15px;
                label{
                    cursor: pointer;
                }
                .hidden{
                    display: none;
                }
            }
            .author-info{
                margin-left: 30px;
                padding-top: 10px;
                .author-title{
                    .author-title-text{
                        font-size: 24px;
                        font-weight: 700;
                    }
                }
                .author-description{
                    .description-header{
                        .l-text{
                            font-size: 12px;
                            color: #969696;
                        }
                    }
                }
            }
            .author-avator{
                width: 120px;
                height: 120px;
                border-radius: 50%;
                box-shadow: 0px 0px 6px #666;
                position: absolute;
                left: 340px;
                top: 30px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
        }
        .author-blogs{
            margin-top: 30px;
            .waiting{
                padding: 20px;
                text-align: center;
            }
        }
    }
}
</style>