<template>
<div class="upload-alert">
    <div class="upload-file" style="background:#eeeeee;border:1px solid #00ccee">
        <input type="file" name="file" id="updatafiles" :value="fileValue" @change="updatafile" multiple accept="image/png, image/jpeg, image/gif"/>
        <p>{{ btnShowText }}</p>
    </div>
    <!-- <p class="video-alert-ps">视频文件格式为mp4、avi、rm、rmvb、wmv格式，视频限制大小为1G</p> accept="image/gif, image/jpeg" -->
    <!-- <p class="video-alert-tit">已导入文件</p> .mp4,.avi,.rm,.rmvb,.wmv
    <div class="video-list">
        <span class="on" v-for="(item, index) in upVideoList" v-if="upVideoList.length>0">
            <font class="bg" :style="{ width: percentArr[index]['process'] + '%' }"></font>
        <font class="content" :title="item.name">{{item.name}}</font>
        <font class="percent">{{percentArr[index]['process']?percentArr[index]['process']:0}}%</font>
        <i class="iconfont icon-xinzengyonghu_jianqu" @click="videoupDel(index)"></i>
        </span>

    </div>
    <p class="video-alert-tit mt10">备注</p>
    <textarea name="video-alert-textarea" v-model="remark" class="video-alert-textarea"></textarea>
    <div class="textarea-num">
    <span v-text="textareaValLen"></span>/50
    </div>

    <button class="submit" id="editSubmit" v-show="!btnShow" @click="sure()">确认</button>
    <p  id="editSubmit" class="submit disable" v-show="btnShow">
    <img src="/static/resource/gaoyou/img/log.gif"  class="dis-img">{{btnShowText}}
    </p> -->
</div>
</template>
<script>

import Vue from "vue";

