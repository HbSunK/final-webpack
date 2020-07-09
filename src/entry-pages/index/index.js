console.log('index')

import Vue from 'vue';
import vuex from 'vuex';
import router from 'vue-router';
import App from './index.vue'

Vue.use(vuex)
Vue.use(router)
const myVue = new Vue({
    render () {
        return <App />
    }
}).$mount('#app');

console.log(myVue)

console.log('===========')

setTimeout(() => {
    // 模块异步加载
    console.log(import('./plulic/js/test'))
}, 2000)

require('./plulic/css/login.less')

const imgSrc = require('./plulic/img/sprite.src-img1.png').default
const imgTag = document.createElement('img')
imgTag.src = imgSrc
document.body.appendChild(imgTag)

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