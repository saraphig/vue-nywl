<template>
  <div class="sh-upload-image" :id="id">
    <slot></slot>
  </div>
</template>
<script>
import uplaodjs from "../../../static/resource/nongye/js/lib/plupload-2.1.2/js/plupload.full.min.js";
import { _get, _post, _delete, _put } from "@lib/js/http";

export default {
  name: "ShUploadImage",
  componentName: "ShUploadImage",
  props: {
    id: {
      type: String,
      default() {
        let uuid = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function(
          c
        ) {
          let r = (Math.random() * 16) | 0;
          let v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
        return "upload_" + uuid;
      }
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      uploader: null,
      params: {}
    };
  },
  methods: {
    uploadImage(up, files) {
      let that = this;
      this.$store.dispatch("getUploadParams").then(
        data => {
          let array = files[0].name.split(".");
          data["key"] = `picture/${data.UUID}.${array[array.length - 1]}`;
          data["success_action_status"] = `200`;
          data["callback"] = ``;
          up.setOption({
            url: data.host,
            multipart_params: data
          });
          that.params = data;

          up.start();
        },
        error => {
          console.log(error);
          alert("获取信息失败，后台系统错误！");
        }
      );
    },
    initUploadOptions() {
      let that = this;
      let maxSize = parseInt(this.options.filters.max_file_size);
      // 定义内部默认参数
      let uploadOptions = {
        runtimes : 'html5,html4',
        browse_button: this.id,
        url: "file",
        multipart_params: {},
        multi_selection: false,
        // 初始化绑定事件
        init: {
          // 上传成功回调操作
          FileUploaded: function(up, file, info) {
            that.callback();
            // console.log("09999999999999999");
            // that.$emit("callback", `${data.host}/${data.dir}/${data.key}`);
            // console.log(data);
          },
          // 文件选中完成，直接开始上传然后执行回调函数
          FilesAdded: function(up, files) {
            that.uploadImage(up, files);
          },
          // 上传错误处理
          Error: function(up, err) {
            let errMsg;
            switch (err.code) {
              case plupload.FILE_SIZE_ERROR:
                errMsg = "请上传小于" + maxSize + "M大小的图片";
                break;
              case plupload.FILE_EXTENSION_ERROR:
                errMsg = "只能上传jpg、png格式图片";
                break;
              default:
                errMsg = err.response;
            }
            alert(errMsg || "上传图片错误");
          }
        }
      };
      Object.assign(uploadOptions, this.options);
      let uploader = new plupload.Uploader(uploadOptions);
      uploader.init();
    },
    callback() {
      let data = this.params;
      this.$emit("callback", `${data.host}/${data.key}`);
    }
  },
  mounted() {
    this.initUploadOptions();
  }
};
</script>

<style scoped>
.sh-upload-image {
  display: inline-block;
  cursor: pointer;
}
</style>
