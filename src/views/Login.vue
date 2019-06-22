<template>
  <div class="login">
    <div class="box">
      <div class="img-box">
        <img src="../assets/logo.png" width="130">
      </div>
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
          <el-input
            type="password"
            v-model="form.password"
            @keydown.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>

        <el-form-item class='aaaa'>
          <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
          <el-button @click="resetForm('ruleForm')" style="background-color:#909399;color:#fff">重置</el-button>
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
          const { data: res } = await this.axios.post("/login", this.form);
          if (res.meta.status != 200)
            return this.$message.error("登入失败,用户名或密码错误");
          sessionStorage.setItem("token", res.data.token);
          this.$router.push("/");
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
  background: #2b4b6b;
  .box {
    height: 300px;
    width: 450px;
    border: 1px solid #fff;
    position: relative;
    border-radius: 5px;
    box-sizing: border-box;
    background: #fff;
    .img-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      background-color: #fff;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
    .demo-ruleForm {
      position: absolute;
      bottom: 0;
    }
    .el-form{
      width: 100%;
      box-sizing: border-box;
      padding: 0 20px;
      .aaaa{
        float: right;
      }
    }
  }
}
</style>
