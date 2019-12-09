<!-- 专栏列表页面 -->
<template>
   <div class='special-theme-cont'>
       <div class="theme-header">
            <div class="title">
                <p class="title-text">
                    {{ columnName }} 专题
                </p>
            </div>
       </div>
       <div class="theme-list">
           <el-row :gutter="20">
               <el-col :sm="24" :md="12" :lg="12" :xl="12" v-for="item in themeList" :key="item.id">
                   <div class="theme-item">
                       <div class="item-top">
                           <div class="item-thumb">
                                <a href="" target="_blank">
                                    <img :src="item.preview" alt="null">
                                </a>
                            </div>
                            <div class="item-cont">
                                <div class="item-title">
                                    <p>{{ item.specialTheme }}</p>
                                </div>
                                <div class="item-desc">
                                    <p>{{ item.description }}</p>
                                </div>
                            </div>
                       </div>
                        <div class="theme-recommend">
                            <ul class="recommend-list">
                                <li v-for="blog in handleInitRecommend(item)" :key="blog.id">
                                    <router-link :to=" blog.id ? '/blog/'+blog.id : blog.url">{{ blog.title }}</router-link>
                                </li>
                            </ul>
                        </div>
                   </div>
               </el-col>
           </el-row>
       </div>
   </div>
</template>

<script>
import qs from 'qs';
export default {
    components: {},
    data() {
        return {
            themeList: [],
            columnId: '',
            themeId: '',
            columnName: ''
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.columnId = this.$route.query.id === undefined ? '' : this.$route.query.id;
        this.handleGetThemeList();
    },
    methods: {
        handleGetThemeList() { //获取 专栏List (发布)
            this.$axios.post('/article/api/get/special_theme?page=1&size=1000',
                qs.stringify({
                    status: 1,
                    is_img: true,
                    columnId: this.columnId
                })
            ).then(res=>{
                if(res){
                    this.themeList = res.data.data;
                    this.columnName = res.data.columnName;
                }
            })
        },
        handleInitRecommend(item){
            let list = item.recommendBlogs;
            let len = list.length;
            if(len == 3){
                return list;
            }else{
                let initData = [];
                initData.push(...list);
                for(var i = len; i < 3; i++){item
                    initData[i] = {title: '虚左以待', url:'/article/add?themeId='+item.specialThemeId+'&columnId='+item.specialColumnId}
                }
                return initData;
            }
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类

@font-face{
  font-family: TitleFont;
  src: url('../../assets/font/GoodVibrationsROB Script.ttf');
}

.special-theme-cont{
    .theme-header{
        background-image: url('../../assets/images/pic4.jpg');
        height: 300px;
        background-size: 100% 100%;
        background-attachment: fixed;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        zoom: 1;
        .title{
            .title-text{
                text-align: center;
                font-family: TitleFont;
                font-size: 30px;
                padding: 100px 0 10px 0;
                font-weight: 600;
                position: relative;
                color: #f2f6fc;
            }
            .title-text::after{
                    content: '';
                    display: inline-block;
                    width: 80px;
                    position: absolute;
                    border: 1px solid;
                    bottom: 0;
                    left: calc(50% - 40px);
            }
        }
    }
    .theme-list{
        width: 1000px;
        margin: 30px auto 0;
        .theme-item{
            padding: 15px;
            border-radius: 3px;
            box-shadow: 0 0 5px #60626645;
            margin-bottom: 15px;
            overflow: hidden;
            transition: all .6s ease-out 0s;
            .item-top{
                overflow: hidden;
                padding-bottom: 15px;
            }
            .item-thumb{
                width: 200px;
                float: left;
                img{
                    width: 100%;
                    height: 140px;
                    object-fit: cover;
                    border-radius: 4px;
                    box-shadow: 2px 2px 3px #dcdfe6;
                }
            }
            .item-cont{
                margin-left: 220px;
                margin-top: 10px;
                .item-title{
                    p{
                        font-size: 18px;
                    }
                }
                .item-desc{
                    p{
                        font-size: 14px;
                        color: #999;
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
            .theme-recommend{
                border-top: 1px solid #efefef;
                padding-top: 10px;
                .recommend-list{
                    li{
                        list-style: none;
                        a{
                            position: relative;
                            display: inline-block;
                            padding: 5px 15px;
                            color: #999;
                            width: 100%;
                            font-size: 13px;
                            max-width: 100%;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            transition: all .3s ease 0s;
                            vertical-align: top;
                        }
                        a:hover{
                            color: #18b0de;
                            transition: all .3s ease 0s;
                        }
                        a::before{
                            position: absolute;
                            left: 4px;
                            top: 10px;
                            width: 0;
                            height: 0;
                            line-height: 0;
                            border: 4px solid transparent;
                            border-left: 4px solid #ccc;
                            content: "";
                            transition: all .3s ease 0s;
                        }
                    }
                }
            }
        }
        .theme-item:hover{
            box-shadow: 0 0 5px #909399;
            transition: all .6s ease-out 0s;
        }
    }
}
</style>