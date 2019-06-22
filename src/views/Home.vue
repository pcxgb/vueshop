<template>
  <el-container class="home">
    <el-header>
      <div class="left">
        <img src="../assets/logo.png" alt width="50">
        商品后台管理系统
      </div>
      <div class="right">
        <el-button @click="loginout" type="danger">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="show ? '66px':'200px'">
        <div class="one" @click="show =!show">
          <span>|||</span>
        </div>
        <!--  -->
        <el-menu
          :collapse-transition="false"
          :collapse="show"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#272822"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="'/'+item.path" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              v-for="(v, k) in item.children"
              :key="k"
              :index="'/'+v.path"
            >{{v.authName}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <!--  -->
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    loginout(){
      sessionStorage.removeItem('token')
      this.$router.push("/login")
    }
  },
  data() {
    return {
      show: false,
      menuList: []
    };
  },
  async created() {
    let { data: res } = await this.axios.get("/menus");
    // console.log(res);
    if (res.meta.status == 200) return (this.menuList = res.data);
    return this.$message.error("获取菜单列表失败,错误代码:" + res.meta.status);
  }
};
</script>
<style lang="less">
.home {
  height: 100%;
  .el-header {
    background: #1e1f1c;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      user-select: none;
    }
    .left img {
      vertical-align: middle;
    }
  }
  .el-aside {
    .el-menu {
      border: none;
      .one {
        text-align: center;
      }
    }
  }
  .el-container {
    height: 100%;
    .el-aside {
      background: #272822;
    }
  }
}
</style>
