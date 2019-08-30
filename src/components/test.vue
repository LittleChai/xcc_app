<template id='test'>
  <div class="test">
    <!-- <button v-on:click="changeChild">改变数据</button>
    <div>从子组件传过来的值是: {{childData1}}</div>
    <button @click="changeROuter">切换路由</button>

    <button @click="$store.commit('getText1')">获得数据:</button>
    <span>text1: {{text1}}</span>

    <div class="div1">
      <h1>
        哈哈哈
        <a href="##">嘻嘻嘻</a>
      </h1>
      <h2>
        啦啦啦
        <a href="##">嘻嘻嘻</a>
      </h2>
      <h3>
        呵呵呵
        <a href="##">嘻嘻嘻</a>
      </h3>
    </div> -->

    

    <div class="chooseImg">
        <span>录制视频</span>	
        <input type="file" accept="video/mp4" id="fileUpload" @change="uploadVideo($event)" />
    </div>


    <div class="chooseImg">
        <span>选择图片</span>	
        <input type="file" accept=".jpg, .png" id="uploadImg" @change="uploadImg($event)" />
    </div>
    
    <img :src="imgBase64" alt="">
    <video src="videoUrl"></video>

    <video controls src="../../../V90827-140336.mp4"></video>
    <!-- <chart :childData="childData" class="echarts" @toFatherFn="getToFatherData"></chart> -->
  </div>
</template>>

<script>
import chart from "./chart.vue";


export default {
  name: "test",
  components: {
    chart
  },
  data() {
    return {
      // childData: [80,60,30,12,57,39]
      childData: [5, 20, 36, 10, 10, 20],
      childData1: "",
      text1: "",
      imgBase64: '',
      videoUrl: ''
    };
  },
  methods: {
    uploadImg(e) {
      let that = this;
      const vm = this;
      let file = e.target.files[0];
      let param = new FormData(); // 创建form对象
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      //解决ios拍照照片自动旋转问题
      this.getOrientation(file, function(orientation) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(evt) {
          const base64 = evt.target.result;
          // 将图片旋转到正确的角度 并压缩
          that.resetOrientation(base64, orientation, function(resultBase64) {
            //   console.log(resultBase64)
            that.imgBase64 = resultBase64;
            that.b64toBlob(resultBase64, function(blob) {
                // console.log(blob)
            //   param.append("file", blob); // 通过append向form对象添加数据
            //   //调用接口上传图片
            //   return registerFace(param, config).then(res => {
            //     // 上传成功逻辑
            //   });
            });
          });
        };
      });
    },

    //  获取图片的角度
    getOrientation(file, callback) {
        let that = this;
      this.EXIF.getData(file, function() {
        var orientation = that.EXIF.getTag(this, "Orientation");
        return callback(orientation);
      });
    },

    resetOrientation(srcBase64, srcOrientation, callback) {
      const img = new Image();
      img.onload = function() {
        const width = img.width,
          height = img.height,
          canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        // 判断图片尺寸压缩一定比率
        const big = img.width > img.height ? img.width : img.height;
        let rate = 1;
        if (big > 840) {
          rate = 840 / big;
        }
        canvas.width = width * rate;
        canvas.height = height * rate;
        // 安卓机不需要矫正图片
        if (srcOrientation && srcOrientation !== 1) {
          // 判断图片方向，压缩并矫正
          ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, this.width, this.height);
          switch (srcOrientation) {
            // 当图片旋转180°时
            case 3:
              ctx.rotate(Math.PI);
              ctx.drawImage(
                this,
                -this.width * rate,
                -this.height * rate,
                this.width * rate,
                this.height * rate
              );
              break;
            // 当图片旋转90°时
            case 6:
              canvas.width = this.height * rate;
              canvas.height = this.width * rate;
              ctx.rotate(Math.PI / 2);
              // (0,-imgHeight) 从旋转原理图那里获得的起始点
              ctx.drawImage(
                this,
                0,
                -this.height * rate,
                this.width * rate,
                this.height * rate
              );
              break;
            // 当图片旋转270°时
            case 8:
              canvas.width = this.height * rate;
              canvas.height = this.width * rate;
              ctx.rotate((3 * Math.PI) / 2);
              ctx.drawImage(
                this,
                -this.width * rate,
                0,
                this.width * rate,
                this.height * rate
              );
              break;
            default:
              ctx.drawImage(
                img,
                0,
                0,
                width,
                height,
                0,
                0,
                width * rate,
                height * rate
              );
          }
        } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
          ctx.drawImage(
            img,
            0,
            0,
            width,
            height,
            0,
            0,
            width * rate,
            height * rate
          );
        }
        // 返回 base64
        callback(canvas.toDataURL("image/jpeg"));
      };
      img.src = srcBase64;
    },

    b64toBlob(b64, onsuccess, onerror) {
      let img = new Image();
      img.onerror = onerror;
      img.onload = function onload() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let width = img.width;
        let height = img.height;
        let ctx = canvas.getContext("2d");
        let rate = 1;
        ctx.drawImage(
          img,
          0,
          0,
          width,
          height,
          0,
          0,
          width * rate,
          height * rate
        );
        canvas.toBlob(onsuccess);
      };
      img.src = b64;
    },

    uploadVideo(e) {
      //e.target.value文件名
      var file = e.target.files[0];
      var formdata = new FormData();
      formdata.append("fileStream", file);
      console.log(file)
    //   console.log("正在上传视频...");
      // this.doUpload(formdata);
    },

    getStore() {
      // console.log(this.$store.getText1())
    },

    changeROuter() {
      this.$router.push({
        path: "/login",
        query: {
          id: "login",
          text: "我是参数"
        }
      });
    },
    getToFatherData(val1) {
      console.log(val1);
      this.childData1 = val1;
    },
    changeChild() {
      console.log(11);
      this.childData = [80, 60, 30, 12, 57, 39];
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
      console.log(this.EXIF.getTag)
    console.log(this.$route.params.id);
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>


<style scoped lang='scss'>

.chooseImg {
    width: 200px;
    height: 35px;
    background-color: white;
    color: black;
    position: relative;
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(88,88,88,0.2);
    margin: 5px auto;
    cursor: pointer;

    span {
        display: inline-block;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        line-height: 35px;
        position: absolute;
    }

    input {
        display: inline-block;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        line-height: 35px;
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
}


video {
  width: 400px;
}








// 分割



$redColor: red;
$blueColor: blue;

$blueBorder: 1px solid $blueColor;

.test {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgb(222, 222, 222);
  overflow-y: auto;
  color: $blueColor;
}

.echarts {
  position: absolute;
  width: 600px;
  height: auto;
  right: 0;
  top: 20px;
  border: $blueBorder;
}

.div1 {
  width: 500px;
  height: 300px;
  margin: 20px;

  h1,
  h2,
  h3 {
    color: black;
    font-size: 20px;
    padding: 3px;
  }

  h1 a {
    &:hover {
      color: pink;
    }
  }
}
</style>