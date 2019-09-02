import Vue from 'vue'
import App from './views/admin/App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
