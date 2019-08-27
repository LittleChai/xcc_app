<template>
  <div id="app">
    <transition :name="tName" class="tNames">
      <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      tName: 't_left'
    }
  },
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    if(!localStorage.getItem('token')) {
      this.$router.push({
        path: '/login'
      })
    }
    else {
        this.$router.push({
          path: '/index'
        })
      }
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
    $route(to, from) {
      // console.log(to,from)
      if(!localStorage.getItem('token')) {
        if(to.name != 'login') {
          this.$router.push({
            path: '/login'
          })
        }
      }


      if (to.meta.index > from.meta.index) {
        this.tName = "t_left";
      } else {
        this.tName = "t_right";
      }
    }
  }
};
</script>

<style lang="scss">
.tNames {
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
}

.ivu-poptip-confirm .ivu-poptip-body-message {
  color: black!important;
}

.ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
  top: 25px;
}

.ivu-btn>.ivu-icon+span, .ivu-btn>span+.ivu-icon {
  position: relative!important;
  top: -1px!important;
}
</style>