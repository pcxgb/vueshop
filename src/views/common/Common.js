export default {
  data() {
    return {
      keywords: '',
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      isshow: false,
      dataList: [],
      total: 0,
      addGoods: {
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: {},
        attrs: [],
      }

    }
  },
  watch: {
    params: {
      deep: true,
      handler(newName, oldName) {
        this.getdata();
      }
    },
    dataList: {
      deep: true,
      handler(newName, oldName) {
        this.getdata()
      }
    }
  },
  methods: {
    formatDate(value) {
      let date = new Date(value);
      //注意对方给你的是毫秒还是秒，如果是毫秒需要转秒（*1000）
      let y = date.getFullYear();
      // console.log(y);
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;

      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    serach() {
      this.params.query = this.keywords;
    },
    sizechange(val) {
      this.params.pagesize = val;
    },
    currentchange(val) {
      this.params.pagenum = val;
    },
  },
}