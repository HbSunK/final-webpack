console.log('index')

import Vue from 'vue';
import vuex from 'vuex';
import router from 'vue-router';

Vue.use(vuex)
Vue.use(router)
const myVue = new Vue();

console.log(myVue)

console.log('=========')

setTimeout(() => {
    // 模块异步加载
    console.log(import('./plulic/js/test'))
}, 2000)

require('./plulic/css/login.less')

const a = new Promise(resolve => resolve(1)).then(res => console.log('proimse ' + res))
class S {
    constructor (config) {
        this.config = config
    }

    log() {
        console.log(this.config)
    }
}

const testFn = (num) => {
    console.log(num)
}

let sun = new S(a)
sun.log()

testFn(999)