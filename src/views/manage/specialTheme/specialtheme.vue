<!-- 专栏模块 -->
<template>
   <div class='special-column-cont'>
       <Title title="专题管理"></Title>
       <div class="search-cont">
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
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <div>
                            <span class="update" @click="handleJumpUpdateSpecialColumn(scope.row.id)">编辑</span>
                            <span class="del" @click="handleDelSpecialTheme(scope.row.specialThemeId,scope.row.specialTheme)">删除</span>
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
              :hide-on-single-page="true"
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
            showUploadBtn: false,
            dialogImageUrl: '',
            dialogImage: false,
            showImage: [],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialThemeList();
    },
    methods: {
        indexMethod(index) {
            return (index+1) + (this.currentPage-1)*10;
        },
        handleGetSpecialThemeList() {
            this.$axios.get('/article/api/get/special_theme?page='+this.currentPage+'&size='+this.size).then(res=>{
                console.log(res)
                this.specialThemeList = res.data.data;
                this.total = res.data.total;
            })
        },
        handleDelSpecialTheme(id, themeName) {
            this.$confirm("是否删除专题 -- 《"+themeName+"》", "提示", {
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
        handleUploadImage(file, fileList){
            console.log(file)
            this.showUploadBtn = true;
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
        },
        handlePictureCardPreview(file){
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogImage = true;
        },
        handleRemove(file, fileList){
           this.showUploadBtn = false;
        },

        handleJumpAddSpecialTheme(){
            this.$router.push('/specialtheme/add');
        },
        handleJumpUpdateSpecialColumn(id){
            this.$router.push({
                path: '/specialcolumn/update',
                query: {
                    id
                }
            })
        }
    }
}
</script>
<style lang='less' >
//@import url(); 引入公共css类

.special-column-cont .search-cont{
    overflow: hidden;
    div{
        float: right;
        padding-right: 50px;
    }
}

.disabled .el-upload--picture-card{
    display: none;
}
</style>