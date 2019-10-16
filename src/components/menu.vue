<template id='menu'>
  <div class="menu_wrap">
    <div class="menu_top">
      <Icon size="26" type="md-arrow-round-back" @click="upRouter" class="index_btns_back index_btns_hover" />
      <Input class="menu_search" search enter-button placeholder="搜点什么吧" />
      <Icon size="26" type="md-arrow-round-forward" @click="downRouter" class="index_btns_prev index_btns_hover" />
    </div>
    <div class="menu_center">
      <v-scroll>
        <div class="menu_container">
          <div class="menu_child">
            
          </div>
        </div>
      </v-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {
 
    };
  },
  methods: {

  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.menu_wrap {
  width: 100%;
  height: auto;
  padding: 20px 0;

  .menu_top {
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    top: 0;
    line-height: 40px;
    text-align: center;

    .menu_search {
      width: 90%;
      margin: 2px auto;
    }

    .index_btns_back {
      position: absolute;
      left: 5px;
      top: 6px;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
    }

    .index_btns_prev {
      position: absolute;
      right: 5px;
      top: 6px;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
    }

    .index_btns_hover {
      transition: all .2s ease;
    }

    .index_btns_hover:hover {
      color: white;
    }
  }

  .menu_center {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;

    .menu_container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: auto;
    }
  }


  
}
</style>