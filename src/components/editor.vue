<template id='editor'>
  <div class="editor">
    <div class="editor_title">
      <Input v-model="title" placeholder="请输入文章标题" style="width: 47%" />
      <Input v-model="title1" placeholder="请输入文章副标题" style="width: 47%" />
      <Button class="editor_btn" type="success" style="width: 5%" @click="pull">发布</Button>
    </div>
    <div class="editor_main">
      <v-scroll>
        <div id="editor" class="editor1"></div>
      </v-scroll>
    </div>

    <div class="editor_images_group">
      <v-scroll>
        <div class="editor_images">
          <div class="editor_image editor_image_bg" v-for="(item,index) in blobArr" :key="index">
            <img :src="item.url" alt />
            <Icon class="editor_del" type="md-close" @click="delEditorBlob(index)"/>
            <viewer class="editor_img_view">
              <img :src="item.url" />
            </viewer>
          </div>
          <div class="editor_image" v-if="blobArr.length < 10">
            <img src="../../static/images/add.png" alt />
            <input multiple type="file" accept="image/*" @change="pushImage" />
          </div>
        </div>
      </v-scroll>
    </div>
  </div>
</template>        

<script>
// require styles
import E from "wangeditor";
import { async } from 'q';

import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  Viewer.setDefaults({
    Options: { 'inline': false, 'button': false, 'navbar': false, 'title': false, 'toolbar': false, 'tooltip': false, 'movable': false, 'zoomable': false, 'rotatable': false, 'scalable': false, 'transition': false, 'fullscreen': false, 'keyboard': false, 'url': 'data-source' }
  })  

export default {
  name: "editor",
  components: {
    // quillEditor
  },
  data() {
    return {
      title: "",
      title1: "",
      formArticle: "",
      maxLength: 10,
      blobArr: [],
      fileArr: [],
      upIndex: 0,
      upNum: 0,
      imgs: []
    };
  },
  methods: {
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

    delEditorBlob(index) {
      console.log(index)
      let copyBlobArr = this.blobArr;
      copyBlobArr.splice(index,1);
      this.blobArr = copyBlobArr;

      let copyBlobArr1 = this.fileArr;
      copyBlobArr1.splice(index,1);
      this.fileArr = copyBlobArr1;
    },
    pull() {
      if (this.title == "" || this.title1 == "" || this.formArticle == "") {
        this.$Message.warning("内容请填写完整");
      } else {
        // this.pullArticle();
        this.uploadImages();
      }
    },

    uploadImages() {
      // console.log(this.fileArr[0])
      let that = this;
      let index = 0;
      let allIndex = this.fileArr.length;

      async function ups() {
        if(index < allIndex) {
          await upss();
        }
        else {
          console.log('complete')
        }
      }

      function upss() {
        let f = that.fileArr[index];
        let reader = new FileReader();
        console.log(f)
        reader.readAsDataURL(f);
        reader.onload = function(e) {
          // console.log(e);
          // 获取上传图片名称
          let fileName = f.name;
          let fileType = f.type;
          that.$http
            .post("/uploadImage", {
              s: "App.CDN.UploadImgByBase64",
              uuid: JSON.parse(localStorage.getItem("info")).uuid,
              token: localStorage.getItem("token"),
              file: e.target.result,
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
                that.imgs.push(upUrl);
                index++;
                ups();
              } else {
                that.$Message.warning(res.data.err_msg);
              }
            })
            .catch(res => {
              // console.log(res);
              that.$Message.warning('上传失败');
            });
        };
      }

      ups();


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
            article_title: this.title,
            article_sub_title: this.title1,
            article_post_time: targeDate,
            article_author: JSON.parse(localStorage.getItem("info")).username,
            article_content: this.formArticle,
            article_background: "",
            article_avatar: JSON.parse(localStorage.getItem("info")).ext_info
              .yesapi_avatar,
            update_time: targeDate,
            article_zan: JSON.stringify([]),
            article_star: JSON.stringify([]),
            artcle_images: JSON.stringify(this.imgs),
            ext_data: JSON.stringify({
              showArticle: true
            })
          },
          ext_data: JSON.stringify({
            showArticle: true
          }),
          add_time: targeDate,
          update_time: targeDate
        })
        .then(res => {
          console.log(res);
          if (res.data.err_code == 0) {
            this.$Message.success("发布成功");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    // 把图片push到数组中，方便提交时处理
    pushImage(e) {
      console.log(e);
      let that = this;
      let upArr = e.target.files;
      this.upIndex = 0;
      this.upNum = upArr.length;
      if(this.upNum.length < 1) {
        return false;
      }
      async function ups() {
        if(that.blobArr.length >= 10) {
          that.$Message.warning('最多可以上传10张图片')
        }
        else {
          if(that.upIndex > that.upNum-1) {
            that.$Message.success('完成');
          }
          else {
            await pushAsync(upArr);
          }
        }
      }

      ups();

      function pushAsync(arr) {
        let blob = new Blob([arr[that.upIndex]]);
        let url = URL.createObjectURL(blob);
        let obj = {
          url: url,
          info: arr[that.upIndex]
        }
        that.blobArr.push(obj);
        that.fileArr.push(arr[that.upIndex]);
        that.upIndex++;
        ups();
      }

    },

  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    var editor = new E("#editor");
    editor.customConfig.colors = [
      "#000000",
      "#eeece0",
      "#1c487f",
      "#4d80bf",
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#ffsffs",
      "#ffffff"
    ];
    editor.customConfig.menus = [
      // 'head',  // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.customConfig.onchange = html => {
      this.formArticle = html;
    };
    editor.create();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  watch: {}
};
</script>    

<style scoped>
.editor_title {
  width: 100%;
  height: 36px;
  margin-bottom: 4px;
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
}

.editor_btn {
  margin-right: 6px;
  height: 36px;
  position: relative;
  top: 0px;
  left: 6px;
}

.editor {
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  /* margin-top: 5px; */
  /* box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3); */
  /* background-color: white; */
}

.editor_main {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 125px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.editor1 {
  width: 100%;
  min-height: 100%;
  height: auto;
  position: absolute;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* border: 1px solid white; */
  /* margin-top: 10px; */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); */
}

.editor_images_group {
  position: absolute;
  bottom: 0;
  height: 120px;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.2);
}

.editor_images {
  position: absolute;
  bottom: 0;
  height: 120px;
  left: 0;
  /* right: 0; */
  width: auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  /* background-color: rgba(255, 255, 255, 0.2); */
  /* justify-content: space-between; */
}

.editor_image {
  height: 100px;
  width: 100px;
  position: relative;
  box-sizing: border-box;
  border: 3px solid rgba(255, 255, 255, 1);
  margin: 5px 6px;
  overflow: hidden;
  border-radius: 6px;
  top: -2px;
  /* cursor: pointer; */
}

.editor_image img {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 25%;
  left: 25%;
  z-index: 9;
}

.editor_image input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  opacity: 0;
  cursor: pointer;
}

.editor_image_bg img {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.editor_image .editor_del {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 20;
}

.editor_image .editor_img_view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.w-e-toolbar .w-e-menu i {
  color: white !important;
}

.w-e-toolbar {
  background-color: white !important;
}
</style>