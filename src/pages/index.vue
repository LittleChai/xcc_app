<template id='index'>
  <div class="index_wrap">
    <!-- <v-scroll> -->
    <div class="index">
      <div class="left_side">
        <xccTopside></xccTopside>
        <xccBottomside></xccBottomside>
      </div>

      <div class="index_main">
        <div class="index_bread">
          <Breadcrumb>
            <BreadcrumbItem to="/index/page1">主页分类1</BreadcrumbItem>
            <BreadcrumbItem to="/index/page2">主页分类2</BreadcrumbItem>
            <BreadcrumbItem>主页分类3</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="index_btns">
          <Button class="index-btn" type="info">分类一</Button>
          <Button class="index-btn" type="success">分类一</Button>
          <Button class="index-btn" type="warning">分类一</Button>
          <Button class="index-btn" type="error">分类一</Button>
        </div>
        <div class="index_router">
            <v-scroll>
                <transition :name='tName'>
                    <router-view></router-view>
                </transition>
            </v-scroll>
        </div>
      </div>

      <xccHeader></xccHeader>
      <!-- <xccFooter class="footer"></xccFooter> -->
    </div>
    <!-- </v-scroll> -->
  </div>
</template>

<script>
import xccHeader from "../components/xcc_header.vue";
import xccTopside from "../components/xcc_topside.vue";
import xccBottomside from "../components/xcc_bottomside.vue";
import xccFooter from "../components/xcc_footer.vue";

export default {
  name: "index",
  components: {
    xccHeader,
    xccTopside,
    xccBottomside,
    xccFooter
  },
  data() {
    return {
        tName: ''
    };
  },
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
      $route(to,from) {
          if (to.meta.index > from.meta.index) {
                this.tName = "t_left";
            } else {
                this.tName = "t_right";
            }
      }
  }
};
</script>

<style lang="scss" scoped>
// 全局颜色定义
$borderBottom : 1px solid rgb(233, 233, 233);

.index_wrap {
  width: 100%;
  height: 100%;
  background: url(../../static/images/bg4.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .index {
    width: 1300px;
    height: auto;
    min-height: 100%;
    margin: 0 auto;
    // background-color: rgba(255, 255, 255, 0.8);
    position: relative;
    transition: all 0.1s ease;
  }
}

.index_main {
  position: absolute;
  left: 240px;
  top: 70px;
  bottom: 10px;
  right: 60px;

  .index_bread {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: white;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: $borderBottom;
  }

  .index_btns {
    width: 100%;
    height: 50px;
    line-height: 46px;
    background-color: white;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: $borderBottom;

    .index-btn {
      margin-right: 10px;
    }
  }

  .index_router {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 80px;
      background-color: white;
      overflow: hidden;
  }
}

.left_side {
  width: 240px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 30px;
  left: 0;
}

.footer {
  // height: 20px;
  // width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>