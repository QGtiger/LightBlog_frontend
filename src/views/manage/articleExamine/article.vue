<!-- 文章审核界面 -->
<template>
   <div class='article-examine'>
       <Title title="文章审核"></Title>
       <div class="examine-cont">
           <div class="search-cont">
               <el-form :model="searchForm" :inline="true" label-width="60px">
                   <el-form-item label="状态: ">
                       <el-select v-model="searchForm.status">
                           <el-option label="全部" value="0"></el-option>
                           <el-option
                            v-for="(item,index) in statusList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                           ></el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="专栏: ">
                       <el-select v-model="searchForm.specialColumn">
                           <el-option label="全部" value=""></el-option>
                           <el-option
                            v-for="(item, index) in specialColumnList"
                            :key="index"
                            :label="item.specialColumn"
                            :value="item.id"
                           ></el-option>
                       </el-select>
                   </el-form-item>
               </el-form>
           </div>
       </div>
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
            searchForm: {
                status: '',
                specialColumn: '',
                dateStart: '',
                queryKey: ''
            },
            statusList: [
                { label: '待处理', value: 1 },
                { label: '已驳回', value: 2 },
                { label: '已通过', value: 3 }
            ],
            specialColumnList: []
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.handleGetSpecialColumnList();
    },
    methods: {
        handleGetSpecialColumnList() {
            this.$axios.get('/article/api/get/special_column').then(res=>{
                console.log(res)
            })
        }
    },
    created() {

    }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>