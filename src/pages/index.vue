<template id='index'>
  <div class="index_wrap">
    <!-- <v-scroll> -->
    <div class="index">
      <div class="left_side">
        <xccTopside :userInfo='userInfo'></xccTopside>
        <xccBottomside :userInfo='userInfo'></xccBottomside>
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
            <transition :name="tName">
              <!-- <scrollbars> -->
              <router-view></router-view>
              <!-- </scrollbars> -->
            </transition>
          </v-scroll>
        </div>
      </div>

      <div class="right_side">
        <xccRightside></xccRightside>
      </div>

      <xccHeader :userInfo='userInfo'></xccHeader>
      <!-- <xccFooter class="footer"></xccFooter> -->
    </div>
    <!-- </v-scroll> -->
  </div>
</template>

<script>
import xccHeader from "../components/xcc_header.vue";
import xccTopside from "../components/xcc_topside.vue";
import xccBottomside from "../components/xcc_bottomside.vue";
import xccRightside from "../components/xcc_rightside.vue";
import xccFooter from "../components/xcc_footer.vue";

import Scrollerbars from "@zhangzhengyi12/vue-scrollbars";

export default {
  name: "index",
  components: {
    xccHeader,
    xccTopside,
    xccBottomside,
    xccRightside,
    xccFooter,
    Scrollerbars
  },
  data() {
    return {
      tName: "",
      userInfo: {}
    };
  },
  methods: {
    getUserInfo() {
      if (localStorage.getItem("info")) {
        let info = JSON.parse(localStorage.getItem("info"));
        this.userInfo = info;
        this.$store.commit('addUserInfo',info)
      } else {
        this.userInfo.rolename = "未登录";
        this.$store.commit('addUserInfo',this.userInfo)
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getUserInfo();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
    $route(to, from) {
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
$borderBottom: 1px solid rgb(233, 233, 233);

.index_wrap {
  width: 100%;
  height: 100%;
  background: url(../../static/images/bg4.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  .index {
    width: 100%;
    min-width: 1300px;
    height: auto;
    min-height: 100%;
    margin: 0 auto;
    // background-color: rgba(255, 255, 255, 0.8);
    position: relative;
    transition: all 0.1s ease;
  }
}

// 中间部分
.index_main {
  position: absolute;
  left: 235px;
  top: 65px;
  bottom: 0;
  right: 246px;

  .index_bread {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    padding: 0 10px;
    // border-bottom: $borderBottom;
    border-radius: 8px;
  }

  .index_btns {
    position: absolute;
    // bottom: 0;
    left: 0;
    width: 53px;
    top: 60px;
    height: 500px;
    // background-color: white;
    box-sizing: border-box;
    // border-bottom: $borderBottom;

    .index-btn {
      margin-right: 10px;
      font-size: 12px;
      padding: 6px 6px;
      margin: 0 auto 10px auto;
      text-align: center;
      border-radius: 5px;
    }
  }

  .index_router {
    position: absolute;
    bottom: 10px;
    left: 60px;
    right: 0;
    top: 60px;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    box-sizing: border-box;
    // padding: 0 0 20px 20px;
    // border-radius: 8px;
  }
}

// 左侧导航
.left_side {
  width: 220px;
  height: 100%;
  position: absolute;
  top: 55px;
  bottom: 10px;
  left: 0;
  background-color: rgb(58, 63, 81);
}

// 右侧导航
.right_side {
  width: 230px;
  position: absolute;
  top: 55px;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.2);
}

// 底部显示
.footer {
  // height: 20px;
  // width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>