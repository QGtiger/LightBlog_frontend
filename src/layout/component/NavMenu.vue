<!-- 导航栏 -->
<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/index">博客首页</router-link>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <router-link to="/about">聊天室</router-link>
      </el-menu-item>-->
      <el-submenu
        class="username-cont"
        index="3"
        style="float: right;width: 150px;padding-right: 20px"
      >
        <template slot="title">
          <el-avatar :src="this.$store.state.avatorUrl"></el-avatar>
          <span class="username">&nbsp;&nbsp; {{this.$store.state.username}}</span>
        </template>
        <router-link to="/author/detail">
          <el-menu-item index="3-1">
            <i class="el-icon-menu"></i>个人信息
          </el-menu-item>
        </router-link>
        <router-link to="/author/edit">
          <el-menu-item index="3-2">完善信息</el-menu-item>
        </router-link>
        <el-menu-item index="3-3">修改密码</el-menu-item>
        <router-link to="/manage/index">
          <el-menu-item index="3-4">后台管理</el-menu-item>
        </router-link>

        <el-menu-item index="3-5" @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { islogin } from '@/api/user'
import Cookie from 'js-cookie'
export default {
  name: 'NavMenu',
  components: {},
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleGetUserName()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleGetUserName() {
      islogin().then(res => {
        if (res) {
          this.$store.commit('setUserName', res.data.username)
          this.$store.commit('setAvatorUrl', res.data.avator)
          this.$store.commit('setIsAdmin', res.data.isAdmin)
          Cookie.set('userName', res.data.username)
        }
      })
    },
    handleLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  created() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less'>
//@import url(); 引入公共css类
// .el-menu.el-menu--horizontal {
//     border-bottom: none !important;
//     background: transparent;
// }

// .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
//     background-color: transparent !important;
// }

.username-cont {
  padding-right: 60px;
  width: '';
}

a {
  text-decoration: none;
}

.header {
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
}
</style>