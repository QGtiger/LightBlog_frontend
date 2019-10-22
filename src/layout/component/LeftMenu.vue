<template>
  <div class="navbar-cont">
       <!-- :default-active="activeIndex" -->
    <el-menu
      class="el-menu-vertical"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont">&#xe856;</i>
          <span>审核管理</span>
        </template>
          <router-link to="/manage/examine">
            <el-menu-item><i class="el-icon-edit"></i> 文章审核</el-menu-item>
          </router-link>
          <router-link to="/manage/template">
            <el-menu-item><i class="el-icon-edit"></i>回复模板</el-menu-item>
          </router-link>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont">&#xe830;</i>
          <span>文章管理</span>
        </template>
          <router-link to="/specialcolumn/index">
            <el-menu-item><i class="iconfont">&#xe846;</i> 专栏管理</el-menu-item>
          </router-link>
          <router-link to="/specialtheme/index">
            <el-menu-item><i class="iconfont">&#xe834;</i> 专题管理</el-menu-item>
          </router-link>          
      </el-submenu>      
      <router-link to="/personalcolumn/index">
        <el-menu-item>
          <i class="el-icon-tickets"></i>
          <span slot="title">个人栏目管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/article/index">
        <el-menu-item>
          <i class="el-icon-date"></i>
          <span slot="title">文章列表</span>
        </el-menu-item> 
      </router-link>   
      <el-menu-item>
        <i class="el-icon-upload"></i>
        <span slot="title">文章发布</span>
      </el-menu-item>        
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      defaultOpeneds: [],
      activeIndex: ""
    };
  },
  mounted() {
    this.activeIndex = this.$router.history.current.meta.index;
  },
  computed: {},
  methods: {}
};
</script>

<style>
.el-menu-vertical.el-menu{
    background-color: transparent !important;
    border-right: none !important;
}

</style>
