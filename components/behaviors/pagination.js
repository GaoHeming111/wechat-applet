const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
  },

  methods: {
    setMoreData(dataArray) {
      this.setData({
        dataArray: [...this.data.dataArray, ...dataArray]
      })
    },

    // 获取起始的 开始数字
    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.setData({total});
      if (total === 0) this.setData({ noneResult: true });
    },

    // 是否还有更多数据需要加载
    hasMore() {
      if(this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },

    // 点击取消或者叉号时 清楚上一次展示的数据
    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
      })
    }
  }
})

export { paginationBev };