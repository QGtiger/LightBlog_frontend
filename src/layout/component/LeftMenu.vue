<template>
  <div class="navbar-cont">
       <!-- :default-active="activeIndex" -->
    <el-menu
      class="el-menu-vertical"
      >
      <el-submenu index="4" v-if="isAdmin">
        <template slot="title">
          <i class="iconfont">&#xe856;</i>
          <span>用户管理</span>
        </template>
          <router-link to="/lblogauthor/list">
            <el-menu-item><i class="iconfont">&#xe85b;</i> 用户列表</el-menu-item>
          </router-link>
          <router-link to="/manage/template">
            <el-menu-item><i class="el-icon-edit"></i> 回复模板</el-menu-item>
          </router-link>
      </el-submenu>
      <el-submenu index="1" v-if="isAdmin">
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
      <el-submenu index="2" v-if="isAdmin">
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
      <el-submenu index="3" v-if="isAdmin">
        <template slot="title">
          <i class="iconfont">&#xe656;</i>
          <span> 举报管理</span>
        </template>
          <router-link to="/report/type">
            <el-menu-item><i class="iconfont">&#xe846;</i> 举报配置</el-menu-item>
          </router-link>
          <router-link to="/report/blog">
            <el-menu-item><i class="iconfont">&#xe846;</i> 文章检举</el-menu-item>
          </router-link>
          <router-link to="/report/comment">
            <el-menu-item><i class="iconfont">&#xe609;</i> 评论检举</el-menu-item>
          </router-link>          
      </el-submenu>
      <router-link to="/banner/index" v-if="isAdmin">
        <el-menu-item>
          <i class="el-icon-tickets"></i>
          <span slot="title"> 走马灯管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/personalcolumn/index">
        <el-menu-item>
          <i class="el-icon-tickets"></i>
          <span slot="title"> 个人栏目管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/article/index">
        <el-menu-item>
          <i class="el-icon-date"></i>
          <span slot="title"> 文章列表</span>
        </el-menu-item> 
      </router-link>   
      <el-menu-item>
        <i class="el-icon-upload"></i>
        <span slot="title"> 文章发布</span>
      </el-menu-item>    
      <router-link to="/article/collection">
        <el-menu-item>
        <i class="el-icon-s-management"></i>
        <span slot="title">收藏夹管理</span>
      </el-menu-item>   
        </router-link>     
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      defaultOpeneds: [],
      activeIndex: "",
      isAdmin: this.$store.state.isAdmin,
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
