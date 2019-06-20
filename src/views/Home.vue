<template>
  <el-container class="home">
    <el-header>
      <div class="left">
        <img src="../assets/logo.png" alt width="50">
        商品后台管理系统
      </div>
      <div class="right">
        <el-button type="danger">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.home {
  height: 100%;
  .el-header {
    background: #1e1f1c;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left img {
      vertical-align: middle;
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
