import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import './element-variables.scss'


// Vue.config.productionTip = false
Vue.use(ElementUI);



var vm = new Vue({
    render: h => h(App),
}).$mount('#app')


