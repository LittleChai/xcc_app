<template>
  <div id="login">
    <!-- <button @click="changeRouter">切换路由</button> -->

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' "
      v-show="type == 0 ? true : false"
    >
      <div class="square1"></div>
      <div class="square2"></div>
      <!-- 登录 -->
      <div class="login-wrap-bottom" v-show="type == 0 ? true : false">
        <p>
          用户登录
          <span class="p_hover"></span>
        </p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/user.svg" alt /> -->
            <Icon type="md-paw" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
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
            <!-- <img src="../../static/images/password.svg" alt /> -->
            <Icon type="md-lock" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input  
              autocomplete="off"
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
        <div class="forget-password" @click="changeType(2)">修改密码</div>

        <Button type="info" class="login-btn" @click="login" :loading="loading">登录</Button>
      </div>
    </div>

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap' "
      v-show="type == 1 ? true : false"
    >
      <div class="square1"></div>
      <div class="square2"></div>
      <!-- 注册 -->
      <div class="login-wrap-bottom" v-show="type == 1 ? true : false">
        <p>
          用户注册
          <span class="p_hover"></span>
        </p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/user.svg" alt /> -->
            <Icon type="md-paw" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input  
              autocomplete="off"
              type="text"
              placeholder="请输入账号(这将会是您的昵称)"
              @keyup.enter="register"
              v-model="userName1"
              maxlength="20"
              @blur="blurBorder(2)"
              @focus="focusBorder(2)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img class="icon-email" src="../../static/images/email.svg" alt /> -->
            <Icon type="ios-mail-open" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="text"
              placeholder="请输入邮箱"
              @keyup.enter="register"
              v-model="email1"
              maxlength="20"
              @blur="blurBorder(3)"
              @focus="focusBorder(3)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/password.svg" alt /> -->
            <Icon type="md-lock" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="password"
              placeholder="请输入密码(6位或6位以上)"
              @keyup.enter="register"
              v-model="password1"
              maxlength="20"
              @blur="blurBorder(4)"
              @focus="focusBorder(4)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/password.svg" alt /> -->
            <Icon type="md-lock" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="password"
              placeholder="请确认密码"
              @keyup.enter="register"
              v-model="password11"
              maxlength="20"
              @blur="blurBorder(5)"
              @focus="focusBorder(5)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="forget-password zhuce" @click="changeType(0)">用户登录</div>
        <div class="forget-password" @click="changeType(2)">修改密码</div>

        <Button type="info" class="login-btn" @click="register" :loading="loading1">注册</Button>
      </div>
    </div>

    <div
      :class="type == 1 ? 'login-wrap login-wrap-bg' : 'login-wrap login-wrap-md' "
      v-show="type == 2 ? true : false"
    >
      <div class="square1"></div>
      <div class="square2"></div>
      <!-- 忘记密码 -->
      <div class="login-wrap-bottom" v-show="type == 2 ? true : false">
        <p>
          修改密码
          <span class="p_hover"></span>
        </p>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img class="icon-email" src="../../static/images/email.svg" alt /> -->
            <Icon type="md-paw" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="text"
              placeholder="请输入用户名"
              @keyup.enter="find"
              v-model="userName2"
              maxlength="20"
              @blur="blurBorder(6)"
              @focus="focusBorder(6)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/password.svg" alt /> -->
            <Icon type="md-lock" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="password"
              placeholder="请输入当前密码"
              @keyup.enter="find"
              v-model="oldPassword2"
              maxlength="20"
              @blur="blurBorder(7)"
              @focus="focusBorder(7)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="login-wrap-input">
          <span class="login-wrap-icon">
            <!-- <img src="../../static/images/password.svg" alt /> -->
            <Icon type="md-lock" color="rgba(45,183,245,1)" size="20" />
          </span>
          <span class="login-wrap-input1">
            <input
              autocomplete="off"
              type="password"
              placeholder="请输入新密码"
              @keyup.enter="find"
              v-model="newPassword2"
              maxlength="20"
              @blur="blurBorder(8)"
              @focus="focusBorder(8)"
            />
          </span>
          <span class="input_hover"></span>
        </div>
        <div class="forget-password zhuce" @click="changeType(1)">用户注册</div>
        <div class="forget-password" @click="changeType(0)">用户登录</div>

        <Button type="info" class="login-btn" @click="find" :loading="loading2">确认</Button>
      </div>
    </div>

    <div class="login-all">by LittleChai</div>
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",
      loading: false,

      userName1: "",
      email1: "",
      password1: "",
      password11: "",
      loading1: false,

      userName2: "",
      oldPassword2: "",
      newPassword2: "",
      loading2: false,
      // email: ""
      type: 0
      // 0: 登录
      // 1: 注册
      // 2: 忘记密码
    };
  },
  props: {},
  methods: {
    blurBorder(e) {
      // console.log(e);
      document.getElementsByClassName("input_hover")[e].style.width = "0%";
    },
    focusBorder(e) {
      // console.log(e);
      document.getElementsByClassName("input_hover")[e].style.width = "100%";
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
        this.$Message.warning("请输入帐号");
      } else if (this.email1 == "") {
        this.$Message.warning("请输入邮箱");
      } else if (this.password1 == "") {
        this.$Message.warning("请输入密码");
      } else if (this.password11 == "") {
        this.$Message.warning("请确认密码");
      } else {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        var reg1 = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (this.userName1.length < 3) {
          this.$Message.warning("用户名长度不能小于3位");
        } else if (this.userName1.length > 11) {
          this.$Message.warning("用户名长度不能大于11位");
        } else if (!reg.test(this.email1)) {
          this.$Message.warning("请输入正确的邮箱");
        } else if (this.password1.length < 6) {
          this.$Message.warning("密码长度不能小于6位");
        } else if (this.password1 != this.password11) {
          this.$Message.warning("两次输入的密码不一致");
        } else {
          // this.$Message.loading('正在注册');

          this.loading1 = true;
          // console.log(this.userName1.length)
          this.$http
            .post("/register", {
              s: "App.User.Register",
              username: this.userName1,
              password: this.md5(this.password1),
              ext_info: JSON.stringify({ email: this.email1 })
            })
            .then(res => {
              console.log(res);
              this.loading1 = false;
              if (res.data.err_code == 0) {
                this.$Message.success("注册成功");
                this.userName1 = "";
                this.email1 = "";
                this.password1 = "";
                this.password11 = "";
                this.type = 0;
              } else {
                this.$Message.warning(res.data.err_msg);
              }
            })
            .catch(res => {
              console.log(res);
              this.loading1 = false;
            });
        }
      }
    },

    // 登录
    login() {
      if (this.userName == "") {
        this.$Message.warning("请输入帐号");
      } else if (this.password == "") {
        this.$Message.warning("请输入密码");
      } else {
        if(this.userName.length < 3) {
          this.$Message.warning("用户名长度不能小于3位");
        }
        else if(this.userName.length > 11) {
          this.$Message.warning("用户名长度不能大于11位");
        }
        else {
          this.loading = true;
          this.$http
            .post("/login", {
              s: "App.User.Login",
              username: this.userName,
              password: this.md5(this.password)
            })
            .then(res => {
              console.log(res);
              if (res.data.err_code == 0) {
                this.$Message.success("登录成功");
                localStorage.setItem("token", res.data.token);
                this.$http.post('/getUserInfo',{
                  s: "App.user.profile",
                  uuid: res.data.uuid,
                  token: res.data.token,
                })
                .then(res => {
                  console.log(res);
                  localStorage.setItem("info", JSON.stringify(res.data.info));
                  this.$router.push({
                    path: '/index'
                  });
                  this.userName = '';
                  this.password = '';
                })
                .catch(res => {
                  console.log(res);
                })

              } else {
                this.$Message.warning(res.data.err_msg);
              }
              this.loading = false;
            })
            .catch(res => {
              console.log(res);
              this.loading = false;
            });
        }
        
      }
    },

    // 修改密码
    find() {
      if (this.userName2 == "") {
        this.$Message.warning("请输入帐号");
      } else if (this.oldPassword2 == "") {
        this.$Message.warning("请输入当前密码");
      } else if (this.newPassword2 == "") {
        this.$Message.warning("请输入新密码");
      } else {
        
        if(this.userName2.length < 3) {
          this.$Message.warning("用户名长度不能小于3位");
        }
        else if(this.userName2.length > 11) {
          this.$Message.warning("用户名长度不能大于11位");
        }
        else {
          this.loading2 = true;
          this.$http
            .post("/changePassword", {
              s: "App.User.AlterPassword",
              username: this.userName2,
              old_password: this.md5(this.oldPassword2),
              new_password: this.md5(this.newPassword2)
            })
            .then(res => {
              console.log(res);
              if (res.data.err_code == 0) {
                this.$Message.success("修改成功，请重新登录");
                this.userName2 = "";
                this.oldPassword2 = "";
                this.newPassword2 = "";
                this.type = 0;
                localStorage.removeItem("info");
              } else {
                this.$Message.warning(res.data.err_msg);
              }
              this.loading2 = false;
            })
            .catch(res => {
              console.log(res);
              this.loading2 = false;
            });
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
<style scoped lang='scss'>
#login {
  width: 100%;
  height: 100%;
  background: url(http://data.wuyayu.com/bg1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  // position: relative;
  /* background-attachment: fixed; */
}

#login::before {
  content: "";
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background: transparent url(../../static/images/bg1.png) center center
    no-repeat;
  filter: blur(0);
  z-index: 1;
  background-size: cover;
}

.login-wrap {
  width: 360px;
  height: 290px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 35%;
  left: 50%;
  margin-left: -160px;
  margin-top: -75px;
  /* border-radius: 6px; */
  // box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
}

.login-wrap-bg {
  height: 370px;
  top: 35%;
  transition: all 0.3s ease;
}

.login-wrap-md {
  height: 320px;
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
  color: rgba(26, 26, 26, 1);
  font-weight: bold;
  position: absolute;
  top: 14px;
  font-size: 15px;

  &::before {
  }
}

.p_hover {
  position: absolute;
  left: -1px;
  right: -1px;
  height: 2px;
  bottom: -4px;
  background-color: rgb(45, 183, 245);
}

.login-wrap-bottom .login-btn {
  width: 85%;
  position: absolute;
  bottom: 20px;
  height: 40px;
  cursor: pointer;
}

.login-wrap-bottom .login-wrap-input {
  width: 85%;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(45, 183, 245, 0.1);
  margin: 6px 0 6px 0;
  padding: 2px 0 8px 0;
  position: relative;
  top: -22px;

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
  position: relative;
  top: 2px;
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
  width: 270px;
  position: absolute;
  left: 28px;
  top: 5px;
  display: inline-block;
}

.login-wrap-bottom .login-wrap-input1 input {
  outline: none;
  font-size: 14px;
  letter-spacing: 1px;
  word-spacing: 1px;
  border: none;
  width: 100%;
  color: black;
  background-color: transparent !important;
  position: relative;
  font-weight: 400;
}

.login-wrap-bottom .input_hover {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 1px;
  width: 0%;
  background-color: rgb(45, 183, 245);
  transition: all 0.3s ease;
}

.forget-password {
  position: absolute;
  width: 55px;
  right: 20px;
  bottom: 104px;
  color: rgba(155, 155, 155, 1);
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.login-wrap-bg .forget-password {
  bottom: 100px;
}

.login-wrap-md .forget-password {
  bottom: 96px;
}

.zhuce {
  right: unset;
  left: 28px;
}

.forget-password:hover {
  color: rgba(122, 122, 122, 1);
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
  border-color: rgba(255, 255, 255, 0) transparent transparent transparent;
  transform: rotate(-135deg);
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
  border-color: rgba(255, 255, 255, 0) transparent transparent transparent;
  transform: rotate(45deg);
  position: absolute;
  left: -28px;
  bottom: -28px;
}
</style>
