<template id='index'>
  <div class="index_wrap">
    <div class="index">
      <div class="left_side">
        <xccSide :userInfo="userInfo"></xccSide>
      </div>

      <div class="index_main">
        <div class="index_btns">
          <!-- <Icon size="24" type="ios-arrow-back" class="index_btns_back" /> -->
          <!-- <Icon size="24" type="ios-arrow-forward" class="index_btns_prev" /> -->
          <div class="index_btns_wrap">
            <Button class="index-btn" icon="md-create" type="default" @click="toEditor">发帖</Button>
            <Button class="index-btn" icon="ios-restaurant" type="primary" @click="pullArticle">菜谱</Button>
          </div>
        </div>

        <div class="index_bread">
          <Breadcrumb>
            <BreadcrumbItem to="/index/article">主页</BreadcrumbItem>
            <BreadcrumbItem to="/index/editor">文章编辑</BreadcrumbItem>
            <!-- <BreadcrumbItem>主页分类3</BreadcrumbItem> -->
          </Breadcrumb>
        </div>
        <div class="index_router">
          <v-scroll>
            <transition :name="tName" mode="out-in" :duration="{ enter: 700, leave: 500 }">
              <router-view></router-view>
            </transition>
          </v-scroll>
        </div>
      </div>

      <div class="right_side">
        <xccRightside></xccRightside>
      </div>
      <xccHeader :userInfo="userInfo"></xccHeader>
    </div>
  </div>
</template>

<script>
import xccHeader from "../components/xcc_header.vue";
import xccSide from "../components/xcc_side.vue";
import xccBottomside from "../components/xcc_bottomside.vue";
import xccRightside from "../components/xcc_rightside.vue";
import xccFooter from "../components/xcc_footer.vue";
import { setTimeout } from "timers";

export default {
  name: "index",
  components: {
    xccHeader,
    xccSide,
    xccBottomside,
    xccRightside,
    xccFooter
  },
  data() {
    return {
      tName: "t_left",
      userInfo: {}
    };
  },
  methods: {
    toEditor() {
      this.$router.push({
        path: '/index/editor'
      })
    },
    getUserInfo() {
      if (localStorage.getItem("info")) {
        let info = JSON.parse(localStorage.getItem("info"));
        this.userInfo = info;
        this.$store.commit("addUserInfo", info);
      } else {
        this.userInfo.rolename = "未登录";
        this.$store.commit("addUserInfo", this.userInfo);
      }
    },
    pullArticle() {
      let oDate = new Date();
      let nowTime = oDate.getTime();
      oDate.setDate(oDate.getDate());
      let year = oDate.getFullYear();
      let month = oDate.getMonth() + 1;
      let date = oDate.getDate();
      let hour = oDate.getHours();
      let minute = oDate.getMinutes();
      let second = oDate.getSeconds();
      let targeDate =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      this.$http
        .post("/pullArticle", {
          s: "App.Table.Create",
          model_name: "okayapi_article",
          uuid: JSON.parse(localStorage.getItem("info")).uuid,
          token: localStorage.getItem("token"),
          data: {
            article_title: "哈哈哈哈",
            article_sub_title: "哈哈哈哈",
            article_post_time: targeDate,
            article_author: 
              JSON.parse(localStorage.getItem("info")).username,
            article_content: "哈哈哈哈",
            article_background: "哈哈哈哈",
            article_avatar: "哈哈哈哈",
            update_time: targeDate,
            article_zan: JSON.stringify([]),
            article_star: JSON.stringify([]),
            ext_data: JSON.stringify({
              
            })
          },
          add_time: targeDate,
          update_time: targeDate,
        })
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    getArticle() {
      this.$http.post("/getArticle",{
        s: 'App.Table.FreeQuery',
        uuid: JSON.parse(localStorage.getItem("info")).uuid,
        token: localStorage.getItem("token"),
        model_name: 'okayapi_article',
        where: [['id','>=','1']],
        page: 1,
        perpage: 30
      })
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res)
      })
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    let that = this;
    var delayTime = null;
    delayTime = setTimeout(function() {
      that.getUserInfo();
      // that.getArticle();
      clearTimeout(delayTime);
    }, 1500);
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

body {
  color: #000000;
}

.index_wrap {
  width: 100%;
  height: 100%;
  background: url(http://data.wuyayu.com/bg4.png);
  // background-color: lightblue;
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
    position: absolute;
    // bottom: 0;
    left: 0;
    // width: ;
    top: 55px;
    right: 0;
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
    position: relative;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.1);

    .index_btns_back {
      position: absolute;
      left: 5px;
      top: 12px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .index_btns_prev {
      position: absolute;
      right: 5px;
      top: 12px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .current {
      color: rgba(255, 255, 255, 1);
    }

    .index_btns_wrap {
      // width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      height: 100%;
    }
    .index-btn {
      margin-right: 10px;
      font-size: 14px;
      padding: 5px 8px;
      margin: 8px 0px 0 10px;
      text-align: center;
      border-radius: 5px;
    }
  }

  .index_router {
    position: absolute;
    bottom: 10px;
    left: 0px;
    right: 0;
    top: 110px;
    background-color: rgba(255, 255, 255, 0);
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