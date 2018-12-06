import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = 'https://127.0.0.1:1337';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
