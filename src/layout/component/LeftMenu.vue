<template>
  <div class="navbar-cont">
    <!-- :default-active="activeIndex" -->
    <el-menu unique-opened :default-active="activeIndex">
      <div v-for="(item, index) in menuList" :key="'menu'+index">
        <div v-if="item.subs && item.subs.length > 0">
          <el-submenu :index="item.key">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <div v-for="(menu, index) in item.subs" :key="'submenu'+index">
              <router-link :to="menu.key">
                <el-menu-item :index="menu.key">
                  <i class="iconfont" :class="menu.icon"></i>
                  {{ menu.title }}
                </el-menu-item>
              </router-link>
            </div>
          </el-submenu>
        </div>
        <router-link v-else :to="item.key">
          <el-menu-item :index="item.key">
            <i class="iconfont" :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </router-link>
      </div>
    </el-menu>

    <!-- <el-menu
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
    </el-menu>-->
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      defaultOpeneds: [],
      activeIndex: '',
      isAdmin: this.$store.state.isAdmin,
      menuList: []
      // menuList: [
      //   {
      //     title: '用户管理',
      //     icon: 'iconsale-',
      //     key: '/lblogauthor',
      //     subs: [
      //       {
      //         title: '用户列表',
      //         icon: 'iconuser-',
      //         key: '/lblogauthor/list',
      //         subs: []
      //       }
      //     ]
      //   },
      //   {
      //     title: '审核管理',
      //     icon: 'iconbank',
      //     key: '/manage',
      //     subs: [
      //       {
      //         title: '文章审核',
      //         icon: 'iconbrowser-',
      //         key: '/manage/examine',
      //         subs: []
      //       },
      //       {
      //         title: '审核模版',
      //         icon: 'iconbookmark',
      //         key: '/manage/template',
      //         subs: []
      //       }
      //     ]
      //   },
      //   {
      //     title: '文章管理',
      //     icon: 'iconad-',
      //     key: '/specialcolumn',
      //     subs: [
      //       {
      //         title: '专栏管理',
      //         icon: 'iconcalc-',
      //         key: '/specialcolumn/index',
      //         subs: []
      //       },
      //       {
      //         title: '专题管理',
      //         icon: 'iconbrowser-',
      //         key: '/specialtheme/index',
      //         subs: []
      //       }
      //     ]
      //   },
      //   {
      //     title: '检举管理',
      //     icon: 'iconjubao1',
      //     key: '/report',
      //     subs: [
      //       {
      //         title: '检举配置',
      //         icon: 'iconcalendar-',
      //         key: '/report/type',
      //         subs: []
      //       },
      //       {
      //         title: '文章检举',
      //         icon: 'iconcalendar-1',
      //         key: '/report/blog',
      //         subs: []
      //       },
      //       {
      //         title: '评论检举',
      //         icon: 'iconcart-1',
      //         key: '/report/comment',
      //         subs: []
      //       }
      //     ]
      //   },
      //   {
      //     title: 'Banner 管理',
      //     key: '/banner/index',
      //     icon: 'iconpicture',
      //     subs: []
      //   },
      //   {
      //     title: '个人栏目管理',
      //     key: '/personalcolumn/index',
      //     icon: 'iconfeed-',
      //     subs: []
      //   },
      //   {
      //     title: '文章列表',
      //     icon: 'iconyulan5',
      //     subs: [],
      //     key: '/article/index'
      //   },
      //   {
      //     title: '收藏夹管理',
      //     icon: 'iconbookmark',
      //     key: '/article/collection',
      //     subs: []
      //   },
      //   {
      //     title: '文章发布',
      //     icon: 'iconpaper-plane',
      //     key: '/article/add',
      //     subs: []
      //   }
      // ]
    }
  },
  mounted() {
    this.activeIndex = this.$route.path
    //console.log(this.$router.history)
    this.handleGetMenuList()
  },
  computed: {},
  methods: {
    handleGetMenuList() {
      this.$axios.get('/account/islogin').then(res => {
        if (res.data.success) {
          this.menuList = res.data.menu_list
        }
      })
    }
  }
}
</script>

<style>
.el-menu-vertical.el-menu {
  background-color: transparent !important;
  border-right: none !important;
}
.el-menu {
  background-color: transparent !important;
}
</style>
