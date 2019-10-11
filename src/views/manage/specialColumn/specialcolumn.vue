<!-- 专栏模块 -->
<template>
   <div class='special-column-cont'>
       <Title title="专栏管理"></Title>
       <div class="search-cont">
           <div>
               <el-button type="primary" @click="handleShowDialogAddSpecial">增加专栏</el-button>
           </div>
       </div>
       <div class="table">
           <el-table :data="specialColumnList">
                <el-table-column
                type="index"
                label="序号"
                :index="indexMethod"
                width="200">
                </el-table-column>
                <el-table-column prop="specialColumn" label="专栏名称">

                </el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ $util.Time.getAllTime(scope.row.created) }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="专栏简介" ></el-table-column>
           </el-table>
            <el-pagination
              :current-page.sync="currentPage"
              @current-change="handleGetSpecialColumnList"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="total"
              :hide-on-single-page="true"
            ></el-pagination>             
       </div>
        <el-dialog
            title="添加文章专栏"
            :visible.sync="dialogShowAddSpecial"
            :before-close="handleCancelAddSpecial"
            width="30%"
            center
        >
            <el-form :model="dialogAddSpecialForm" ref="dialogAddSpecialForm" label-width="80px" :rules="rules">
                <el-form-item prop="columnName" label="专栏名称">
                    <el-input v-model="dialogAddSpecialForm.columnName" placeholder="请填写专栏名称"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="简介">
                    <el-input type="textarea" v-model="dialogAddSpecialForm.description"></el-input>                    
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAddSpecialColumn">提交</el-button>
                    <el-button @click="handleCancelAddSpecial">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
   </div>
</template>

<script>
import Title from '@/components/title/title'

export default {
    components: {
        Title
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
            specialColumnList: [],
            total: 0,
            dialogShowAddSpecial: false,
            dialogAddSpecialForm: {
                columnName: '',
                description: '',
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialColumnList();
    },
    methods: {
        indexMethod(index) {
            return (index+1) + (this.currentPage-1)*10;
        },
        handleGetSpecialColumnList() {
            this.$axios.get('/article/api/get/special_column').then(res=>{
                this.specialColumnList = res.data.data;
                this.total = res.data.total;
                console.log(this.specialColumnList)
            })
        },
        handleCancelAddSpecial(){
            this.dialogShowAddSpecial = false;
            this.dialogAddSpecialForm= {
                columnName: '',
                description: '',
            }
            this.$refs.dialogAddSpecialForm.resetFields();
        },
        handleShowDialogAddSpecial() {
            this.dialogShowAddSpecial = true;
        },
        handleAddSpecialColumn() {
            console.log(this.dialogAddSpecialForm)
            const formData = new FormData();
            const loginData = this.dialogAddSpecialForm;
            Object.keys(loginData).forEach((key) => {
                formData.append(key, loginData[key]);
            });
            console.log(formData);
            this.$axios.post('/article/api/add/special_column', 
                formData
            ).then(res=> {
                this.$message.success(res.data.tips)
                this.dialogShowAddSpecial = false;
                this.dialogAddSpecialForm= {
                    columnName: '',
                    description: '',
                }
                this.handleGetSpecialColumnList();
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

</style>