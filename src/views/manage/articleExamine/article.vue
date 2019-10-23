<!-- 文章审核界面 -->
<template>
   <div class='article-examine'>
       <Title title="文章审核"></Title>
       <div class="examine-cont">
           <div class="search-cont">
               <el-form :model="searchForm" :inline="true">
                   <el-form-item label="状态: ">
                       <el-select v-model="searchForm.status">
                           <el-option label="全部" value=""></el-option>
                           <el-option
                            v-for="(item,index) in statusList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                           ></el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="专栏: ">
                       <el-select v-model="searchForm.specialColumnId" @change="handleChangeColumn">
                           <el-option label="全部" value=""></el-option>
                           <el-option
                            v-for="(item, index) in specialColumnList"
                            :key="index"
                            :label="item.columnName"
                            :value="item.id"
                           ></el-option>
                       </el-select>
                   </el-form-item>
                    <el-form-item label="专题: ">   
                       <el-select v-model="searchForm.specialThemeId">
                           <el-option label="全部" value=""></el-option>
                           <el-option
                            v-for="(item, index) in specialThemeList[searchForm.specialColumnId]"
                            :key="index"
                            :label="item.themeName"
                            :value="item.id"
                           ></el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="起始时间: ">
                        <el-date-picker
                            v-model="searchForm.dateStart"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right"
                            value-format="yyyy-MM-dd HH:m:s"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                   </el-form-item>
                   <el-form-item label="标题: ">
                       <el-input v-model="searchForm.queryKey" placeholder="输入文章标题"></el-input>
                   </el-form-item>
                   <el-form-item>
                       <el-button type="primary" @click="handleGetArticleList">搜索</el-button>
                   </el-form-item>
               </el-form>
           </div>
           <div class="table-cont table">
           <el-table :data="articleList">
               <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                
               ></el-table-column>
               <el-table-column label="文章标题" prop="title"></el-table-column>
               <el-table-column label="文章简介" prop="description"></el-table-column>
               <el-table-column label="所属专栏" prop="specialColumn"></el-table-column>
               <el-table-column label="所属专题" prop="specialTheme"></el-table-column>
               <!-- <el-table-column label="创建时间">
                   <template slot-scope="scope">{{ $util.Time.getAllTime(scope.row.created) }}</template>
               </el-table-column> -->
               <el-table-column label="更新时间">
                   <template slot-scope="scope">{{ $util.Time.getAllTime(scope.row.updated) }}</template>
               </el-table-column>
               <el-table-column label="审核时间">
                   <template slot-scope="scope">{{ scope.row.checked ? $util.Time.getAllTime(scope.row.checked):'--' }}</template>
               </el-table-column>
               <el-table-column label="是否上推荐">
                   <template v-slot="scope">
                       <div>
                           <span class="is-recommend" v-if="scope.row.isRecommend">是</span>
                           <span v-else>否</span>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="字数" prop="wordCount"></el-table-column>
               <el-table-column label="状态">
                   <template v-slot="scope">
                       <div>
                           <!-- <span>{{  handleStatusText(scope.row.status) }}</span> -->
                           <span class="local" v-if="scope.row.status == 0">未发布</span>
                           <span class="waiting" v-if="scope.row.status == 1">待处理</span>
                           <span class="reject" v-if="scope.row.status == 2">已驳回</span>
                           <span class="adopt" v-if="scope.row.status == 3">已通过</span>
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="点赞" prop="usersLike"></el-table-column>
               <el-table-column label="踩" prop="usersDisLike"></el-table-column>
               <el-table-column label="浏览数" prop="scanCount"></el-table-column>
               <el-table-column label="作者" prop="author"></el-table-column>
               <el-table-column label="操作">
                   <template v-slot="scope">
                       <div>
                           <span class="update" @click="handleJumpExamine(scope.row.id)">审核</span>
                           <span class="detail" @click="handleGetDetailCheck(scope.row.id)" v-if="scope.row.status > 1">审核详情</span>
                       </div>
                   </template>
               </el-table-column>
           </el-table>
            <el-pagination
            :current-page.sync="currentPage"
            @current-change="handleGetArticleList"
            :page-size="size"
            :total="total"
            layout="total, prev, pager, next"
           ></el-pagination>
       </div>
       </div>
       <el-drawer
        title="审核结果"
        :visible.sync="drawerShowResult"
        direction="ltr"
        size="30%">
            <div class="drawer-result">
                <el-form :model="resultForm" ref="resultForm" label-width="100px" label-position="left">
                    <el-form-item label="文章标题">
                        {{ resultForm.title }}
                    </el-form-item>
                    <el-form-item label="文章状态">
                        <span>{{ resultForm.status == 2 ? '已驳回' : '已通过' }}</span>
                    </el-form-item>
                    <el-form-item label="文章简介">
                        {{ resultForm.description }}
                    </el-form-item>
                    <el-form-item label="是否推荐">
                        <span>{{ resultForm.isRecommend ? '推荐' : '不推荐' }}</span>
                    </el-form-item>
                    <el-form-item label="审核回复内容">
                        {{ resultForm.content }}
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
   </div>
