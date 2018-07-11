<template>
    <!-- <div style="border:1px solid #0000cc;"> -->
    <!-- <div class="mainContainer"> -->
    <video id="videoElement" class="centeredVideo" loop autoplay>Your browser is too old which doesn't support HTML5 video.</video>
    <!-- <div class="controls">
            <button @click="flv_start()">开始</button>
            <button @click="flv_pause()">暂停</button>
            <button @click="flv_destroy()">停止</button>
            <input style="width:100px" type="text" name="seekpoint" />
            <button @click="flv_seekto()">跳转</button>
        </div>
    </div> -->
    <!-- </div> -->
</template>
<script>
//import flvjs from "./flv.min.js";
import "./flv.min.js";

export default {
    name: "sh-flvplayer",
    props: {
        url: "",
        color: {
            type: String,
            default: "#00cc66"
            
        }
    },
    computed: {
        styles() {
            return {
                background: this.color
            };
        }
    },
    methods: {
        openflvVideo(new_Url) {
            console.log("new_Url");
            console.log(new_Url);
            if (new_Url != "") {
                this.saveURL = new_Url;
                this.resizeVideoContainer("videoElement");
                this.videoPlayer = document.getElementById("videoElement");
                if (flvjs.isSupported()) {
                    this.flvPlayer = flvjs.createPlayer({
                        type: "flv",
                        isLive: true,
                        url: new_Url //"http://10.17.11.133:7001/live/a.flv"
                    });
                    this.flvPlayer.attachMediaElement(this.videoPlayer);
                    this.flvPlayer.load(); //加载
                }
            }
        },
        resizeVideoContainer(e) {
            var doc = document.getElementById(e);
            doc.style.width = doc.parentNode.clientWidth + "px";
            doc.style.height = doc.parentNode.clientHeight + "px";
            console.log(doc.style.width + "," + doc.style.height);
        },

        flv_start() {
            this.flvPlayer.play();
        },

        flv_pause() {
            this.flvPlayer.pause();
        },

        flv_destroy() {
            this.flvPlayer.pause();
            this.flvPlayer.unload();
            this.flvPlayer.detachMediaElement();
            this.flvPlayer.destroy();
            this.flvPlayer = null;
        },

        flv_seekto() {
            this.flvPlayer.currentTime = parseFloat(
                document.getElementsByName("seekpoint")[0].value
            );
        },

        handleClick(e) {
            this.$emit("click", e);
        }
    },
    mounted() {
        this.$nextTick(function() {
            console.log("nextTick");
            this.openflvVideo(this.url);
        });
    },
    data: function() {
        return {
            saveURL: "",
            videoPlayer: {},
            flvPlayer: {}
        };
    }
};
</script>
<style scoped>
.centeredVideo {
    border: 1px solid #cccccc;
    width: 100%; 
    height:100%; 
    object-fit: fill;
    border-radius: 5px;
}
</style>

