<template>
    <div>{{a}}------{{b}}
        <img src="./plulic/img/sprite.src-img1.png">
    </div>
</template>

<script>
const {fn} = require('./utils/comm')
export default {
    name: 'App',
    data() {
        return {
            a: 1,
            b: 2
        }
    },
    created() {
        console.log('vue data ======>')
        console.log(this.$data)
        fn()
    }
}
</script>

<style lang="less" scoped>
@import url('./plulic/css/vue.css');
    body {
        div {
            background: greenyellow no-repeat left top;
            // background-image: url(./public/img/sprite.src-img1.png);
            background-size: 10% 10%;
            transform: translateX(30px)
        }
    }
</style>