import { KeywordModal } from "../../models/keyword.js";
import { BookModal } from "../../models/book.js";
import { paginationBev } from "../behaviors/pagination.js";

const keywordModal = new KeywordModal();
const bookModal = new BookModal();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore' // 自定义函数
    }
  },

  attached() {
    const historyWords = keywordModal.getHistory();

    keywordModal.getHot()
      .then(res => {
        this.setData({hotWords: res.hot})
      })
    this.setData({
      historyWords
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if(!this.data.q) return;
      if(this.data.loading) return;

      if(this.hasMore()) {
        this.setData({ loading: true });

        bookModal.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books);
          this.setData({
            loading: false,
          })
        },() => {
          this.setData({
            loading: false,
          })
        })
      }
    },

    onConfirm(e) {
      const word = e.detail.value || e.detail.text;

      this.setData({ 
        searching: true,
        loadingCenter: true,
      });
    
      bookModal.search(0, word)
        .then(res => {
          this.setMoreData(res.books); // behavior中的方法
          this.setTotal(res.total);

          this.setData({
            q: word,
            loadingCenter: false,
          });
          keywordModal.addToHistory(word);
        })
    },

    onCancel(e) {
      this.initialize(); // 清除上一次数据源
      this.triggerEvent('cancel');
    },

    // 点击input后的 clear图片
    onDelete(e) {
      this.initialize(); // 清除上一次数据源
      this.setData({
        searching: false,
        q: ''
      })
    },
  }
})
