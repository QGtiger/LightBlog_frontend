<!-- 专栏列表页面 -->
<template>
   <div class='special-column-cont'>
       <div class="column-header">
            <div class="title">
                <p class="title-text">
                    专栏列表
                </p>
            </div>
       </div>
       <div class="column-list">
           <el-row :gutter="20">
               <el-col :sm="24" :md="24" :lg="12" :xl="12" v-for="item in columnList" :key="item.id">
                   <div class="column-item">
                       <span class="svg-container" v-if="item.isRecommend">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icontuijian1"></use>
                            </svg>
                        </span>
                       <div class="item-thumb">
                           <a :href="'/theme/list?id='+item.id" target="_blank">
                               <img :src="item.preview" alt="null">
                           </a>
                       </div>
                       <div class="item-cont">
                           <div class="item-title">
                               <p><a :href="'/theme/list?id='+item.id" target="_blank">{{ item.specialColumn }}</a></p>
                           </div>
                           <div class="item-desc">
                               <p>{{ item.description }}</p>
                           </div>
                           <a :href="'/theme/list?id='+item.id" target="_blank" class="item-more">进入专栏 >></a>
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
            columnList: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetColumnList();
    },
    methods: {
        handleGetColumnList() { //获取 专栏List (发布)
            this.$axios.post('/article/api/get/special_column',
                qs.stringify({
                    status: 1,
                    is_img: true
                })
            ).then(res=>{
                if(res){
                    this.columnList = res.data.data;
                }
            })
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

.special-column-cont{
    .column-header{
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
    .column-list{
        width: 1000px;
        margin: 30px auto 0;
        .column-item{
            padding: 15px;
            border-radius: 3px;
            box-shadow: 0 0 5px #60626645;
            margin-bottom: 15px;
            overflow: hidden;
            transition: all .6s ease-out 0s;
            position: relative;
            .svg-container{
                position: absolute;
                right: 0;
                font-size: 38px;
                top: -2px;
            }
            .item-thumb{
                width: 200px;
                height: 150px;
                float: left;
                overflow: hidden;
                border-radius: 5px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    box-shadow: 2px 2px 3px #dcdfe6;
                    transition: all .3s;
                }
            }
            .item-thumb:hover img{
                transform: scale(1.05);
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
                .item-more{
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    font-size: 14px;
                    color: #409eff;
                }
            }
        }
        .column-item:hover{
            box-shadow: 0 0 5px #909399;
            transition: all .6s ease-out 0s;
        }
    }
}
</style>