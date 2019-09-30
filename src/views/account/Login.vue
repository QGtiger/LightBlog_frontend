<!-- 用户登录 -->
<template>
   <div class='login'>
        <transition name="el-fade-in-linear">
            <LoginForm></LoginForm>
        </transition>
   </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'
export default {
    components: {LoginForm},
    data() {
        return {
            
        };
    },
    computed: {},
    watch: {},
    mounted() {
        document.querySelector('body').setAttribute('id', 'background');
    },
    methods: {

    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style scoped>

.login{
    text-align: center;
    margin-top: 200px;
}

</style>