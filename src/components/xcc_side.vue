<template id='xcc_topside'>
  <div class="side">
    <div class="top_side">
      <div class="top_sm">
        <Tooltip content="缩小" placement="left" theme='light'>
           <Icon type="md-return-left" size='22'/>   
        </Tooltip>
        
      </div>	  
      <div class="top_edit">
        <Tooltip content="更换背景" placement="right" theme='light'>
          <Icon type="ios-color-palette" size='23'/>    
        </Tooltip>
      </div>


      <div v-if="!bol" class="side_avatar">
        <img src="../../static/images/default.jpg" alt />
      </div>

      <div v-if="bol" class="side_avatar">
        <img
          :src="FuserInfo.ext_info.yesapi_avatar == '' ? require('../../static/images/default.jpg') :  FuserInfo.ext_info.yesapi_avatar"
          alt
        />
      </div>

      <div class="side_name">
        <img src="../../static/images/admin.png" alt />
        {{FuserInfo.rolename}}
      </div>

      <div class="side_text">
        暂无签名
      </div>
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
        <div class="side_list_child" v-for="(item,index) in menuArr" :key='index' :data-path='item.path'>
          <Icon :type="item.icon" size='18' class="side_list_icon"/>
          {{item.name}}
          <Icon type="ios-arrow-forward" size='18' class="side_list_arrow"/>
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
      FuserInfo: {},
      bol: false,
      menuArr: [
        {
          name: '个人中心',
          path: '/index/menu1',
          icon: 'md-cog'
        },
        {
          name: '私密空间',
          path: '/index/menu1',
          icon: 'md-cog'
        },
        {
          name: '收藏管理',
          path: '/index/menu1',
          icon: 'md-cog'
        },
        {
          name: '等待开发',
          path: '/index/menu1',
          icon: 'md-cog'
        }
      ]
    };
  },
  props: ["userInfo"],
  methods: {
    getUserInfo() {
      this.FuserInfo = this.userInfo;
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // this.getUserInfo();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {
    userInfo(oldVal, newVal) {
      this.FuserInfo = oldVal;
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
      transition: all .2s ease;

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
      transition: all .2s ease;

      &:hover {
        color: white;
      }
    }

    .side_avatar {
      width: 100px;
      height: 100px;
      margin: 0px auto 5px auto;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
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
           content: '';
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
          transition: all .2s ease;
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