<template>
  <div id="login">
    <button @click="changeRouter">切换路由</button>

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' "
      v-if="type == 0 ? true : false"
    >
    <div class="square1"></div>
    <div class="square2"></div>
      <!-- 登录 -->
      <div class="login-wrap-bottom" v-if="type == 0 ? true : false">
        <p>用户登录</p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/user.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入账号"
              @keyup.enter="login"
              v-model="userName"
              maxlength="20"
              @blur="blurBorder(0)" 
              @focus="focusBorder(0)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请输入密码"
              @keyup.enter="login"
              v-model="password"
              maxlength="20"
              @blur="blurBorder(1)" 
              @focus="focusBorder(1)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="forget-password zhuce" @click="changeType(1)">用户注册</div>
        <div class="forget-password" @click="changeType(2)">忘记密码</div>

        <van-button type="info" class="login-btn" @click="login">登录</van-button>
      </div>
    </div>

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' "
      v-if="type == 1 ? true : false"
    >
    <div class="square1"></div>
    <div class="square2"></div>
      <!-- 注册 -->
      <div class="login-wrap-bottom" v-if="type == 1 ? true : false">
        <p>用户注册</p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/user.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入账号"
              @keyup.enter="register"
              v-model="userName1"
              maxlength="20"
              @blur="blurBorder(0)" 
              @focus="focusBorder(0)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img class="icon-email" src="../../static/images/email.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入邮箱(用于找回密码)"
              @keyup.enter="register"
              v-model="email1"
              maxlength="20"
              @blur="blurBorder(1)" 
              @focus="focusBorder(1)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请输入密码"
              @keyup.enter="register"
              v-model="password1"
              maxlength="20"
              @blur="blurBorder(2)" 
              @focus="focusBorder(2)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请确认密码"
              @keyup.enter="register"
              v-model="password11"
              maxlength="20"
              @blur="blurBorder(3)" 
              @focus="focusBorder(3)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="forget-password zhuce" @click="changeType(0)">用户登录</div>
        <div class="forget-password" @click="changeType(2)">忘记密码</div>

        <van-button type="info" class="login-btn" @click="register">注册</van-button>
      </div>
    </div>

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' "
      v-if="type == 2 ? true : false"
    >
    <div class="square1"></div>
    <div class="square2"></div>
      <!-- 忘记密码 -->
      <div class="login-wrap-bottom" v-if="type == 2 ? true : false">
        <p>忘记密码</p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img class="icon-email" src="../../static/images/email.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入邮箱"
              @keyup.enter="find"
              v-model="email2"
              maxlength="20"
              @blur="blurBorder(0)" 
              @focus="focusBorder(0)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请输入验证码"
              @keyup.enter="find"
              v-model="code2"
              maxlength="20"
              @blur="blurBorder(1)" 
              @focus="focusBorder(1)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="forget-password zhuce" @click="changeType(1)">用户注册</div>
        <div class="forget-password" @click="changeType(0)">用户登录</div>

        <van-button type="info" class="login-btn" @click="find">确认</van-button>
      </div>
    </div>

    <div class="login-all">by LittleChai</div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Notify } from "vant";

