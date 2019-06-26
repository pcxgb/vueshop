export default {
  data() {
    return {
      stepNum: '0',
      catList: [],
      temcat: '',
      goods_attr: [],
      goods_prams: [],
      rules: {
        goodsname: {required: true, message: '请输入商品名称', trigger: 'blur'},
        goodsprice: {required: true, message: '请输入商品价格', trigger: 'blur'},
        goodsweight: {required: true, message: '请输入商品重量', trigger: 'blur'},
        goodsnumber: {required: true, message: '请输入商品数量', trigger: 'blur'},
      }
    }

  },
  created() {
    this.getdata()
    this.getcatList()
  },
  methods: {
    gogo() {
      //Todo 验证是否勾选 分类 和验证输入规则
      console.log(this.catList)
    },
    async getcatList() {
      let {data: res} = await this.axios.get('/categories')
      if (res.meta.status != 200) return this.$message.error('获取商品列表失败')
      this.catList = res.data
    },
    before_leave(activeName, oldActiveName) {
      if (oldActiveName == 0 && this.temcat.length == 0) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    /**
     * 选择分类 获取属性和参数
     * @param res array
     */
    async handleChange(res) {
      this.temcat = res
      let {data: req} = await this.axios.get(`categories/${res[res.length - 1]}/attributes`, {params: {sel: 'only'}})
      console.log(req)
      if (req.meta.status != 200) return this.$message.error('获取商品属性失败')
      this.goods_attr = req.data;
      let {data: rex} = await this.axios.get(`categories/${res[res.length - 1]}/attributes`, {params: {sel: 'many'}})
      if (rex.meta.status != 200) return this.$message.error('获取商品参数失败')
      this.goods_prams = rex.data
    },
    aaa(row) {
      let datetime = row.add_time * 1000;
      if (datetime) {
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + '-';
        let mon = datetime.getMonth() + 1 + '-';
        let d = datetime.getDate() + ' ';
        let h = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours() + ':'
        let m = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes() + ':'
        let s = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
        return y + mon + d + h + m + s
      }
    },
    async getdata() {
      let {
        data: res
      } = await this.axios.get('/goods', {
        params: this.params
      })
      if (res.meta.status != 200) return this.$message.error('获取商品列表失败')
      this.dataList = res.data.goods
      this.total = res.data.total;
    },
    show(data) {

    },
    del(data) {
      // console.log(data)
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = this.axios.delete(`/goods/${data.goods_id}`)
        if (res.meta.status != 200) return this.$message.error('删除错误 未知原因')
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}