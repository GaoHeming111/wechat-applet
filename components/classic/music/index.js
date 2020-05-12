import { classicBeh } from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached: function (e) {
    // 跳转页面时恢复播放状态
    this._recoverStatus();

    // 点击微信提供的播放器时
    this._monitorSwitch();
  },

  detached: function(e) {
    // mMgr.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      // 切换图片 音乐播放/暂停
      if(!this.data.playing) {
        this.setData({ playing: true });

        mMgr.src = this.properties.src;
        mMgr.title = this.properties.src;
      } else {
        this.setData({ playing: false });
        mMgr.pause();
      }
    },

    // 点击左右箭头切换时，恢复音乐的播放状态
    _recoverStatus: function() {
      // 是暂停状态，图标应该显示成待播放
      if(mMgr.paused) {
        this.setData({playing: false});

        return;
      }
      if(mMgr.src === this.properties.src) {
        this.setData({ playing: true});
      }
    },

    // 点击微信播放器的 开关
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      })
      mMgr.onPause(() => {
        this._recoverStatus();
      })
      mMgr.onStop(() => {
        this._recoverStatus();
      })
      // onEnded音乐自然播放完成
      mMgr.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
