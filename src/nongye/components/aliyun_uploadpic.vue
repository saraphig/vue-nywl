<template>
<div class="upload-alert" style="text-align:center">
    <h4>您所选择的文件列表：</h4>
    <div id="ossfile" style="display:inline-block;width:50%;border:1px solid #eeeeee">
        <div class="ossfilelist" v-for="(item, index) in ossfilelist" id="' + item.id + '" >
            <span class="fileclass">{{ item.name }}</span>
            <span class="fileclass">({{ item.size }})</span>
            <div class="progress"><div class="progress-bar" :style="progress(item.pos)">
                <span class="progress-text" v-if="item.pos > 0">{{ item.pos }}%</span>
            </div><br />
        </div>
    </div>

    <br/>

    <div id="container-upload">
        <a id="selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
        <a id="postfiles-upload" href="javascript:void(0);" class='btn'>开始上传</a>
    </div>
    <img :src="resImgSrc" class="uploadimg">

    <pre id="console-upload"></pre>
    </div>
    
</div>
</template>
<script>

import Vue from "vue";
//import upLoad from "../views/page_monitor/vue-file-upload"

export default {
    name: "aliyun_uploadpic",
    components: {
        //upLoad
    },
    props: {},
    data: function() {
        return {
            stokeUrl:"", //阿里云地址
            uploader:null,
            accessKeyId:'',
            accessKeySecret:'',
            stsToken:'',
            bucket:'',
            region:'',
            //picHost:'',
            picDir:'',
            picEndpoint:'',
            g_dirname:'',
            g_object_name:'',
            g_object_name_type:'',
            timestamp:"",
            policyBase64:"",
            signature:"",
            ossfilelist:[],
            fileValue:'',

            resImgSrc :"",
        };
    },
    created() {},
    computed: {
        
    },
    mounted() {
        //console.log("inituploader");
        this.inituploader();
    },
    methods: {
        progress(pos) {
            let ww = 200 * pos / 100;
            console.log(ww);            
            return { width: ww + "px"};
        },
        /*uploadImageFile(){     //采用原生ajax尝试 未测试
            var xhr = new XMLHttpRequest();
            //定义表单变量    
            var file = document.getElementById('formUploadfile');    
            console.log(file);
            //新建一个FormData对象    
            var formData = new FormData();
            //追加文件数据    
            // for(let i = 0 ;i < file.length;i ++){      
            //     formData.append("file["+i+"]", file[i]);
            // }     
            console.log(formData);
            let uploadUrl = "http://10.17.5.117:9004/agriculture/testuploadimg/";
            //post方式    
            xhr.open('POST', uploadUrl); 
            //发送请求    
            xhr.send(formData);
            //success回调    
            xhr.onreadystatechange = () => {
                if ( xhr.readyState == 4 && xhr.status == 200 ) {
                    console.log( xhr.responseText );    
                    var data = xhr.responseText;
                    data = JSON.parse(xhr.responseText)    
                    if (data.code == 100) {
                        //insertPhotoList(data.userPhotos); 这里传过来的是一个List<model>，做页面逻辑处理的
                    } else if (data.code == 101) {
                                //aler('上传图片不符合要求');
                    } else if (data.code == 102){
                                var update_vip_url = 'update_vip_url';
                               // alert('您目前是普通会员，图片文件不可超过5M|升级会员可上传更大文件立即升级会员');
                    } else if (data.code == 103) {
                                //alert('您目前是VIP会员，图片文件不可超过50M');
                    }
                }
            };
            //设置超时时间    
            xhr.timeout = 100000;    
            xhr.ontimeout = function(event){}
        },*/
        /*uploadPicFile(event) { //石巍的上传服务，测试成功
            let selfform = document.getElementById("formUploadfile");
            //var formData = new FormData();
            //formData.append('file', $('#file')[0].files[0]);
            let formdata = new FormData(selfform);
            formdata.append('file',event.target.files[0],event.target.files[0].name);
            let config = {  
                headers:{'Content-Type':'multipart/form-data'}  
            };  //添加请求头
            console.log(formdata);
            console.log(event.target.files[0]);
            //formdata.append('action','/testuploadimg');
            this.$http.post('/agriculture/testuploadimg/',formdata,config)  //http://10.17.5.117:9004/
                .then(response=>{  
                    // var ret = response.data;  
                    console.log(response);
                    if(response.status){  
                        
                        // this.$message({  
                        //     message : '新增成功',  
                        //     type : 'success'  
                        // })  
                        //清空数据  
                        this.resImgSrc = response.data;  
                        this.files = [];  
                    }else{  
                        //this.msg(ret.msg);  
                    }  
                })
            // this.$store.dispatch("uploadPicFile", formdata).then(
            //     response => {
            //         console.log("uploadPicFile response");
            //         console.log(response);
            //     },
            //     error => {
            //         console.log(
            //             "[uploadPicFile] error:%c" + error,
            //             "color:red"
            //         );
            //     });
        },*/
        check_object_radio() {
            this.g_object_name_type = "local_name"; //上传文件名字保持本地文件名字 local_name 上传文件名字是随机文件名 random_name
        },
        get_dirname() {
            this.g_dirname = this.picDir
        },
        random_string(len) {
        　　len = len || 32;
        　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
        　　var maxPos = chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
            　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        get_suffix(filename) {
            let pos = filename.lastIndexOf('.')
            let suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        },
        calculate_object_name(filename) {
            if (this.g_object_name_type == 'local_name')
            {
                this.g_object_name += filename;//"${filename}"
            }
            else if (this.g_object_name_type == 'random_name')
            {
                let suffix = this.get_suffix(filename)
                this.g_object_name = this.g_dirname + random_string(10) + suffix
            }
            return ''
        },
        get_uploaded_object_name(filename)
        {
            if (this.g_object_name_type == 'local_name')
            {
                let tmp_name = this.g_object_name;
                tmp_name = tmp_name.replace("${filename}", filename);
                return tmp_name;
            }
            else if(this.g_object_name_type == 'random_name')
            {
                return this.g_object_name;
            }
        },
        set_upload_param(up, filename, ret) {
            this.g_object_name = this.g_dirname;
            if (filename != '') {
                let suffix = this.get_suffix(filename)
                this.calculate_object_name(filename)
            }
            let new_multipart_params = {
                'key' : this.g_object_name,
                'policy': this.policyBase64,
                'OSSAccessKeyId': this.accessKeyId, 
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'signature': this.signature,
            };

            up.setOption({
                'url': this.stokeUrl,
                'multipart_params': new_multipart_params
            });

            up.start();
        },
        inituploader(){
            if (this.uploader){
            //    this.uploader.cleanList();
            }
            console.log("getUploadPicAuth");
            
            this.$store.dispatch('getUploadPicAuth', {
            }).then((response) => {
                console.log("response");
                console.log(response);
                if (response.data != null) {
                    this.accessKeyId     = response.data.picAccessKeyId;
                    this.accessKeySecret = response.data.picAccessKeySecret;
                    this.stsToken        = response.data.policy;
                    this.bucket          = response.data.picBucket;
                    this.region          = "oss-cn-hangzhou",//response.data.region;
                    this.stokeUrl        = response.data.picHost;
                    this.picDir          = response.data.picDir;
                    this.picEndpoint     = response.data.picEndpoint;
                    this.g_dirname = this.picDir;

                    // this.accessKeyId = '6MKOqxGiGU4AUk44';
                    // this.accessKeySecret = 'ufu7nS8kS59awNihtjSonMETLI0KLy';
                    // this.stokeUrl = 'http://post-test.oss-cn-hangzhou.aliyuncs.com';

                    this.accessKeyId = 'LTAIT5kupZlaUTzI';
                    this.accessKeySecret = 'N3AdgqDBb4RJYAPuKU9n6UbCwDkTJy';
                    this.stokeUrl = 'http://ny-dev.oss-cn-hangzhou.aliyuncs.com';
                    //this.stokeUrl = 'http://10.17.11.21:8080/user/testuploadimg';

                    this.timestamp = Date.parse(new Date()) / 1000; 
                    let policyText = {
                        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                        "conditions": [
                            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
                        ]
                    };

                    this.policyBase64 = Base64.encode(JSON.stringify(policyText))
                    let message = this.policyBase64;
                    let bytes = Crypto.HMAC(Crypto.SHA1, message, this.accessKeySecret, { asBytes: true }) ;
                    this.signature = Crypto.util.bytesToBase64(bytes);
                    var that = this;
                    this.uploader = new plupload.Uploader({
                        runtimes : 'html5,html4',//,flash,silverlight
                        browse_button : 'selectfiles', 
                        bucket: that.bucket,
                        region: that.region,
                        endpoint: that.picEndpoint,
                        //multi_selection: false,
                        container: document.getElementById('container-upload'),
                        //flash_swf_url : '/static/resource/nongye/js/lib/plupload-2.1.2/js/Moxie.swf',
                        //silverlight_xap_url : '/static/resource/nongye/js/lib/plupload-2.1.2/js/Moxie.xap',
                        url : 'http://oss.aliyuncs.com', //that.stokeUrl,//

                        init: {
                            PostInit: function() {
                                that.ossfilelist = [];
                                //document.getElementById('ossfile-upload').innerHTML = '';
                                document.getElementById('postfiles-upload').onclick = function() {
                                    console.log("postfiles-upload");
                                    that.set_upload_param(that.uploader, '', false);
                                    return false;
                                };
                            },

                            FilesAdded: function(up, files) {
                                console.log("FilesAdded");
                                console.log(files);
                                let tmpifo = {};
                                plupload.each(files, function(file) {
                                    tmpifo = { id:file.id, name:file.name, size:plupload.formatSize(file.size), pos:0 };
                                    that.ossfilelist.push(tmpifo);
                                    // document.getElementById('ossfile-upload').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                                    // +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                                    // +'</div>';
                                });
                            },

                            BeforeUpload: function(up, file) {
                                console.log("BeforeUpload");
                                console.log(file);
                                that.check_object_radio();
                                that.get_dirname();
                                that.set_upload_param(up, file.name, true);
                            },

                            UploadProgress: function(up, file) {
                                console.log("UploadProgress");
                                for (let i = 0; i < that.ossfilelist.length; i ++){
                                    if (that.ossfilelist[i].id == file.id) {
                                        that.ossfilelist[i].pos = file.percent; 
                                    }
                                }
                                //console.log(file.percent);
                                // var d = document.getElementById(file.id);
                                // d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                                // var prog = d.getElementsByTagName('div')[0];
                                // var progBar = prog.getElementsByTagName('div')[0]
                                // progBar.style.width= 2*file.percent+'px';
                                // progBar.setAttribute('aria-valuenow', file.percent);
                            },

                            FileUploaded: function(up, file, info) { //上传成功
                                console.log("FileUploaded");
                                console.log(file);
                                console.log(info);
                                console.log(info.status);
                                if (info.status == 200)
                                { 
                                    let Objname = that.get_uploaded_object_name(file.name);
                                    let ResImgUrl = "http://" + that.bucket + ".oss.aliyuncs.com/" + Objname;
                                     console.log(Objname);
                                     console.log(ResImgUrl);
                                     that.resImgSrc = ResImgUrl;
                                     for (let i = 0; i < that.ossfilelist.length; i ++){
                                        if (that.ossfilelist[i].id == file.id) {
                                            that.ossfilelist.splice(i,1); 
                                        }
                                    }
                                    // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
                                }
                                else
                                {
                                    console.log(info.response);
                                    // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                                } 
                            },

                            Error: function(up, err) {
                                console.log(err);
                                console.log(err.response);
                                // document.getElementById('console-upload').appendChild(document.createTextNode("\nError xml:" + err.response));
                            }
                        }
                    });

                    this.uploader.init();

                    /*this.uploader = new OSS.Wrapper({
                        region: this.region,
                        accessKeyId: this.accessKeyId,
                        accessKeySecret: this.accessKeySecret,
                        stsToken: this.stsToken,
                        endpoint: 'aliyuncs.com',
                        bucket: this.bucket, //文件名称
                    });*/

                } else {
                    //this.btnShowText = response.msg;
                }
            }, (error) => {
                console.log("error");
                console.log(error);
            });
        },
        uploadfile(event) {

            let filesCount = event.target.files.length;
             console.log("event.target.files");
            console.log(event.target.files);
            if (filesCount > 0) {
                let file = event.target.files[0];
                console.log(file);
                console.log(event);
                //console.log(this.fileValue);
                
                let storeAs = this.picDir;//this.picDir + '/' + aliyuncs.com
                //图片名
                storeAs = file.lastModified + "_" + file.name; //.substr(0,file.name.indexOf(".")); //所要上传的文件名拼接 (test/)
                console.log("storeAs");
                console.log(storeAs);
                // console.log(this.uploader);

                this.uploader.multipartUpload(storeAs, file).then((result) => {
                    console.log("上传成功");
                    console.log(result);
                    //获得图片地址
                    //var src = 'https://www.treeholeapp.com/' + result.name;
                }).catch(function(err) {
                        console.log("上传失败");
                        console.log(err);
                });
            } else {
                console.log("上传文件列表为空!");
                
            }
        },
    },
    watch:{
    },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .uploadimg{
        width 50%
        height auto
        border 0px
        margin-top 30px
    }
	.btn{
        color: #fff;
	    background-color: #337ab7;
	    border-color: #2e6da4; 
	    display: inline-block;
	    padding: 6px 12px;
	    margin-bottom: 0;
	    font-size: 14px;
	    font-weight: 400;
	    line-height: 1.42857143;
	    text-align: center;
	    white-space: nowrap;
	    text-decoration: none;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    background-image: none;
	    border: 1px solid transparent;
	    border-radius: 4px;
	}
	a.btn:hover{
      background-color: #3366b7;
	}
	.progress{
        display: inline-block;
        text-align:center;  
		// margin-top:2px;
	    width: 200px;
	    height: 14px;
	    // margin-bottom: 10px;
	    overflow: hidden;
	    background-color: #f5f5f5;
	    border-radius: 4px;
	    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
	    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
        
        .progress-text {
            display: inline-block;
            font-size: 11px;
            line-height: 14px;
            padding 0px
        }
	}
    
	.progress-bar{ 
		background-color: rgb(92, 184, 92);
		background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
		background-size: 40px 40px;
		box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		display: block;
		float: left; 
		font-size: 11px;
		height: 14px;
		line-height: 14px;
		text-align: center;
		transition-delay: 0s;
		transition-duration: 0.6s;
		transition-property: width;
		transition-timing-function: ease;
		// width: 266.188px;
	}
    .ossfilelist {
        width 100%
        text-align:left;
        white-space nowrap 
        vertical-align middle
        .fileclass {
           vertical-align middle
        }
    }
</style>
