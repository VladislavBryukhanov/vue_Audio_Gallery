import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:1232';

Vue.http.interceptors.push((request, next) => {
  request.headers.set('authorization', localStorage.getItem('authorization'));
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
