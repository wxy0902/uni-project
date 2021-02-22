import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import goHome from './components/go-home/go-home.vue'

Vue.use(uView);

Vue.config.productionTip = false

Vue.component('goHome',goHome)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
