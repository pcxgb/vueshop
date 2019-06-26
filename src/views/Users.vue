<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="keywords" clearable @keyup.enter.native="serach()">
            <el-button slot="append" @click="serach()" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="isshow = !isshow">添加新用户</el-button>
        </el-col>
      </el-row>
      <!-- 添加新用户 -->

      <el-dialog @closed="$refs.ruleForm.resetFields()" title="添加新用户" :visible.sync="isshow">
        <el-form
          :model="adduser"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="adduser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="adduser.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="adduser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="adduser.mobile"></el-input>
          </el-form-item>

          <el-form-item class="btn2">
            <el-button @click="isshow = !isshow">取消</el-button>
            <el-button type="primary" @click="add()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 修改用户 -->
      <el-dialog @closed="$refs.rules.resetFields()" title="修改用户" :visible.sync="eisshow">
        <el-form
          :model="edituser"
          :rules="rules"
          ref="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="edituser.username" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="edituser.password"></el-input>
          </el-form-item> -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="edituser.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="edituser.mobile"></el-input>
          </el-form-item>
          <input type="text" prop="id" v-model="edituser.id">

          <el-form-item class="btn2">
            <el-button @click="eisshow = !eisshow">取消</el-button>
            <el-button type="primary" @click="edit()">修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 表格 -->
      <el-table :data="tabledata" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>

        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="cc">
            <el-switch
              v-model="cc.row.mg_state"
              active-color="#66b1ff"
              @change="change($event,cc.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template slot-scope="ccc">
            <el-button type="primary" icon="el-icon-edit" @click="show(ccc.row)" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(ccc.row)" size="mini"></el-button>
            <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
              <el-button type="warning" icon="el-icon-s-tools" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizechange"
        @current-change="currentchange"
        :current-page="params.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import User from "./User.js";

export default {
  mixins: [User]
};
</script>


<style lang="less">
.user {
  .el-table {
    margin: 15px 0;
  }
  
    .btn2 {
      display: flex;
      justify-content: flex-end;
    }
  
}
</style>
