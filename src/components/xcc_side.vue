<template id='xcc_topside'>
  <div class="side">
    <div class="top_side">
      <div class="top_sm">
        <Tooltip content="缩小" placement="left" theme="light">
          <Icon type="md-return-left" size="22" />
        </Tooltip>
      </div>
      <div class="top_edit">
        <Tooltip content="更换背景" placement="right" theme="light">
          <Icon type="ios-color-palette" size="23" />
        </Tooltip>
      </div>


      <div class="side_avatar">
        <div class="side_change">
          <input
            style="position: absolute; z-index: 99; opacity: 0; cursor: pointer;"
            type="file"
            accept="image/*"
            @change="uploadAvatar1"
          />
          <Icon
            style="position: absolute; z-index: 98; cursor: pointer;"
            class="side_change"
            type="ios-settings"
          />
        </div>
        <Icon class="side_change" type="ios-settings" />
        <img v-if="FuserInfo.yesapi_avatar == ''" src="../../static/images/default.jpg" alt/>
        <img v-else :src="FuserInfo.yesapi_avatar" alt />
      </div>

      <div class="side_name">
        <img src="../../static/images/admin.png" alt />
        {{FuserInfo.username}}
      </div>

      <div class="side_text">{{FuserInfo.say}}</div>
    </div>

    <div class="bottom_side">
      <div class="side_div">
        <div class="side_div_li">
          <span class="side_span">99</span>
          <span>动态</span>
        </div>
        <div class="side_div_li">
          <span class="side_span">99</span>
          <span>关注</span>
        </div>
        <div class="side_div_li">
          <span class="side_span">99</span>
          <span>粉丝</span>
        </div>
      </div>

      <div class="side_list">
        <div class="side_list_header">导航列表</div>
        <div
          class="side_list_child"
          v-for="(item,index) in menuArr"
          :key="index"
          :data-path="item.path"
        >
          <Icon :type="item.icon" size="18" class="side_list_icon" />
          {{item.name}}
          <Icon type="ios-arrow-forward" size="18" class="side_list_arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xcc_topside",
  data() {
    return {
      FuserInfo: {
        // yesapi_avatar: ''
      },
      bol: false,
      menuArr: [
        {
          name: "个人中心",
          path: "/index/menu1",
          icon: "md-cog"
        },
        {
          name: "私密空间",
          path: "/index/menu1",
          icon: "md-cog"
        },
        {
          name: "收藏管理",
          path: "/index/menu1",
          icon: "md-cog"
        },
        {
          name: "等待开发",
          path: "/index/menu1",
          icon: "md-cog"
        }
      ]
    };
  },
  props: ["userInfo"],
  methods: {
    getUserInfo() {
      let data = JSON.parse(localStorage.getItem('info'));
      this.FuserInfo = data;
      this.FuserInfo.say = data.ext_info.say;
      this.FuserInfo.yesapi_avatar = data.ext_info.yesapi_avatar;
      console.log(this.FuserInfo)
      // 头像地址重组
      let oldUrl = this.FuserInfo.ext_info.yesapi_avatar;
      let oldArr = oldUrl.split('\/');

      let newUrl = 'http://data.littlechai.cn/'+oldArr[oldArr.length-1];
      this.FuserInfo.yesapi_avatar = newUrl;
      console.log(newUrl)

    },
    uploadAvatar1(e) {
      // console.log(e)
      let data = e;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function(e) {
        console.log(data);
        // 获取上传图片名称
        let arr = data.target.value.split("\\");
        let fileName = arr[arr.length - 1];

        // 获取图片类型
        let arr1 = fileName.split(".");
        let type = arr1[arr1.length - 1];

        // that.uploadBase64(e.target.result,fileName,type);
        that.uploadAvatar(e.target.result, fileName, type);

        // console.log(e.target.result);
      };
    },
    uploadAvatar2(e) {
      let data = e;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function(e) {
        console.log(data);
        // 获取上传图片名称
        let arr = data.target.value.split("\\");
        let fileName = arr[arr.length - 1];

        // 获取图片类型
        let arr1 = fileName.split(".");
        let type = arr1[arr1.length - 1];

        // that.uploadBase64(e.target.result,fileName,type);
        that.uploadAvatar(e.target.result, fileName, type);
      };
    },
    uploadBase64(base64, fileName, fileType) {
      this.$http
        .post("/uploadImage", {
          s: "App.CDN.UploadImgByBase64",
          uuid: JSON.parse(localStorage.getItem("info")).uuid,
          token: localStorage.getItem("token"),
          file: base64,
          file_name: fileName,
          file_type: fileType
        })
        .then(res => {
          console.log(res);
          if (res.data.err_code == 0) {
            let url = res.data.url;
            let urlArr = url.split("/");
            let upUrl =
              "http://data.littlechai.cn/" + urlArr[urlArr.length - 1];
            console.log(upUrl);
          } else {
            this.$Message.warning(res.data.err_msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    uploadAvatar(base64, fileName, fileType) {
      this.$http
        .post("/uploadAvatar", {
          s: "App.User.UploadAvatar",
          uuid: JSON.parse(localStorage.getItem("info")).uuid,
          other_uuid: JSON.parse(localStorage.getItem("info")).uuid,
          token: localStorage.getItem("token"),
          file: base64
        })
        .then(res => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.$Message.success("更新成功");
            this.updateUser();
          } else {
            this.$Message.warning(res.data.err_msg);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    updateUser() {
      this.$http
        .post("/getUserInfo", {
          s: "App.user.profile",
          uuid: JSON.parse(localStorage.getItem("info")).uuid,
          token: localStorage.getItem("token"),
        })
        .then(res => {
          console.log(res);
          localStorage.setItem("info", JSON.stringify(res.data.info));
          this.updateVuex(res.data.info);
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 更新vuex
    updateVuex(val) {
      this.$store.commit('addUserInfo',val);
      this.getUserInfo();
    },
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
    userInfo(oldVal, newVal) {
      this.getUserInfo();
      // this.FuserInfo = oldVal;
      this.bol = true;
    }
  }
};
</script>

<style lang="scss" scoped>
$whiteColor: #eaebed;

@mixin dian {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.side {
  width: 220px;
  height: 100%;
  min-height: 720px;
  box-sizing: border-box;
  // padding: 20px 0 0 0;

  .top_side {
    width: 220px;
    height: 200px;
    box-sizing: border-box;
    padding: 20px 0 0 0;
    position: relative;

    .top_edit {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      left: 0;
      color: #b4b6bd;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: white;
      }
    }

    .top_sm {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 0;
      right: 0;
      color: #b4b6bd;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: white;
      }
    }

    .side_avatar {
      width: 100px;
      height: 100px;
      margin: 0px auto 5px auto;
      border-radius: 50%;
      // overflow: hidden;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .side_change {
        position: absolute;
        width: 26px;
        height: 26px;
        right: 0px;
        bottom: -2px;
        font-size: 26px;
        color: white;
        cursor: pointer;
        overflow: hidden;
      }
    }

    .side_text {
      width: 100%;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      padding: 0px 15px;
      text-align: center;
      color: $whiteColor;
      font-size: 12px;
      @include dian;
    }

    .side_name {
      width: 100%;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      padding: 0px 15px;
      text-align: center;
      color: $whiteColor;
      font-weight: bold;
      font-size: 15px;
      @include dian;

      img {
        width: 15px;
        height: 15px;
        position: relative;
        top: 2px;
        left: -2px;
      }
    }
  }

  .bottom_side {
    position: absolute;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;

    .side_div {
      width: 100%;
      height: 50px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      // border-bottom: 1px solid rgba(166, 166, 166, 0.1);
      .side_div_li {
        width: 33.333%;
        height: 100%;
        text-align: center;
        position: relative;
        cursor: pointer;

        &::after {
          content: "";
          position: absolute;
          top: 14px;
          bottom: 12px;
          width: 1px;
          background-color: rgba(166, 166, 166, 0.2);
          right: 0;
        }
        span {
          display: inline-block;
          width: 100%;
          height: 50%;
          line-height: 15px;
          font-size: 13px;
          color: white;
          position: relative;
          top: -2px;
        }

        .side_span {
          line-height: 38px;
          top: unset;
        }
      }
    }

    .side_list {
      border-top: 1px solid #2e3344;
      border-bottom: 1px solid #2e3344;
      width: 100%;
      height: auto;
      padding-bottom: 20px;

      .side_list_header {
        width: 100%;
        height: 45px;
        line-height: 60px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 0 0 10px;
        color: #8b8e99;
        font-size: 14px;
      }

      .side_list_child {
        width: 100%;
        height: 44px;
        line-height: 44px;
        color: #b4b6bd;
        font-size: 14px;
        font-weight: bold;
        position: relative;
        cursor: pointer;
        transition: all 0.2s ease;
        box-sizing: border-box;
        padding-left: 50px;
        &:hover {
          background-color: rgb(50, 55, 74);
          color: white;
        }

        .side_list_icon {
          position: absolute;
          top: 12px;
          left: 15px;
        }

        .side_list_arrow {
          position: absolute;
          right: 10px;
          top: 12px;
        }
      }
    }
  }
}
</style>