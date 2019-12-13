<!-- 专题文章显示 -->
<template>
   <div class='theme-blog-content'>
       <div class="content-header">
           <div class="title">
                <p class="title-text">
                     {{ themeName }} 专题文章
                </p>
            </div>
       </div>
       <div class="content-cont">
           <div class="flow-blogs">
                <transition-group name="el-fade-in-linear">
                    <div class="list-group" v-for="(item, index) in themeBlogList" :key="index" >
                        <CardBlog :blog="item"></CardBlog>
                    </div>
                </transition-group>
                <div class="list-pagination">
                    <el-pagination
                    :current-page.sync="currentPage"
                    @current-change="handleThemeBlogList"
                    :page-size="size"
                    :total="total"
                    layout="total, prev, pager, next"
                    ></el-pagination>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
import CardBlog from '@/components/blog/CardBlog';
export default {
    components: {CardBlog},
    data() {
        return {
            themeId: '',
            currentPage: 1,
            total: 0,
            size: 2,
            themeName: '',

            themeBlogList: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.themeId = parseInt(this.$route.params.id) ? parseInt(this.$route.params.id) : this.$router.push('/theme/list');
        this.handleThemeBlogList();
    },
    methods: {
        handleThemeBlogList(){
            this.$axios.post('/article/api/theme/blog/list?page='+this.currentPage+"&size="+this.size, 
                this.$qs.stringify({
                    themeId: this.themeId
                })
            ).then(res=>{
                if(res){
                    this.themeBlogList = res.data.data;
                    this.themeName = res.data.themeName;
                    this.total = res.data.total;
                }
            })
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.theme-blog-content{
    .content-header{
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
                font-size: 30px;
                padding: 100px 0 10px 0;
                font-weight: 600;
                position: relative;
                color: #f2f6fc;
            }
            .title-text::after{
                    content: '';
                    display: inline-block;
                    width: 120px;
                    position: absolute;
                    border: 1px solid;
                    bottom: 0;
                    left: calc(50% - 60px);
            }
        }
    }
    .content-cont{
        margin-top: 30px;
        .flow-blogs{
            margin: 0 auto;
            width: 700px;
            padding: 0px 20px;
            border: 1px solid #e4e4e4;
            box-shadow: 0 0 5px #e4e4e4;
            border-radius: 5px;
            overflow: hidden;
            .list-pagination{
                padding: 10px 20px;
            }
        }
    }
}
</style>