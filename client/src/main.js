import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

export const eventBus = new Vue();

import GoodBrain from './services/GoodBrain.js'    //! AI
Vue.use(GoodBrain)                              //! AI

new Vue({
  render: h => h(App),
}).$mount('#app')
