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

let userAgent = navigator.userAgent

export default {
  name: 'activePage',
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    let getUserDataFromLoacal = getUserData() || {}
    // APP内
    if (getUserDataFromLoacal.v && getUserDataFromLoacal.platform) {
      // 未登录
      if (!getUserDataFromLoacal.sessionId) {
         // 未登录调用登录方法
        let bridgeParam = {
          libCode: 5001,
          refresh: true
        }
        if (userAgent.includes('fht-android')) {
          window.SetupJsCommunication.jumpToNativePages(JSON.stringify(bridgeParam))
        } else if (userAgent.includes('fht-ios')) {
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
      if (userAgent.includes('fht-ios')) {
        Bridge.callHandler('getParamsFromNative', {}, function responseCallback (responseData) {
          console.log(responseData)
        })
      } else if (userAgent.includes('fht-android')) {
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
      Bridge.registerHandler('initPageInfo', (data, responseCallback) => {
        responseCallback(initPageInfo)
      })
      Bridge.registerHandler('refreshPage', (data, responseCallback) => {
        window.location.href = window.location.href
      })
      if (navigator.userAgent.includes('fht-android')) {
        // eslint-disable-next-line
        SetupJsCommunication.initPageInfo(
          JSON.stringify(initPageInfo)
        )
      }
    }
  }
}
</script>

<style>

</style>
