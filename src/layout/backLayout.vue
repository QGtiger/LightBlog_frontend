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
    border-right: solid 1px #e6e6e6;
}

.body-cont {
    height: calc(100% - 70px);
}

.body-cont .container{
    float: left;
    height: 100%;
    width: calc(100% - 201px);
}

.main-cont{
    padding: 0 30px;
}

// .table {
//   margin-top: 20px;
// }
// .table .el-table {
//   color: #151515;
// }
// .table .el-table thead {
//   color: #000;
// }
// .table .el-table thead tr,
// .table .el-table thead tr th {
//   background-color: #f0f0f0;
// }
// .table .el-table th,
// .table .el-table td {
//   padding: 13px 0;
// }
.table .update {
  color: #0066cc;
  cursor: pointer;
  margin-right: 5px;
}
.table .up {
  color: #079c00;
  cursor: pointer;
  margin-right: 5px;
}
.table .down {
  cursor: pointer;
  margin-right: 5px;
}
.table .del {
  color: #bf0000;
  cursor: pointer;
  margin-right: 5px;
}
.el-pagination {
  text-align: right;
}
.el-pagination__total {
  float: left;
}
a {
  text-decoration: none;
  color: #0066cc;
  cursor: pointer;
}
</style>