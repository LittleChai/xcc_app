<template id='xcc_topside'>
    <div class="top_side">

        <div v-if="!bol" class="side_avatar">
            <img  src="../../static/images/default_avatar.png" alt="">
        </div>

        <div v-if="bol" class="side_avatar">
            <img  :src="FuserInfo.ext_info.yesapi_avatar == '' ? require('../../static/images/default_avatar.png') :  FuserInfo.ext_info.yesapi_avatar" alt="">
        </div>

    </div>
</template>

<script>
export default {
    name: 'xcc_topside',
    data() {
        return {
            FuserInfo: {},
            bol: false
        }
    },
    props: ['userInfo'],
    methods: {
      getUserInfo() {
        this.FuserInfo = this.userInfo;
      },
    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },
    mounted() {
        // this.getUserInfo();
    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {
        
    },
    watch: {
      userInfo(oldVal,newVal) {
          this.FuserInfo = oldVal;
          this.bol = true;
      }
    }

}
</script>

<style lang="scss" scoped>
    .top_side {
        width: 220px;
        height: 250px;

        .side_avatar {
            width: 110px;
            height: 110px;
            margin: 20px auto 5px auto;
            // background-color: white;
            border-radius: 50%;
            // overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>