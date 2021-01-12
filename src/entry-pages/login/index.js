require('./public/css/index.scss')

import Vue from 'vue';
import vuex from 'vuex';
import router from 'vue-router';
import App from './index.vue'

const myVue = new Vue({
    render () {
        return <App />
    }
}).$mount('#app');