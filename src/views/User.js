export default {
  watch: {
    params: {
      deep: true,
      handler(newName, oldName) {
        this.getdata();
      }
    }
  },
  data() {
    let ok = async (rule, value, callback) => {
      let temp = this.params
      temp.query = value
      let tem = temp.pagesize
      temp.pagesize = 100
      let {
        data: res
      } = await this.axios.get('/users', {
        params: temp
      })
      let arr = res.data.users
      let req = arr.filter((item) => {
        return item.username === value
      })
      this.params.pagesize = tem
      this.params.query = ''

      // console.log(req)
      if (req.length) {

        callback(new Error('用户名已存在'));
      } else {
        // this.params.pagesize = tem
        callback();
      }
    };
    return {

      rules: {
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }, {
          validator: ok,
          trigger: 'blur'
        }],
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        email: [{
          required: true,
          message: '邮箱地址不能为空',
          trigger: ['blur', 'change']
        }, {
          type: 'email',
          message: '请输入正确的邮箱格式',
          trigger: ['blur', 'change']
        }],
        mobile: [{
          required: true,
          message: '手机号码不能为空',
          trigger: ['blur', 'change']
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
          trigger: ['blur', 'change']
        }],
      },
      adduser: {
        password: "",
        username: "",
        email: "",
        mobile: ""
      },
      edituser: {
        // password: "",
        username: "",
        email: "",
        mobile: "",
        id: ''
      },
      isshow: false,
      params: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      keywords: "",
      total: 0,
      tabledata: [],
      eisshow: false
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    show(data) {
      console.log(data)
      this.eisshow = !this.eisshow

      this.edituser.username = data.username
      this.edituser.email = data.email
      this.edituser.mobile = data.mobile
      this.edituser.id = data.id

    },
    async edit() {
      let dataform = {
        email: this.edituser.email,
        mobile: this.edituser.mobile
      }
      let {
        data: res
      } = await this.axios.put(`/users/${this.edituser.id}`, dataform)
      console.log(res)
      if (res.data.meta.status != 502) return this.$message.error('修改失败')
      this.eisshow = !this.eisshow
      this.getdata()
      return this.$message.success('修改成功')
    },
    del(data) {
      console.log(data)
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let {
          data: res
        } = await this.axios.delete(`/users/${data.id}`)
        if (res.meta.status == 200) {
          console.log(res)
          this.getdata()
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    add() {
      this.$refs.ruleForm.validate(async c => {
        if (c) {
          let {
            data: res
          } = await this.axios.post('/users', this.adduser)
          console.log(res)
          if (res.meta.status == 201) {
            this.$message.success('添加成功')
          }
          this.getdata();
          this.isshow = !this.isshow
        }
      })
    },
    serach() {
      this.params.query = this.keywords;
    },
    async change(e, data) {
      let {
        data: res
      } = await this.axios.put(`/users/${data.id}/state/${e}`);
      // console.log(res);
      if (res.meta.status != 200) {
        setTimeout(() => {
          data.mg_state = !e;
        }, 500);
      }
    },
    sizechange(val) {
      this.params.pagesize = val;
    },
    currentchange(val) {
      this.params.pagenum = val;
    },
    async getdata() {
      let {
        data: res
      } = await this.axios.get("/users", {
        params: this.params
      });
      // console.log(res);
      if (res.meta.status != 200) return console.log(res.meta.msg);
      this.tabledata = res.data.users;
      this.total = res.data.total;
    }
  }
}