<!-- 主lauout -->
<template>
   <div class='wrap'>
       <div class="header">
           <NavMenu></NavMenu>
       </div>
       <div class="body-cont">
           <div class="nav">
                <navBar />
            </div>
            <div class="container">
                <div class="main-cont">
                    <AppMain></AppMain>
                </div>
                <div class="footer-cont">
                <!-- <footer-bottom /> -->
                </div>
            </div>
           
       </div>
   </div>
</template>

<script>
import AppMain from './component/appMain.vue';
import NavMenu from './component/NavMenu';
import NavBar from './component/LeftMenu';

export default {
    components: {
        AppMain,
        NavMenu,
        NavBar
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
html,body{
    height: 100%;

}

#app{
    height: 100%;
}

#app .wrap{
    height: 100%
}
.body-cont .nav{
    float: left;
    width: 200px;
    height: 100%;
    overflow: hidden;
    background-color: #f0f0f0;
}

.body-cont {
    height: calc(100% - 70px);
}

.body-cont .container{
    float: left;
    height: 100%;
    width: calc(100% - 200px);
}
</style>