<!-- 用户注册 -->
<template>
   <div class='register'>
       <RegisterForm></RegisterForm>
   </div>
</template>

<script>
import RegisterForm from '@/components/login/RegisterForm'
export default {
    components: {RegisterForm},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    mounted() {

    },
    methods: {

    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>

.register{
    text-align: center;
    margin-top: 200px;
}

</style>