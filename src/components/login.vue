<template>
  <div id="login">
    <div :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' " v-if='type == 0 ? true : false'>
      <!-- 登录 -->
      <div class="login-wrap-bottom" v-if='type == 0 ? true : false'>
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
            />
          </span>
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
            />
          </span>
        </div>
        <div class="forget-password zhuce" @click='changeType(1)'>用户注册</div>
        <div class="forget-password" @click='changeType(2)'>忘记密码</div>

        <van-button type="info" class="login-btn" @click="login">登录</van-button>
      </div>
    </div>

    <div :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' " v-if='type == 1 ? true : false'>
      <!-- 注册 -->
      <div class="login-wrap-bottom" v-if='type == 1 ? true : false'>
        <p>用户注册</p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/user.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入账号"
              @keyup.enter="login"
              v-model="userName1"
              maxlength="20"
            />
          </span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img class="icon-email" src="../../static/images/email.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入邮箱(用于找回密码)"
              @keyup.enter="login"
              v-model="email1"
              maxlength="20"
            />
          </span>
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
              v-model="password1"
              maxlength="20"
            />
          </span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请确认密码"
              @keyup.enter="login"
              v-model="password11"
              maxlength="20"
            />
          </span>
        </div>
        <div class="forget-password zhuce" @click='changeType(0)'>用户登录</div>
        <div class="forget-password" @click='changeType(2)'>忘记密码</div>

        <van-button type="info" class="login-btn" @click="register">注册</van-button>
      </div>
    </div>

    <div :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' " v-if='type == 2 ? true : false'>
      <!-- 忘记密码 -->
      <div class="login-wrap-bottom" v-if='type == 2 ? true : false'>
        <p>忘记密码</p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img class="icon-email" src="../../static/images/email.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="text"
              placeholder="请输入邮箱"
              @keyup.enter="login"
              v-model="email2"
              maxlength="20"
            />
          </span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <img src="../../static/images/password.svg" alt />
          </span>
          <span class="login-wrap-input1">
            <input
              type="password"
              placeholder="请输入验证码"
              @keyup.enter="login"
              v-model="code2"
              maxlength="20"
            />
          </span>
        </div>
        <div class="forget-password zhuce" @click='changeType(1)'>用户注册</div>
        <div class="forget-password" @click='changeType(0)'>用户登录</div>

        <van-button type="info" class="login-btn" @click="login">确认</van-button>
      </div>
    </div>


      <div class="login-all">by LittleChai</div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",

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
    // 更改登录类别
    changeType(val) {
      this.type = val;
    },

    // 注册
    register() {
      if(this.userName1 == "") {
        Notify({
          message: "请输入帐号",
          duration: 1000,
          background: "#ff8f68"
        });
      }
      else if(this.email1 == "") {
        Notify({
          message: "请输入邮箱",
          duration: 1000,
          background: "#ff8f68"
        });
      }
      else if(this.password1 == "") {
        Notify({
          message: "请输入密码",
          duration: 1000,
          background: "#ff8f68"
        });
      }
      else if(this.password11 == "") {
        Notify({
          message: "请确认密码",
          duration: 1000,
          background: "#ff8f68"
        });
      }
      else {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(this.userName1.length < 7) {
          Notify({
            message: "用户名长度不能小于7位",
            duration: 1000,
            background: "#ff8f68"
          });
        }
        else if(!reg.test(this.email1)) {
          Notify({
            message: "请输入正确的邮箱",
            duration: 1000,
            background: "#ff8f68"
          });
        }
        else if(this.password1.length < 7) {
          Notify({
            message: "密码长度不能小于7位",
            duration: 1000,
            background: "#ff8f68"
          });
        }
        else if(this.password1 != this.password11) {
          Notify({
            message: "两次输入的密码不一致",
            duration: 1000,
            background: "#ff8f68"
          });
        }
        else {
           Notify({
            message: "正在注册",
            duration: 1000,
            background: "#1989fa"
          });

          this.$http.get('',{
            s: 'App.User.Register',
            username: this.userName1,
            password: this.md5(this.password1),
            app_key: '8BCC051034B77818A7732EBF575F1DC2',
            ext_info: {email: this.email1}
          }).then(res => {
            console.log(res);
            if(res.data.data.err_code == 0) {
              Notify({
                message: "注册成功",
                duration: 1000,
                background: "#1989fa"
              });
              this.type = 0;
            }
            else if(res.data.data.err_code == 1) {
              Notify({
                message: res.data.data.err_msg,
                duration: 1000,
                background: "#ff8f68"
              });
            }
          }).catch(res => {
            console.log(res)
          })

        }
      }
    },

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

          // this.$http.get('',{
          //   s: 'App.User.Register',
          //   username: this.userName,
          //   password: this.md5(this.password),
          //   app_key: '8BCC051034B77818A7732EBF575F1DC2',
          // }).then(res => {
          //   console.log(res)
          // }).catch(res => {
          //   console.log(res)
          // })

          // let loginText = Math.random() 
          //   .toString(36)
          //   .slice(2);
          // localStorage.setItem("login", loginText);
          // let that = this;
          // var timer = setTimeout(function() {
          //   that.$router.push({
          //     path: "/call"
          //   });
          //   clearTimeout(timer);
          // }, 500);
        }
      }
    }
  },
  mounted() {
    // console.log(this.$http)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  width: 100%;
  height: 100%;
  background: url(../../static/images/111.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
}

.login-wrap {
  width: 320px;
  height: 255px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -160px;
  margin-top: -75px;
  /* border-radius: 6px; */
  box-shadow: 0 0px 17px rgb(100, 99, 99);
  transition: all .3s ease;
}

.login-wrap-bg {
  height: 350px;
  top: 35%;
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
  color: black;
  position: relative;
  top: -30px;
  font-size: 15px;
}

.login-wrap-bottom .login-btn {
  width: 85%;
  position: relative;
  top: 30px;
}

.login-wrap-bottom .login-wrap-input {
  width: 85%;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(241, 241, 241);
  margin: 5px 0 12px 0;
  padding: 2px 0 3px 0;
  position: relative;
  top: -8px;
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
  color: black;
  /* background-color: rgba(255, 255, 255, 0); */
}

.forget-password {
  position: absolute;
  width: 55px;
  right: 20px;
  bottom: 88px;
  color: rgb(45, 183, 245);
  font-size: 12px;
  cursor: pointer;
  /* transition: all 0.2s ease; */
}

.zhuce {
  right: unset;
  left: 30px;
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
</style>
