<template>
    <div>{{a}}------{{b}}<Button/></div>
</template>

<script>
import { Button } from 'vant';

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
    },
    components: {
        [Button.name]: Button
    }
}
</script>

<style lang="less" scoped>

    body {
        div {
            background: greenyellow no-repeat left top;
            // background-image: url(./public/img/sprite.src-img1.png);
            background-size: 10% 10%;
            transform: translateX(30px)
        }
    }
</style>