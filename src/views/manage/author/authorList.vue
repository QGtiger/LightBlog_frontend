<!-- 用户管理页面 -->
<template>
   <div class='author-list-cont'>
       <Title title="用户管理"></Title>
       <div class="search-heade">
           <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="120px" label-position="left">
               <el-form-item label="用户名：">
                   <el-input v-model="searchForm.userName" placeholder="请输入可能包含的字符"></el-input>
               </el-form-item>
               <el-form-item label="是否为管理员：">
                   <el-select v-model="searchForm.status">
                       <el-option label="全部" value=""></el-option>
                       <el-option label="是" value="1"></el-option>
                       <el-option label="否" value="0"></el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="注册时间: ">
                    <el-date-picker
                        v-model="searchForm.dateJoined"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        value-format="yyyy-MM-dd HH:m:s"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                   </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="handlePaginationChange">搜索</el-button>
                   <el-button type="warning" @click="handleReset">reset</el-button>
               </el-form-item>
           </el-form>
       </div>
       <div class="author-table table">
           <el-table :data="authorList">
               <el-table-column type="index" label="序号" width="100" :index="indexMethod"></el-table-column>
               <el-table-column prop="userName" label="用户名"></el-table-column>
               <el-table-column prop="email" label="邮箱"></el-table-column>
               <el-table-column label="注册时间">
                   <template v-slot="scope">
                       <div>
                           {{ $util.Time.getAllTime(scope.row.dateJoined) }}
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="最近登录">
                   <template v-slot="scope">
                       <div>
                           {{ $util.Time.getFormatTime(scope.row.lastLogin) }}
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="是否是管理员">
                   <template v-slot="scope">
                       <div>
                           <span :style="{color: (scope.row.admin ? 'red' : '#909399')}">{{ scope.row.admin ? '是' : '否' }}</span>
                           
                       </div>
                   </template>
               </el-table-column>
               <el-table-column label="操作">
                   <template v-slot="scope">
                       <div>
                           <span>删除</span>
                       </div>
                   </template>
               </el-table-column>
           </el-table>
           <el-pagination
            :current-page.sync="currentPage"
            @current-change="handleAuthorList"
            :page-size="size"
            :total="total"
            layout="total, prev, pager, next"
           ></el-pagination>
       </div>
   </div>
</template>

<script>
import Title from '@/components/title/title';
export default {
    components: {Title},
    data() {
        return {
            
            currentPage: 1,
            size: 6,
            total: 0,

            authorList: [],
            searchForm: {
                status: '', // '' 为全部， 1为admin 0为普通用户
                userName: '', //用户名
                dateJoined: '', // 加入时间
            },
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
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleAuthorList();
    },
    methods: {
        handleAuthorList() {
            this.$axios.post('/account/api/author/list/get?page='+this.currentPage+'&size='+this.size,
                this.$qs.stringify(this.searchForm)
            ).then(res=>{
                if(res){
                    this.authorList = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        indexMethod(index){
            return index + 1 + (this.currentPage - 1) * this.size;
        },
        handlePaginationChange() {
            this.currentPage = 1;
            this.handleAuthorList();
        },
        handleReset() {
            this.searchForm.userName = '';
            this.searchForm.dateJoined = '';
            this.searchForm.status = '';
            this.handleAuthorList();
        }
    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类

</style>