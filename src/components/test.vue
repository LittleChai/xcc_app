<template id='test'>
    <div class="test">
        <button v-on:click="changeChild">改变数据</button>
        <div>从子组件传过来的值是: {{childData1}}</div>
        <button @click="changeROuter">切换路由</button>

        <button @click="$store.commit('getText1')">获得数据: </button>  
        <span>text1: {{text1}} </span>

        <chart :childData='childData' class="echarts" @toFatherFn='getToFatherData'></chart>
    </div>
</template>>

<script>

import chart from './chart.vue';

export default {
    name: 'test',
    components: {
        chart
    },
    data() {
        return {
            // childData: [80,60,30,12,57,39]
            childData: [5,20,36,10,10,20],
            childData1: '',
            text1: ''
        }
    },
    methods: {
        getStore() {
            // console.log(this.$store.getText1())
        },

        changeROuter() {
            this.$router.push({
                path: '/login',
                query: {
                    id: 'login',
                    text: '我是参数'
                }
            })
        },
        getToFatherData(val1) {
            console.log(val1);
            this.childData1 = val1;
        },
        changeChild() {
            console.log(11)
            this.childData = [80,60,30,12,57,39]
        }
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
        console.log(this.$route.params.id)
    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    }
}
</script>


<style scoped>
    .test {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgb(222, 222, 222);
        overflow-y: auto;
    }

    .echarts {
        position: absolute;
        width: 600px;
        height: auto;
        right: 0;
        top: 20px;
    }
</style>