export default {
    name: "aliyun_upload",
    props: {},
    data: function() {
        return {
            fileValue:'',
            upVideoList:[],
            videoIdList:[],
            uploadAddress:[],
			remark: '备注',
            uploaders:null,
            uploadAuth:"",
            textareaValLen:0,

            btnShow:false,
            btnShowText:"上传文件",
        };
    },
    created() {},
    computed: {},
    mounted() {
        this.initUploader();
    },
    methods: {
        updatafile(event) {
            let addCount = 0;
            let videoListTemp = [];
            let fileArrLength = event.target.files.length;
            let limitSize = 1073741824;//1024*1024*1024 = 1G

            console.log("event.target.files");
            console.log(event.target.files);
            //文件格式判断
            for(let file of event.target.files){
                if (file.size > limitSize){
                    this.btnShowText = "最大上传视频文件为1G，请重新选择！" + file.name;
                    //this.$message({message:"最大上传视频文件为1G，请重新选择！",type:'warning'});
                    return;
                }
                let videoName = file.name.toLowerCase();
                //let cux = 'mp4、avi、rm、rmvb、wmv';
                let cux = 'png、jpg、jpeg、gif、bmp';
                let curStr = videoName.split('.')[1];
                if (cux.indexOf(curStr) == -1){
                    this.btnShowText = "支持文件格式为:" + cux + ", 不支持的格式:" + file.name;
                    //this.$message({message:"视频文件格式为mp4、avi、rm、rmvb、wmv格式,请重新选择！",type:'warning'});
                    return;
                }
            }//end for

	        for (let i=0; i<event.target.files.length; i++) {
                let uploadInfo = event.target.files[i]
                uploadInfo['videoInfo'] = {
                    Title: uploadInfo.name.split(".")[0]
                };
                uploadInfo['file'] = {
                    name: uploadInfo.name
                }
                var userData = '{"Vod":{"UserData":{"IsShowWaterMark":"false","Priority":"7"}}}';
                videoListTemp.push(uploadInfo);
                this.uploaders.addFile(uploadInfo, null, null,null, userData);

                this.$store.dispatch('getUploadAuth', {
                    "fileName":uploadInfo.name,
                    "remark":this.remark,
                    "title":uploadInfo.name.split(".")[0],
                }).then((response) => {
                    // let closeDom = document.querySelectorAll(".close-by-del");
                    // if (closeDom.length>0){
                    //     closeDom[0].style.display = "none";
                    // }
                    console.log("response");
                    console.log(response);
                    if (response.data != null) {
                        this.uploadAuth = response.data.uploadAuth;
                        this.uploadAddress.push(response.data.uploadAddress);
                        this.videoId = response.data.videoId;
                        this.videoIdList.push(response.data.videoId);
                        // this.btnShowText = '视频上传中，请稍后。。。';
                        // this.btnShow = true;
                        let json = {};
                        json={name:videoListTemp[addCount].name,id:response.data.videoId};
                        let percentArrJson = {};
                        percentArrJson = {process:0,id:response.data.videoId,name:videoListTemp[addCount].name};
                        //Vue.set(this.upVideoList, this.upVideoList.length, json);
                        //Vue.set(this.percentArr, this.percentArr.length, percentArrJson);
                        addCount++;
                        if(addCount == fileArrLength){
                            this.uploaders.startUpload();	//开始上传
                        }
                    } else {
                        this.btnShowText = response.msg;
                    }
                }, (error) => {
                    console.log("error");
                    console.log(error);
                });

            }//end for
    	},
        initUploader() {
            this.btnShowText = '';
            this.btnShow = false;
            this.yy=0;
            this.currId = 0;
            this.upVideoList = [];
            this.percentArr = [];
            this.videoIdList = [];
            this.remark = '';
            if (this.uploaders){
               this.uploaders.cleanList();
            }
            let that = this;
	        var uploader = new AliyunUpload.Vod({
                //分片大小默认1M，不能小于100K
                partSize: 504857,
                //并行上传分片个数，默认5
                parallel: 5,
                //网络原因失败时，重新上传次数，默认为3
                retryCount: 3,
                //网络原因失败时，重新上传间隔时间，默认为2秒
                retryDuration: 2,
                 // 开始上传事件
                'onUploadstarted' (uploadInfo) {
				    console.log("onUploadstarted");
				    console.log(uploadInfo);
	                if (!uploadInfo.videoId) {//这个文件没有上传异常
			            uploader.setUploadAuthAndAddress(uploadInfo, that.uploadAuth, that.uploadAddress[that.currId],that.videoIdList[that.currId]);
                        that.currId = that.currId + 1;
			        } else {
                        //如果videoId有值，根据videoId刷新上传凭证
			            uploader.setUploadAuthAndAddress(uploadInfo, that.uploadAuth, that.uploadAddress[that.currId]);
			        }

				    },
				    // 文件上传成功
				'onUploadSucceed' (uploadInfo) {
				    console.log("onUploadSucceed");
				    console.log(uploadInfo);
                    //that.initWebScoket(uploadInfo.videoId);
				},
				// 文件上传失败
				'onUploadFailed' (uploadInfo, code, message) {
				    console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
				},
				// 文件上传进度，单位：字节
				'onUploadProgress' (uploadInfo, totalSize, loadedPercent) {
				    console.log("onUploadProgress");
				    if (that.upVideoList.length == 0) {
                        return false;
                    }
                },
				// 上传凭证超时
				'onUploadTokenExpired' (uploadInfo) {
				    console.log("onUploadTokenExpired");
				    //上传方式1  实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
				    uploader.resumeUploadWithAuth(uploadAuth);

				},
				//全部文件上传结束
				'onUploadEnd' (uploadInfo){
				    console.log("onUploadEnd: uploaded all the files");
				    console.log(uploadInfo);
				}
			});
			this.uploaders=uploader
    	},
        videoupDel(index) {
        let that = this;
    		this.$store.dispatch('videoDel', {
					videoId: that.videoIdList[index]
				}).then((data) => {
          if(data.code != 200){
            this.$message({message:data.msg,type:'error'});
            return false;
          }
          if(that.yy>index){
            that.yy = that.yy - 1;
            this.currId = this.currId - 1;
          }
          that.percentArr.splice(index,1);
          that.upVideoList.splice(index,1);
          that.videoIdList.splice(index,1);
          that.uploadAddress.splice(index,1);
          that.uploaders.cancelFile(index);
          that.uploaders.deleteFile(index);
          if(that.upVideoList.length == 0){
            that.btnShowText = '';
            that.btnShow = false;
            that.upVideoList = [];
            that.videoIdList = [];
            that.percentArr = [];
            that.yy = 0
            that.uploaders.cleanList();
            return false;
          }
          let flag = true;
          for(let x of that.percentArr){
              if(x['process'] != 100){
                flag = false;
              }
          }
          if(flag){
             that.btnShowText = '';
             that.btnShow = false;
          }
				}, (error) => {
          this.$message({message:"网络异常，请稍后再试!",type:'error'});
				});
    	},
    },
    watch:{
        remark(newV,oldV){ //计算字数
            let str = newV;
            let len = 0;
            let charArr = [];
            let chinaeseArr = [];
            for (var i=0; i<str.length; i++) {
                var c = str.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                    charArr.push(c);
                }else {
                    chinaeseArr.push(c);
                }
            }
            if(charArr.length%2 == 0){
                this.textareaValLen = charArr.length/2+chinaeseArr.length;
            }else{
                this.textareaValLen = (charArr.length+1)/2+chinaeseArr.length;
            }
            if(this.textareaValLen >50){
                this.remark = oldV;
            }
        }
    },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
