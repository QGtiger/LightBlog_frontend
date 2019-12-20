<!-- 用户管理页面 -->
<template>
   <div class='author-list-cont'>
       <Title title="用户管理"></Title>
   </div>
</template>

<script>
import Title from '@/components/title/title';
export default {
    components: {Title},
    data() {
        return {
            status: '', // '' 为全部， 1为admin 0为普通用户
            userName: '', //用户名
            dateJoined: '', // 加入时间
            currentPage: 1,
            size: 10,
            total: 0
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
                this.$qs.stringify({
                    status: this.status,
                    userName: this.userName,
                    dateJoined: this.dateJoined
                })
            ).then(res=>{
                if(res){
                    console.log(res)
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

</style>