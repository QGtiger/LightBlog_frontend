<!-- 主lauout -->
<template>
   <div class='wrap'>
       <div class="header">
           <NavMenu></NavMenu>
       </div>
       <div class="body-cont">
           <AppMain></AppMain>
       </div>
   </div>
</template>

<script>
import AppMain from './component/appMain.vue';
import NavMenu from './component/NavMenu'

export default {
    components: {
        AppMain,
        NavMenu
    },
    data() {
    return {

    };
    },
    computed: {},
    watch: {},
    mounted() {
        document.querySelector('body').removeAttribute('id', 'background');
    },
    beforeDestroy() {
    },
    methods: {

    },
    created() {

    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
</style>