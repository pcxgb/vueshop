<template>
  <div class="goods">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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

      <el-dialog  title="添加商品" :visible.sync="isshow" width="70%">
        <!-- 步骤条 -->
        <el-steps :active="+stepNum" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!-- 左侧导航 -->
        <el-tabs tab-position="left" v-model="stepNum" :before-leave="before_leave">
          <el-tab-pane label="基本信息" name="0">
            <!-- 表单 -->
            <el-form :model="addGoods" label-position="top" :rules="rules" ref="ruleForm">
              <el-form-item label="商品名称">
                <el-input v-model="addGoods.goods_name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格">
                <el-input v-model="addGoods.goods_price" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品重量">
                <el-input v-model="addGoods.goods_weight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品数量">
                <el-input v-model="addGoods.goods_number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" >
                <!-- <el-input v-model="addGoods.goods_cat" autocomplete="off"></el-input> -->
                  <el-cascader
                      :options="catList"
                      :props="{ expandTrigger: 'hover', label:'cat_name' , value:'cat_id' }"
                      @change="handleChange">
                  </el-cascader>
              </el-form-item>
              <el-form-item class="btn2">
                <el-button @click="isshow = !isshow">取消</el-button>
                <el-button type="primary" @click="gogo()">下一步</el-button>
              </el-form-item>

            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"></el-tab-pane>
          <el-tab-pane label="完成"></el-tab-pane>
        </el-tabs>
      </el-dialog>

      <!-- 修改用户 -->
      <!-- <el-dialog @closed="$refs.rules.resetFields()" title="修改用户" :visible.sync="eisshow">
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
      </el-dialog>-->
      <!-- 表格 -->
      <el-table :data="dataList" border>
        <el-table-column type="index" label="#" width="40"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="95"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70px"></el-table-column>
        <el-table-column prop="add_time" :formatter="aaa" label="创建时间" width="140px">

          <!-- <template slot-scope="scope" v-if="!">
            {{scope.row.add_time | formatDate}}
          </template> -->
        </el-table-column>

        <el-table-column prop="name" label="操作" width="130">
          <template slot-scope="ccc">
            <el-button type="primary" icon="el-icon-edit" @click="show(ccc.row)" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="del(ccc.row)" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
          @size-change="sizechange"
          @current-change="currentchange"
          :current-page="params.pagenum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="params.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import Goods from "./Goods.js";
  import Common from "../common/Common.js";

  export default {
    mixins: [Goods, Common]
  };
</script>

<style lang="less">
  .goods{
    .btn2{
      display: flex;
      justify-content: flex-end;
    }
    .el-form-item{
      margin: 0;
    }
  }
</style>
