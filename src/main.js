import Vue from 'vue'
import App from './App.vue'

import './plugins/vuetify'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)

import 'material-design-icons-iconfont/dist/material-design-icons.css'

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#cr_plugins')