Vue.use(Notify);
export default {
  name: "login",
  data() {
    return {
      userName: "admin",
      password: "123456",

      userName1: "",
      email1: "",
      password1: "",
      password11: "",

      email2: "",
      code2: "",
      // email: ""
      type: 1
      // 0: 登录
      // 1: 注册
      // 2: 忘记密码
    };
  },
  props: {},
  methods: {
    blurBorder(e) {
      // console.log(e);
      document.getElementsByClassName('input_hover')[e].style.width = '0%';
    },
    focusBorder(e) {
      // console.log(e);
      document.getElementsByClassName('input_hover')[e].style.width = '100%';
    },

    changeRouter() {
      this.$router.push({
        name: "test",
        params: {
          id: "test",
          test: "啦啦啦"
        }
      });
    },

    // 更改登录类别
    changeType(val) {
      this.type = val;
    },

    // 注册
    register() {
      if (this.userName1 == "") {
        Notify({
          message: "请输入帐号",
          duration: 1000,
          background: "#ff8f68"
        });
      } else if (this.email1 == "") {
        Notify({
          message: "请输入邮箱",
          duration: 1000,
          background: "#ff8f68"
        });
      } else if (this.password1 == "") {
        Notify({
          message: "请输入密码",
          duration: 1000,
          background: "#ff8f68"
        });
      } else if (this.password11 == "") {
        Notify({
          message: "请确认密码",
          duration: 1000,
          background: "#ff8f68"
        });
      } else {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (this.userName1.length < 7) {
          Notify({
            message: "用户名长度不能小于7位",
            duration: 1000,
            background: "#ff8f68"
          });
        } else if (!reg.test(this.email1)) {
          Notify({
            message: "请输入正确的邮箱",
            duration: 1000,
            background: "#ff8f68"
          });
        } else if (this.password1.length < 7) {
          Notify({
            message: "密码长度不能小于7位",
            duration: 1000,
            background: "#ff8f68"
          });
        } else if (this.password1 != this.password11) {
          Notify({
            message: "两次输入的密码不一致",
            duration: 1000,
            background: "#ff8f68"
          });
        } else {
          Notify({
            message: "正在注册",
            duration: 1000,
            background: "#1989fa"
          });

          this.$http
            .get("", {
              s: "App.User.Register",
              username: this.userName1,
              password: this.md5(this.password1),
              app_key: "8BCC051034B77818A7732EBF575F1DC2",
              ext_info: { email: this.email1 }
            })
            .then(res => {
              console.log(res);
              if (res.data.data.err_code == 0) {
                Notify({
                  message: "注册成功",
                  duration: 1000,
                  background: "#1989fa"
                });
                this.type = 0;
              } else if (res.data.data.err_code == 1) {
                Notify({
                  message: res.data.data.err_msg,
                  duration: 1000,
                  background: "#ff8f68"
                });
              }
            })
            .catch(res => {
              console.log(res);
            });
        }
      }
    },

    // 登录
    login() {
      if (this.userName == "") {
        Notify({
          message: "请输入帐号",
          duration: 1000,
          background: "#ff8f68"
        });
      } else if (this.password == "") {
        Notify({
          message: "请输入密码",
          duration: 1000,
          background: "#ff8f68"
        });
      } else {
        if (this.userName != "admin" || this.password != "123456") {
          Notify({
            message: "请输入正确的帐号密码",
            duration: 1000,
            background: "#ff8f68"
          });
        } else {
          Notify({
            message: "登录成功",
            duration: 1000,
            background: "#1989fa"
          });

          this.$http.get('/login').then(res => {
            console.log(res)
          }).catch(res => {
            console.log(res)
          })
        }
      }
    },

    // 找回密码
    find() {

    }
  },
  mounted() {
    // console.log(this.$http)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#login {
  width: 100%;
  height: 100%;
  background: url(../../static/images/login1.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  /* background-attachment: fixed; */
}

#login::before {
  content: "";
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background: transparent url(../../static/images/login1.jpg) center center
    no-repeat;
  filter: blur(8px);
  z-index: 1;
  background-size: cover;
}

.login-wrap {
  width: 320px;
  height: 255px;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -160px;
  margin-top: -75px;
  /* border-radius: 6px; */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
}

.login-wrap-bg {
  height: 350px;
  top: 35%;
  transition: all 0.3s ease;
}

.login-wrap-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.login-wrap-bottom p {
  color: #fff;
  position: relative;
  top: -36px;
  font-size: 15px;
}

.login-wrap-bottom .login-btn {
  width: 85%;
  position: relative;
  top: 24px;
  height: 40px;
  cursor: pointer;
}

.login-wrap-bottom .login-wrap-input {
  width: 85%;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 5px 0 3px 0;
  padding: 2px 0 8px 0;
  position: relative;
  top: -16px;

  // &:hover {
  //   &::after {
  //     position: absolute;
  //     content: "";
  //     width: 100%;
  //     left: 0;
  //     height: 1px;
  //     bottom: -1px;
  //     background-color: rgba(255, 255, 255, 1);
  //     animation: toFull 0.3s ease-in-out;
  //   }
  // }
}

@keyframes toFull {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.login-wrap-bottom .login-wrap-icon {
  width: 30px;
}

.login-wrap-bottom .login-wrap-icon img {
  position: relative;
  top: 6px;
  width: 24px;
}

.login-wrap-bottom .login-wrap-icon .icon-email {
  width: 22px;
  margin-right: 2px;
}

.login-wrap-bottom .login-wrap-input1 {
  width: 220px;
  position: relative;
  left: 8px;
  display: inline-block;
}

.login-wrap-bottom .login-wrap-input1 input {
  outline: none;
  font-size: 14px;
  letter-spacing: 1px;
  border: none;
  width: 100%;
  color: #fff;
  background-color: rgba(255, 255, 255, 0);
  position: relative;

}

.login-wrap-bottom .input_hover {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 0%;
  background-color: #fff;
  transition: all .3s ease;
}

.forget-password {
  position: absolute;
  width: 55px;
  right: 18px;
  bottom: 90px;
  color: rgb(45, 183, 245);
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  /* transition: all 0.2s ease; */
}

.zhuce {
  right: unset;
  left: 26px;
}

.forget-password:hover {
  color: rgb(87, 197, 247);
}

.login-all {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 4px;
  font-size: 12px;
  text-align: center;
  /* margin-top: 25px; */
  transform: scale(0.8);
  color: rgb(180, 180, 180);
}

.square1 {
 width: 0; 
 height: 0;
 border-width: 28px;
 border-style: solid;
//  border-color:#e257b7  transparent transparent transparent;
 border-color:rgba(255, 255, 255, 0)  transparent transparent transparent;
 transform:  rotate(-135deg);
 position: absolute;
 right: -28px;
 top: -28px;
}

.square2 {
 width: 0; 
 height: 0;
 border-width: 28px;
 border-style: solid;
//  border-color:rgba(228, 121, 255, 1) transparent transparent transparent;
 border-color:rgba(255, 255, 255, 0)  transparent transparent transparent;
 transform:  rotate(45deg);
 position: absolute;
 left: -28px;
 bottom: -28px;
}
</style>
