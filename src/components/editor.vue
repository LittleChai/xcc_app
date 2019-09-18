<template id='editor'>
  <div class="editor">
    <!-- <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor> -->

    <div id="editor" class="editor1"></div>
  </div>
</template>        

<script>
// require styles
import E from "wangeditor";

// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// import { quillEditor } from "vue-quill-editor";

// const toolbarOptions = [
//   ["bold", "italic", "underline", "strike"], // toggled buttons
//   ["blockquote", "code-block"],

//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: "ordered" }, { list: "bullet" }],
//   [{ script: "sub" }, { script: "super" }], // superscript/subscript
//   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//   [{ direction: "rtl" }], // text direction

//   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],

//   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//   [{ font: [] }],
//   [{ align: [] }],
//   ["link", "image", "video"],
//   ["clean"] // remove formatting button
// ];

export default {
  name: "editor",
  components: {
    // quillEditor
  },
  data() {
    return {
      content: "<p>write something</p>",
      // editorOption: {
      //   modules: {
      //     toolbar: {
      //       container: toolbarOptions, // 工具栏
      //       handlers: {
      //         image: function(value) {
      //           if (value) {
      //             alert("自定义图片");
      //           } else {
      //             this.quill.format("image", false);
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorReady() {},
    onEditorChange() {
      //内容改变事件
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    var editor = new E("#editor");
    editor.customConfig.onchange = html => {
      this.formArticle = html;
    };
    editor.customConfig.uploadImgServer = "<%=path%>/Img/upload"; //上传URL
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.uploadFileName = "myFileName";
    editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        var url = result.data;
        insertImg(url);

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
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

.editor1 {
  width: 100%;
  height: 100%;
  /* border: 1px solid white; */
  /* margin-top: 10px; */
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); */
}

.w-e-toolbar .w-e-menu i {
  color: white!important;
}

.w-e-toolbar {
  background-color: white!important;
}
</style>