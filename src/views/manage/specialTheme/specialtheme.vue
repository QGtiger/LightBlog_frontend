<!-- 专栏模块 -->
<template>
   <div class='special-column-cont'>
       <Title title="专题管理" :back="true"></Title>
       <div class="search-cont">
           <div class="status-cont">
               <span :class="{'active': status === ''}" class="status-change" @click="handleChangeStatus('')">全部状态</span>
               <span class="space">/</span>
               <span :class="{'active': status === 1}" class="status-change" @click="handleChangeStatus(1)">已发布</span>
               <span class="space">/</span>
               <span :class="{'active': status === 0}" class="status-change" @click="handleChangeStatus(0)">未发布</span>
           </div>
           <div class="searchForm">
               <el-form :model="searchForm" :inline="true">
                   <el-form-item label="状态:">
                       <el-select v-model="searchForm.columnId">
                        <el-option label="全部" value=""></el-option>
                        <el-option 
                            v-for="item in columnList"
                            :key="item.id"
                            :label="item.specialColumn"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                   </el-form-item>
                   <el-form-item label="专题名称:">
                       <el-input v-model="searchForm.content" placeholder="请输入专题名称"></el-input>
                   </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearchTheme">搜索</el-button>
                    </el-form-item>
               </el-form>
           </div>
           <div>
               <el-button type="primary" @click="handleJumpAddSpecialTheme">增加专题</el-button>
           </div>
       </div>
       <div class="table">
           <el-table :data="specialThemeList">
                <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                width="200">
                </el-table-column>
                <el-table-column prop="specialTheme" label="专题名称">

                </el-table-column>
                <el-table-column label="所属专栏" prop="specialColumn"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ $util.Time.getAllTime(scope.row.created) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="专题简介" ></el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">
                        <div>
                            {{ scope.row.status === 1 ? '已发布' : '未发布' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <div>
                            <span class="update" @click="handleJumpUpdateSpecialColumn(scope.row.specialThemeId)">编辑</span>
                            <span class="del" @click="handleDelSpecialTheme(scope.row.specialThemeId,scope.row.specialTheme)">删除</span>
                            <span class="up" @click="handlePublishTheme(scope.row.specialThemeId,scope.row.specialTheme)" v-if="scope.row.status === 0">发布</span>
                            <span class="down" @click="handleDownTheme(scope.row.specialThemeId,scope.row.specialTheme)" v-else>下架</span>
                        </div>
                    </template>
                </el-table-column>
           </el-table>
            <el-pagination
              :current-page.sync="currentPage"
              @current-change="handleGetSpecialThemeList"
              :page-size="size"
              layout="total, prev, pager, next"
              :total="total"
            ></el-pagination>             
       </div>
  
   </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
import Title from '@/components/title/title';
import qs from 'qs';

export default {
    components: {
        Title,
        VueCropper
    },
    data() {
        return {
            rules: {
                columnName: [
                    { required: true, message: '请输入专栏名称', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入专栏简介', trigger: 'blur' }
                ]
            },
            currentPage: 1,
            size: 10,
            specialThemeList: [],
            total: 0,
            searchForm: {
                columnId: '',
                content: ''
            },
            status: '',
            columnList: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialThemeList();
        this.handleGetSpecialColumnList();
    },
    methods: {
        indexMethod(index) {
            return (index+1) + (this.currentPage-1)*10;
        },
        handleGetSpecialThemeList() {
            this.$axios.post('/article/api/get/special_theme?page='+this.currentPage+'&size='+this.size,
                qs.stringify({
                    status: this.status,
                    columnId: this.searchForm.columnId,
                    content: this.searchForm.content
                    })
            ).then(res=>{
                this.specialThemeList = res.data.data;
                this.total = res.data.total;
            })
        },
        handleDelSpecialTheme(id, themeName) {
            this.$confirm("是否删除专题 -- 《"+themeName+"》 ?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                cancelButtonClass: "el-button--danger",
                type: "warning",
                center: true
            }).then(() => {
                this.$axios.post('/article/api/del/special_theme',
                    qs.stringify({themeId: id})
                ).then(res=>{
                    this.$message.success(res.data.tips);
                    this.handleGetSpecialThemeList();
                })
            }).catch(() => {

            })
        },
        handleGetSpecialColumnList() { //获取专栏 LIST
            this.$axios.get('/article/api/get/special_column').then(res=>{
                this.columnList = res.data.data;
            })
        },

        handleJumpAddSpecialTheme(){
            this.$router.push('/specialtheme/add');
        },
        handleJumpUpdateSpecialColumn(id){
            this.$router.push({
                path: '/specialtheme/update',
                query: {
                    id
                }
            })
        },
        handlePublishTheme(id,name){ //发布专题
            this.$confirm('确定发布 《'+name+'》 ?','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                cancelButtonClass: 'el-button-danger',
                center: true,
                type: 'warning'
            }).then(() => {
                this.$axios.post('/article/api/publish/special_theme',
                    qs.stringify({themeId: id})
                ).then(res=>{
                    if(res){
                        this.$message.success('发布成功')
                        this.handleGetSpecialThemeList()
                    }
                })
                            
            }).catch(() => {

            })
        },
        handleDownTheme(id,name){
            this.$confirm('确定下架 《'+name+'》 ?','提示',{
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                cancelButtonClass: 'el-button-danger',
                center: true,
                type: 'warning'
            }).then(() => {
                this.$axios.post('/article/api/down/special_theme',
                    qs.stringify({themeId: id})
                ).then(res=>{
                    if(res){
                        this.$message.success('下架成功')
                        this.handleGetSpecialThemeList()
                    }
                })
                            
            }).catch(() => {

            })
        },
        handleChangeStatus(status){ //状态
            this.status = status;
            this.handleGetSpecialThemeList();
        },
        handleSearchTheme() {
            this.handleGetSpecialThemeList();
        }
    }
}
</script>
<style lang='less' >
//@import url(); 引入公共css类

.special-column-cont .search-cont{
    overflow: hidden;
    .status-cont{
        padding: 10px 0 20px;
        .space{
            margin: 0 20px;
        }
        .status-change{
            cursor: pointer;
        }
        .active{
            color: #0066cc;
            font-weight: 700;
        }
    }
}

.disabled .el-upload--picture-card{
    display: none;
}
</style>