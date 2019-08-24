<template id='xcc_header'>
    
    <div class="header">
        <div class="left_header"></div>
        <div class="right_header">
            <div class="right_header_li">
            </div>

            <div class="right_header_li">
            </div>

            <div class="right_header_li">
            </div>

            <div class="right_header_li">
                <span>xxxxx</span>
                <Icon type="md-exit" />
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'xcc_header',
    data() {
        return {

        }
    },
    methods: {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

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

<style lang="scss" scoped>
    .header {
        width: 100%;
        min-width: 1050px;
        height: 55px;
        background-color: #827ce2;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        box-shadow: 0 3px 5px rgba(0,0,0,0.2);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        
        .left_header {
            width: 250px;
            height: 100%;
        }    

        .right_header {
            width: auto;
            height: 100%;
            flex-flow: row nowrap;
            // justify-content: space-between;
            
            .right_header_li {
                width: 50px;
                height: 100%;
                display: inline-block;
            }

            .right_header_logout {
                width: auto;
                height: 100%;
                color: white;
                display: inline-block;
            }
        }
    }
</style>