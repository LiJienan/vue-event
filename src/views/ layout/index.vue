<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img :src="user_pic" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"><i class="el-icon-s-operation"></i>基本资料</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-camera"></i>更换头像</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-key"></i>重置密码</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"  @click="quickFn"><i class="el-icon-switch-button"></i>退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic">
          <img src="../../assets/images/head.png" alt="" v-else>
          <span>欢迎{{nickname||username}}</span>
        </div>

            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#23262E"
              text-color="#fff"
              active-text-color="#409EFF"
              unique-opened
              router
            >
              <template v-for="item in menus" >
              <el-menu-item  :index="item.indexPath" :key="item.indexPath" v-if="!item.children">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </el-menu-item>
              <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                  <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key=subItem.indexPath>
                    <i :class="subItem.icon"></i>
                    <span>{{subItem.title}}</span>
                  </el-menu-item>
              </el-submenu>
              </template>
            </el-menu>

      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
/*
* 经验:在组件标签上绑定的所有事件(包括原生事件的名字click,input等)
* 都是自定义事件,都需要组件内用$emit来触发才行
* 万一组件内不支持这个原生事件的名字
* 解决:
* 使用@事件名.native="methods里方法名"
* .native给组件内根标签,绑定原生的事件
*  */
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'

export default {
  name: 'my-layout',
  data () {
    return {
      menus: []
    }
  },
  async created () {
    const { data: res } = await getMenusListAPI()
    // console.log(res)
    this.menus = res.data
  },
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    quickFn () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户选择确定后,清除vuex中的token和用户信息,然后跳转到登录页面
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.replace('/login')
      }).catch(() => {
      })
    },
    // 左侧菜单栏的方法
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #F2F2F2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
