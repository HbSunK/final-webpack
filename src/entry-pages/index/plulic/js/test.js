import Vue from 'vue'

const vm = new Vue({
    data: {
        myData: 'test data'
    }
})

console.log(vm.$data)

new Promise(resolve => resolve(2)).then(res => console.log('proimse ' + res))

export default vm