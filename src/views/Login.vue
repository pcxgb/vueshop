<template>
  <div class="login">
    <div class="box">
      <img src="../assets/logo.png" width="130">
      <!--  -->
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!--  -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const {data:res} = await this.axios.post("/login", this.form);
          if (res.meta.status != 200) return this.$message.error('登入失败,用户名或密码错误')
          sessionStorage.setItem('token',res.data.token)
          this.$router.push('/')
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>
<style lang="less">
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    height: 300px;
    width: 300px;
    border: 1px solid red;
    position: relative;
    img {
      border: 5px solid red;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      padding: 5px;
      box-shadow: 3px 3px 3px 3px red;
    }
    .demo-ruleForm {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
