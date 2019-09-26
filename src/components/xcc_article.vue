<template id='xcc_article'>
  <div class="article_wrap">
    <div class="article_child" v-for="(item,index) in articleArr" :key="index">
      <div class="article_header">
        <div class="article_header_avatar">
          <img :src="item.article_avatar" alt />
        </div>
        <div class="article_header_name">{{item.article_author}}</div>
        <div class="article_header_time">发布于: {{item.add_time}}</div>
      </div>
      <div class="article_center">
        <div class="article_center_title">
          {{item.article_title}}
          <span>({{item.article_sub_title}})</span>
        </div>
        <!-- <div class="article_center_sub_title">{{item.article_sub_title}}</div> -->
        <div class="article_center_main" v-html="item.article_content"></div>
        <div class="article_center_footer">
          <div class="article_center_more">
            查看详情
            <span>››</span>
          </div>

          <div class="article_center_icon">
            <Icon type="ios-thumbs-up-outline" size="16" class="article_center_icons" />
            <!-- <Icon type="ios-thumbs-up" size='16' class="article_center_icons"/> -->
            <span>点赞</span>
          </div>
          <div class="article_center_icon">
            <Icon type="ios-star-outline" size="16" class="article_center_icons" />
            <!-- <Icon type="ios-star" size='16' class="article_center_icons"/> -->
            <span>收藏</span>
          </div>
          <div class="article_center_icon">
            <Icon type="ios-chatboxes-outline" size="16" class="article_center_icons" />
            <span>评论</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "xcc_article",
  data() {
    return {
      testArticle: [{}, {}, {}],
      articleArr: []
    };
  },
  methods: {
    getArticle() {
      this.$http
        .post("/getArticle", {
          s: "App.Table.FreeQuery",
          uuid: JSON.parse(localStorage.getItem("info")).uuid,
          token: localStorage.getItem("token"),
          model_name: "okayapi_article",
          where: [["id", ">=", "1"]],
          page: 1,
          perpage: 10
        })
        .then(res => {
          // console.log(res);
          for (var i = res.data.list.length - 1; i >= 0; i--) {
            // console.log(res.data.list[i])
            this.articleArr.push(res.data.list[i]);
            this.getUserInfo();
          }
          // this.articleArr = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getUserInfo() {
        for(var i=0; i<this.articleArr.length; i++) {
            let data = this.articleArr[i];
            // 头像地址重组
            let oldUrl = data.article_avatar;
            let oldArr = oldUrl.split("/");

            let newUrl = "http://littlechai.wuyayu.com/" + oldArr[oldArr.length - 1];
            data.article_avatar = newUrl;
            // console.log(newUrl);
        }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {
    this.getArticle();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.article_wrap {
  width: 100%;
  height: auto;
  padding: 20px 0;

  .article_child {
    width: 88%;
    height: auto;
    margin: 0px auto 40px auto;
    padding: 15px 10px 0 10px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 1);

    .article_header {
      width: 100%;
      height: 50px;
      position: relative;
      color: black;

      .article_header_avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .article_header_name {
        width: 500px;
        height: 25px;
        line-height: 25px;
        position: absolute;
        left: 50px;
        top: 0;
      }

      .article_header_time {
        width: 500px;
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        position: absolute;
        left: 50px;
        bottom: 10px;
        color: rgb(88, 88, 88);
      }
    }

    .article_center {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 0 10px 6px 10px;

      .article_center_title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: black;
        // text-align: center;

        span {
          font-size: 12px;
          color: rgba(166, 166, 166, 1);
        }
      }
      .article_center_sub_title {
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: black;
        position: relative;
        top: -16px;
        transform: scale(0.9);
        color: rgba(66, 66, 66, 1);
        // text-align: center;
      }

      .article_center_main {
        margin-top: 5px;

        p {
          margin: 6px 0;
        }
      }

      .article_center_footer {
        width: 100%;
        height: 35px;
        line-height: 45px;
        margin: 20px 0 5px 0;
        font-size: 15px;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          left: -20px;
          right: -20px;
          top: 0;
          height: 1px;
          background-color: rgba(240, 240, 240, 1);
        }

        .article_center_icon {
          width: 60px;
          margin-right: 50px;
          display: inline-block;
          cursor: pointer;
        }

        .article_center_icons {
          position: relative;
          top: -2px;
          font-weight: bold;
          margin-right: 2px;
        }

        .article_center_more {
          position: absolute;
          width: 60px;
          height: 30px;
          line-height: 30px;
          right: 0px;
          font-size: 12px;
          bottom: -3px;
          text-align: center;
          background-color: rgb(58, 63, 81);
          color: white;
          border-radius: 4px;
          padding-right: 15px;
          box-sizing: unset;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: #32374a;
          }

          span {
            font-size: 18px;
            position: absolute;
            right: 5px;
            top: -1px;
          }
        }
      }
    }
  }
}
</style>