<!-- 首页 -->
<template>
   <div class='home-page'>
       <div class="blog-main-cont">
           <div class="main-cont-header">
               <div class="banner-cont">
                   <el-carousel trigger="click" height="300px" :interval="5000">
                    <el-carousel-item v-for="item in carouselImgList" :key="item">
                        <a href="https://www.baidu.com" target="_blank">
                            <img :src="item" alt="">
                        </a>
                    </el-carousel-item>
                    </el-carousel>
               </div>
           </div>
           <div class="sec-panel-header"></div>
           <div class="recommendSpecialColumn">
               <div class="title">
                   <p class="title-text">推荐专栏 <span class="tips">知识体系专栏，可通过专栏去系统学习某个知识点</span></p>
               </div>
               <div class="column-list">
                   <div class="column-item" v-for="item in columnList" :key="item.id">
                       <div class="item-img">
                           <img :src="item.image_preview" :title="item.description" alt="">
                           <span>{{ item.specialColumnName }}</span>
                       </div>
                   </div>
               </div>
           </div>
           <div class="homepage-container">
               <div class="flow_blogs">
                    <div class="list-group" v-for="(item, index) in flowBlog" :key="index" >
                            <CardBlog :blog="item"></CardBlog>
                    </div>
                            <p class="waiting" v-if="waiting">努力加载中...</p>
                            <p class="nomore" v-if="waiting === false">没有更多了...</p>
                </div>
                <div class="fix-div">
                    <div class="hotest-blog">
                        <div class="title">
                            <h4 class="title-text">推荐阅读</h4>
                        </div>
                        <div class="blog-list">
                            <div class="blog-item" v-for="item in recommendList" :key="item.id">
                                <div class="item-img">
                                    <img :src="item.blog_img_url" alt="">
                                </div>
                                <div class="item-content">
                                    <p class="item-title">
                                        <router-link :to="'/blog/'+item.id">{{ item.title }}</router-link>
                                    </p>
                                    <p class="item-date">{{ $util.Time.getFormatTime(item.updated) }} <span class="scanCount">浏览 {{item.scanCount}} 次</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
import {getBlogs} from '@/api/blog';
import CardBlog from '@/components/blog/CardBlog';

export default {
    components: {
        CardBlog
    },
    data() {
        return {
            currentPage: 1,
            flowBlog: [],
            totalPage: 1,
            waiting: true,
            size: 10,
            timeout: null,
            recommendList: [],
            carouselImgList:['http://qnpic.top/yoona2.jpg','http://qnpic.top/yoona3.jpg','http://qnpic.top/yoona4.jpg','http://qnpic.top/yoona5.jpg'],
            columnList: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        this.handleGetRecommendBlogs();
        this.handleGetMostViews();
        this.handleGetSpecialColumn();
    },
    methods: {
        handleGetRecommendBlogs() {
            this.$axios.post('/article/api/get/home/articles?page='+this.currentPage+'&&size='+this.size).then(res => {
                this.flowBlog.push(...res.data.data);
                this.totalPage = res.data.totalPage;
            })
        },
        handleDebounceFun(fn, wait){ // 防抖请求数据
            let timeout = null;
            return function () {
                if(timeout != null){
                    clearTimeout(timeout);
                }
                timeout = setTimeout(fn, wait);
            }
        },
        handleScroll() {
            if(this.timeout != null){
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(()=>{
                let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.offsetHeight;
                if(bottomOfWindow < 20){
                    if(this.currentPage < this.totalPage){
                        this.waiting = true;
                        this.currentPage += 1;
                        this.handleGetRecommendBlogs();
                    }else{
                        this.waiting = false;
                        console.log('break...')
                    }
                }
            }, 500)
        },
        handleGetMostViews(){
            this.$axios.post('/article/api/get/most/views').then(res=>{
                if(res){
                    this.recommendList = res.data.data;
                }
            })
        },
        handleGetSpecialColumn(){
            this.$axios.post('/article/api/get/home/special/column').then(res=>{
                if(res){
                    this.columnList = res.data.data;
                }
            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    beforedestroy(){
        
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.handleScroll);
        next();
    }
}
</script>
<style lang='less' scoped>
@media screen and (max-width: 1375px){
    .fixed-css{
        left: 1143px;
    }
}

.home-page{
    min-width: 1375px;
}

.blog-main-cont{
    width: 60%;
    min-width: 1100px;
    padding-top: 30px;
    margin: 0px auto;
    position: relative;
    .main-cont-header{
        height: 300px;
        .banner-cont{
             width: calc(100% - 320px);
            min-width: 700px;
            border-radius: 6px;
            float: left;
            overflow: hidden;
            box-shadow: 0 0 7px;
            img{
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .recommendSpecialColumn{
        margin-top: 20px;
        width: calc(100% - 350px);
        background-color: white;
        box-shadow: 0px 0px 7px #eee;
        padding: 15px;
        overflow: hidden;
        .tips{
            font-size: 14px;
            padding-left: 30px;
            color:#848080;
        }
        .title{
            .title-text{
                padding-bottom: 10px;
                border-bottom: 1px solid #84808030
            }
        }
        .column-list{
            margin-top: 10px;
            overflow: hidden;
            width: 100%;
            float: left;
            .column-item{
                margin-right: 10px;
                width: 240px;
                height: 150px;
                display: inline-block;
                    border-radius: 5px;
                    cursor: pointer;
                    overflow: hidden;
                .item-img{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 5px;
                    }
                    img:hover{
                        transform: scale(1.1);
                        transition: all .3s ease-out;
                    }
                    span{
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        padding: 3px 15px 0;
                        font-size: 16px;
                        line-height: 32px;
                        text-align: center;
                        color: #fff;
                        text-shadow: 0 0 3px rgba(0,0,0,.6);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                        box-sizing: border-box;
                        background: linear-gradient(180deg,transparent,rgba(0,0,0,.5));
                        transition: all .3s ease-out;
                    }
                }
            }
        }
    }
    .fix-div{
        float: right;
        .hotest-blog{
            margin-top: 20px;
            width: 285px;
            height: 500px;
            background-color: white;
            box-shadow: 0px 0px 7px #eee;
            padding: 10px 10px;
            .title{
                .title-text{
                    padding-left: 15px;
                    border-left: 3px solid #18b0de;
                }
            }
            .blog-list{
                .blog-item{
                    height: 60px;
                    margin-top: 15px;
                    .item-img{
                        width: 100px;
                        height: 100%;
                        border-radius: 3px;
                        float: left;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 4px;
                        }
                    }
                    .item-content{
                        margin-left: 110px;
                        .item-title{
                            height: 38px;
                            font-size: 14px;
                            margin-bottom: 6px;
                            word-wrap: break-word;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            a{
                                color: #525f6d;
                            }
                            a:hover{
                                color:#18b0de
                            }
                        }
                        .item-date{
                            font-size: 13px;
                            .scanCount{
                                float: right;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }
    }
}

.homepage-container{
    .flow_blogs{
        float: left;
        margin-top: 20px;
        width: calc(100% - 360px);
        min-width: 700px;
        padding: 10px 20px;
        background-color: white;
        box-shadow: 0px 0px 8px #f0f0f0;
        .waiting{
            padding: 20px;
            text-align: center
        }
        .nomore{
            padding: 20px;
            text-align: center
        }
    }
}

</style>