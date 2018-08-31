<template>
  <div class="page_container">
    活动
  </div>
</template>

<script>
import { getWxShareInfo } from '@/utils/wxshare'
import { getUserData } from '@/utils/auth'
import Bridge from '@/utils/bridge'

const initPageInfo = {
  title: '麦邻租房',
  shareData: {
    title: '麦邻生活',
    introduction: '麦邻生活',
    thumbnail: '',
    linkUrl: location.href
  }
}

let userAgent = navigator.userAgent.toLocaleLowerCase()

export default {
  name: 'activePage',
  components: {

  },
  data () {
    return {
      app_ios: false, // ios
      app_andriod: false, // andriod
      isAPP: false, // 是否APP内
      userInfo: {} // 存储用户信息
    }
  },
  created () {
    // 字符串查找不用includes  IOS8不兼容
    this.app_ios = userAgent.indexOf('fht-ios') > -1
    this.app_andriod = userAgent.indexOf('fht-android') > -1

    let getUserDataFromLoacal = getUserData() || {}
    this.isAPP = getUserDataFromLoacal.v && getUserDataFromLoacal.platform
    // APP内
    if (this.isAPP) {
      // 未登录
      if (!getUserDataFromLoacal.sessionId) {
        // 未登录调用登录方法
        let bridgeParam = {
          libCode: 5001,
          refresh: true
        }
        if (this.app_andriod === true) {
          window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
        } else if (this.app_ios === true) {
          Bridge.callHandler('jumpToNativePages', bridgeParam, function responseCallback (responseData) {
            window.location.href = window.location.href
          })
        } else {
          console.log('H5')
        }
      }
    // APP外
    } else {
      if (!getUserDataFromLoacal.sessionId) {
        this.$router.push('/login')
      }
    }
    this.initApp()
  },
  mounted () {
    this.$nextTick(function () {
      getWxShareInfo(initPageInfo.shareData)
    })
  },
  methods: {
    /**
     * 获取APP数据
     */
    getAppData () {
      if (this.app_ios === true) {
        Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
          console.log(responseData)
        })
      } else if (this.app_andriod === true) {
        // eslint-disable-next-line
        let getAndriodData = JSON.parse(window.SetupJsCommunication.getParamsFromNative())
        console.log(getAndriodData)
      } else {
        // h5
      }
    },
    /**
     * 注册IOS/Andriod方法，获取页面信息
     */
    initApp () {
      if (this.app_ios === true) {
        Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
          responseCallback(initPageInfo)
        })
        Bridge.registerHandler('refreshPage', (data, responseCallback) => {
          window.location.href = window.location.href
        })
      } else if (this.app_andriod === true) {
        // eslint-disable-next-line
        window.SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfo)
        )
      }
    }
  }
}
</script>

<style>

</style>