</template>

<script>
import Title from '@/components/title/title';
import qs from 'qs';
export default {
    components: {
        Title
    },
    data() {
        return {
            searchForm: {
                status: '',
                specialColumnId: '',
                specialThemeId: '',
                dateStart: '',
                queryKey: ''
            },
            statusList: [
                { label: '待处理', value: 1 },
                { label: '已驳回', value: 2 },
                { label: '已通过', value: 3 },
            ],
            specialColumnList: [],
            specialThemeList: [],
            currentPage: 1,
            size: 10,
            articleList: [],
            total:0,
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            drawerShowResult: false,
            resultForm: {
                title: '',
                isRecommend: false,
                status: 3,
                content: '',
                description: ''
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialColumnList();
        this.handleGetArticleList();
        this.handleGetColumnTheme();
    },
    methods: {
        handleGetSpecialColumnList() {
            this.$axios.get('/article/api/get/special_column').then(res=>{
                if(res){
                    this.specialColumnList = res.data.data;
                }
            })
        },
        handleGetArticleList(){ //获取所有文章
            this.$axios.post(`/article/api/admin/get/articlelist?page=${this.currentPage}&size=${this.size}`,
                qs.stringify({
                    status: this.searchForm.status,
                    columnId: this.searchForm.specialColumnId,
                    themeId: this.searchForm.specialThemeId,
                    dateStart: this.searchForm.dateStart,
                    queryKey: this.searchForm.queryKey
                })
            ).then(res=>{
                if(res){
                    this.articleList = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        indexMethod(index) {
            return index+1+(this.currentPage-1)*this.size;
        },
        handleGetColumnTheme(){ //获取专栏和专题
            this.$axios.post('/article/api/get/columnTheme').then(res=>{
                if(res){
                    this.specialColumnList = res.data.data.columnList;
                    this.specialThemeList = res.data.data.themeList;
                }
            })
        },
        handleChangeColumn(){ //切换专栏
            this.searchForm.specialThemeId = '';
        },
        handleJumpExamine(id){ //跳转审核页面
            this.$router.push({
                path: 'check',
                query: {
                    id
                }
            })
        },
        handleGetDetailCheck(id){ //查看申请详情
            this.$axios.post('/article/api/get/articlecheck',
                qs.stringify({
                    id
                })
            ).then(res => {
                let data = res.data.data;
                if(res){
                    this.resultForm = data;
                    this.drawerShowResult=true;
                }
            })
        }
    },
    created() {

    }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.article-examine{
    .examine-cont{
        .table-cont{
            .is-recommend{
                color:#bf0000;
            }
            .waiting{
                color:#0066cc;
            }
            .reject{
                color: #bf0000;
            }
            .adopt{
                color:#34b52c;
            }
            .detail{
                cursor: pointer;
                color:#bf0000;
            }
        }
    }
}
</style>