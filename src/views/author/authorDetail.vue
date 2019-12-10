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
           <div class="main-container">
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
                        <el-tab-pane label="ta关注的人" name="follow">
                            <div class="follow-list">
                                <div class="follow-item item" v-for="(item, index) in followList" :key="item.id">
                                    <div class="item-avator" @click="handleJumpAuthorDetail(item.username)">
                                        <img :src="item.url" :title="item.username" alt="">
                                    </div>
                                    <div class="item-info">
                                        <div class="author-username">
                                            <p class="text"><router-link :to="'/author/detail?user='+item.username">{{ item.username }}</router-link></p>
                                        </div>
                                        <div class="author-desc">
                                            <p class="text">{{ item.aboutme }}</p>
                                        </div>
                                    </div>
                                    <div class="item-operate">
                                        <span v-if="!item.is_follow" class="follow-btn" @click="handleFollowAuthor(item, index, 'follow')">关注</span>
                                        <span v-else class="unfollow-btn" @mouseover="handleToggleText(item, index, 'follow')" @mouseout="handleToggleText(item, index, 'follow')" @click="handleFollowAuthor(item, index, 'follow')">{{ item.is_hover ? '取消关注' : '已关注' }}</span>
                                    </div>
                                </div>
                                <el-pagination
                                    :current-page.sync="followPage"
                                    @current-change="handleFollowList('follow')"
                                    :page-size="10"
                                    :total="followTotal"
                                    :hide-on-single-page="true"
                                    layout="total, prev, pager, next"
                                ></el-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="关注ta的人" name="followed">
                            <div class="followed-list">
                                <div class="followed-item item" v-for="(item, index) in followedList" :key="item.id">
                                    <div class="item-avator" @click="handleJumpAuthorDetail(item.username)">
                                        <img :src="item.url" :title="item.username" alt="">
                                    </div>
                                    <div class="item-info">
                                        <div class="author-username">
                                            <p class="text"> <router-link :to="'/author/detail?user='+item.username">{{ item.username }}</router-link></p>
                                        </div>
                                        <div class="author-desc">
                                            <p class="text">{{ item.aboutme }}</p>
                                        </div>
                                    </div>
                                    <div class="item-operate">
                                        <span v-if="!item.is_follow" class="follow-btn" @click="handleFollowAuthor(item, index, 'followed')">关注</span>
                                        <span v-else class="unfollow-btn" @mouseover="handleToggleText(item, index, 'followed')" @mouseout="handleToggleText(item, index, 'followed')" @click="handleFollowAuthor(item, index, 'followed')">{{ item.is_hover ? '取消关注' : '已关注' }}</span>
                                    </div>
                                </div>
                                <el-pagination
                                    :current-page.sync="followedPage"
                                    @current-change="handleFollowList('followed')"
                                    :page-size="10"
                                    :total="followedTotal"
                                    :hide-on-single-page="true"
                                    layout="total, prev, pager, next"
                                ></el-pagination>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="main-container-right">
                    <div class="achievement-cont">
                        <div class="achievement-title">
                            <p>个人成就</p>
                        </div>
                        <div class="achievement-contain">
                            <div class="author-level">
                                <img src="../../assets/images/creator_entrance.png" alt="">
                                <div class="level-text">
                                    <p class="level">创作 等级 <span class="num">LV 1</span></p>
                                    <p class="level-tips">创作小白</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                fixedNumber: [10, 3]
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

            publishTab: false, // 发布文章第一次加载
            likeTab: false, //  点赞文章第一次加载
            followTab: false, //ta 关注的人
            followedTab: false, // 关注 ta 的人
            followList: [], 
            followedList: [],
            followPage: 1,
            followedPage: 1,
            followTotal: 0,
            followedTotal: 0,

            unfollowedText: '已关注', // 可以取消关注的文字显示
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.username = this.$route.query.user == undefined ? this.$store.state.username : this.$route.query.user;
        this.hanldeGetAuthor();
        this.handleGetAuthorBlogs('recommend');
        // this.handleGetAuthorBlogs('publish');
        // this.handleGetAuthorBlogs('like');
        window.addEventListener('scroll', this.handleScroll);
        // $('body').on('mouseover', '.unfollow-btn', function(){
        //     $(this).text('取消关注');
        // })
        // $('body').on('mouseout', '.unfollow-btn', function(){
        //     $(this).text('已关注');
        // })
        // $('body').on('mouseover', '.follow-btn', function(){
        //     $(this).text('确认关注');
        // })
        // $('body').on('mouseout', '.follow-btn', function(){
        //     $(this).text('关注');
        // })
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
            if(this.activeName == 'follow' || this.activeName == 'followed'){
                return;
            }
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
        handleFollowList(type){
            this.$axios.post('/account/api/list/follow',
                qs.stringify({
                    type: type,
                    username: this.userinfo.username,
                    page: this[type+'Page'],
                    size: 10
                })
            ).then(res=>{
                if(res){
                    this[type+'List'] = res.data.data;
                    this[type+'Total'] = res.data.total;
                }
            })
        },
        handleTabClick(tab, event) {
            if(this[tab.paneName+'Tab'] == false){
                if(tab.paneName == 'follow' || tab.paneName == 'followed'){
                    this.handleFollowList(tab.paneName)
                }else{
                    this.handleGetAuthorBlogs(tab.paneName);
                }
                this[tab.paneName+'Tab'] = true;
            }
        },
        handleJumpAuthorDetail(username){
            this.$router.push({
                path: '/author/detail',
                query: {
                    user: username
                }
            })
        },
        handleFollowAuthor(item, index, type){ //关注或者 取消关注
            let follow_type = item.is_follow ? 'notFollow' : 'follow';
            this.$axios.post('/account/api/author/follow',
                qs.stringify({
                    follow: item.username,
                    type: follow_type
                })
            ).then(res => {
                if(res){
                    this.$message.success(item.is_follow ? '取消关注成功' : '关注成功');
                    this[type+'List'][index].is_follow = item.is_follow ? false : true;
                }
            })
        },
        handleToggleText(item,index, type) {
            // console.log(this[type+'List'][index].is_hover)
            // this[type+'List'][index].is_hover = this[type+'List'][index].is_hover ? false : true;
            item.is_hover = item.is_hover ? false : true;
            this.$Vue.set(this[type+'List'], index, item);
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
    left: 118px;
}
.author-detail{
    .author-cont{
        width: 1000px;
        padding-top: 50px;
        margin: 0px auto 30px;
        .author-header{
            height: 300px;
            background-size: 100% 100%;
            position: relative;
            border-radius: 8px;
            box-shadow: 0 0 8px #b4b1b1;
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
                color: hsla(0,0%,100%,.7);
                border-color: hsla(0,0%,100%,.24);
                position: absolute;
                top: 8px;
                right: 10px;
                cursor: pointer;
                font-size: 15px;
                label{
                    cursor: pointer;
                    padding: 5px 10px;
                    display: inline-block;
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
                left: 440px;
                top: 30px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
        }
        .main-container{
            display: flex;
            justify-content: space-between;
            .main-container-right{
                width: 260px;
                .achievement-cont{
                    margin-top: 30px;
                    .achievement-title{
                        font-size: 14px;
                        padding: 9px;
                        border-bottom: 1.5px solid #bfb9b95e;
                    }
                    .achievement-contain{
                        padding: 10px;
                        .author-level{
                            display: flex;
                            img{
                                height: 40px;
                            }
                            .level-tips{
                                font-size: 12px;
                                color: #909399e3;
                            }
                            .level-text{
                                font-size: 14px;
                                display: flex;
                                align-items: flex-start;
                                flex-direction: column;
                                justify-content: center;
                                .level{
                                    font-weight: 700;
                                    .num{
                                        color: #3a8ee6
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .author-blogs{
            width: 700px;
            margin-top: 30px;
            border: 1px solid #eee1e1d9;
            padding: 0 10px;
            border-radius: 5px;
            box-shadow: 0 0 7px #ccccccb8;
            min-height: 500px;
            .waiting{
                padding: 20px;
                text-align: center;
            }
            .follow-item{
                height: 70px;
                display: flex;
                justify-content: space-between;
                padding: 18px;
                text-align: left;
                .item-avator{
                    cursor: pointer;
                    img{
                        border-radius: 8px;
                        height: 100%;
                    }
                }
                .item-info{
                    padding: 5px 15px;
                    .author-username{
                        .text{
                            font-weight: 700;
                            font-size: 20px;
                        }
                    }
                    .author-desc{
                        width: 400px;
                        .text{
                            font-size: 13px;
                            line-height: 18px;
                            margin-top: 5px;
                            word-wrap: break-word;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                    }
                }
            }
            .followed-item{
                height: 70px;
                display: flex;
                justify-content: space-between;
                padding: 18px;
                text-align: left;
                .item-avator{
                    cursor: pointer;
                    img{
                        border-radius: 8px;
                        height: 100%;
                    }
                }
                .item-info{
                    padding:5px 15px;
                    .author-username{
                        .text{
                            font-weight: 700;
                            font-size: 20px;
                        }
                    }
                    .author-desc{
                        width: 400px;
                        .text{
                            font-size: 13px;
                            line-height: 18px;
                            margin-top: 5px;
                            word-wrap: break-word;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                    }
                }
            }
            .item-operate{
                margin-left: 20px;
                display: flex;
                align-items: center;
                .follow-btn{
                    padding: 6px 0;
                    display: inline-block;
                    width: 98px;
                    text-align: center;
                    color: #ffffff;
                    border-radius: 2px;
                    cursor: pointer;
                    background-color: #0084ff;

                }
                .follow-btn:hover{
                    background-color: #0084ffcc;
                    transition: all .3s ease-out 0s;
                }
                .unfollow-btn{
                    padding: 6px 0;
                    display: inline-block;
                    width: 98px;
                    text-align: center;
                    color: #ffffff;
                    border-radius: 2px;
                    cursor: pointer;
                    background-color: #909399;
                }
                .unfollow-btn:hover{
                    background-color: #909399c4;
                    transition: all .3s ease-out 0s;
                }
            }
        }
    }
}
</style>