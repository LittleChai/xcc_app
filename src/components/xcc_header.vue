<template id='xcc_header'>
  <div class="header">
    <div class="left_header">
      <div class="left_header_logo">
        <img src="../../static/images/logo.png" alt="">
      </div>
      <div class="left_header_text">柴の乐园</div>
    </div>
    <div class="right_header">
      <div class="right_header_li"></div>

      <div class="right_header_li"></div>

      <div class="right_header_li"></div>
    </div>

    <div class="right_header_logout">
      <span>{{userInfo.rolename}}</span>
      <Poptip confirm title="是否退出登录?" @on-ok="logout">
        <Icon type="md-exit" class="right_header_icon" size="18" />
      </Poptip>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "xcc_header",
  data() {
    return {
      FuserInfo: {},
    //   userInfo: {}
    };
  },
    props: ['userInfo'],
  methods: {
    logoutFn() {
      localStorage.removeItem("token");
      localStorage.removeItem("info");
      this.$Message.success("登出成功");
      this.$router.push({
        path: "/login"
      });
    },

    getUserInfo() {
      // this.FuserInfo = this.userInfo;
    //   this.$store.commit("addUserInfo");
    },

    logout() {
      if (localStorage.getItem("token")) {
        this.$http
          .post("/logout", {
            s: "App.User.Logout",
            uuid: this.userInfo.uuid,
            token: localStorage.getItem("token")
          })
          .then(res => {
            console.log(res);
            if (res.data.err_code == 0) {
              this.logoutFn();
            } else {
              this.$Message.warning(res.data.err_msg);
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        this.logoutFn();
      }
    }
  },
  beforeCreate() {},
  created() {
    // this.$store.dispatch("getUserInfo");
  },
  beforeMount() {},
  mounted() {
    // this.getUserInfo();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {
    // ...mapState({
    //   userInfo: "userInfo"
    // })
  },
  watch: {
      userInfo(oldVal,newVal) {
          console.log(oldVal,newVal);
          this.FuserInfo = oldVal
      }
  }
};
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
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .left_header {
    width: 300px;
    height: 100%;
    line-height: 55px;
    position: relative;

    .left_header_logo {
      width: 40px;
      height: 40px;
      display: inline-block;
      position: relative;
      top: 10px;
      margin-left: 10px;

      img {
        width: 35px;
        height: 35px;
      }
    }

    .left_header_text {
      width: auto;
      height: 100%;
      position: absolute;
      left: 55px;
      top: 1px;
      color: white;
      font-size: 17px;
      font-weight: bold;
    }
  }

  .right_header {
    width: auto;
    height: 100%;
    flex-flow: row nowrap;
    position: relative;
    right: 125px;
    // justify-content: space-between;

    .right_header_li {
      width: 50px;
      height: 100%;
      display: inline-block;
    }
  }

  .right_header_logout {
    width: 120px;
    height: 100%;
    line-height: 55px;
    color: white;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;

    span {
      font-size: 16px;
      display: inline-block;
      width: 72px;
      height: 100%;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .right_header_icon {
      position: absolute;
      right: -28px;
      top: -36px;
      cursor: pointer;
    }
  }
}
</style>