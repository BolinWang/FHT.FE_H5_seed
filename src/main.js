/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-08-17 14:44:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-08-31 10:28:05
 */

import Vue from 'vue'
import router from './router'
import App from './App'
import 'lib-flexible/flexible'
import 'normalize.css/normalize.css'
import FastClick from 'fastclick'
import { Toast } from 'vant'
// development引用vconsole
// eslint-disable-next-line
process.env.NODE_ENV !== 'production' && require('@/utils/vconsole').default

FastClick.attach(document.body)
Vue.config.productionTip = false

const vm = new Vue({
  el: '#app-box',
  router,
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

Vue.prototype.$toast = Toast

router.beforeEach((to, from, next) => {

})

/**
 * 百度统计
 */
router.afterEach((to, from, next) => {
  setTimeout(() => {
    // eslint-disable-next-line
    let _hmt = _hmt || [];
    (function () {
      document.getElementById('fht_baidu_tj') &&
        document.getElementById('fht_baidu_tj').remove()
      let hm = document.createElement('script')
      hm.src = ''
      hm.id = 'fht_baidu_tj'
      let s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }, 0)
})
