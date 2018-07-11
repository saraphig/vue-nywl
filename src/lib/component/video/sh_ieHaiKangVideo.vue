<template>
    <iframe class="iframe-player" id="show-iframe" frameborder=0 name="showHere" scrolling="false" src=""></iframe>
</template>
<script>
// import $ from 'jquery'
// import $ from "./jquery-1.7.1.min.js";
// import "./webVideoCtrl.js";
// import "./demo.js";

export default {
    name: "sh-ieHKplayer",
    props: {
        url: ""
    },
    computed: {},
    methods: {
        openflvVideo(new_Url) {
            console.log("IE Iframe Show");
            console.log(new_Url);

            if (new_Url != "") {
                this.saveURL = new_Url;
                //alert(new_Url);

                let Iframedoc = document.getElementById("show-iframe");
                Iframedoc.style.display = "inline-block";
                Iframedoc.style.left = "0px";
                Iframedoc.style.top = "0px";
                Iframedoc.style.width = (Iframedoc.parentNode.clientWidth - 10)  + "px";
                Iframedoc.style.height = (Iframedoc.parentNode.clientHeight - 3) + "px";
                //console.log(Iframedoc.style.width + "," + Iframedoc.style.height);
                //Iframedoc.src = "http://127.0.0.1/haikangdemo/demo.html?setup=show&vwidth=" + Iframedoc.style.width + "&vheight=" + Iframedoc.style.height + "&videoIP=" + this.saveURL;
                //Iframedoc.src = "http://127.0.0.1/haikangdemo/demo.html";
                Iframedoc.src = "chrome-extension://hehijbfgiekmjfkfjpbkbammjbdenadd/nhc.htm#url=http://localhost:8686/static/resource/nongye/haikang/VideoDemo1.html";
                //Iframedoc.src = "/static/resource/nongye/haikang/VideoDemo1.html?setup=show&vwidth=" + Iframedoc.style.width + "&vheight=" + Iframedoc.style.height + "&videoIP=" + this.saveURL;
                Iframedoc.src += "?setup=show&vwidth=" + Iframedoc.style.width + "&vheight=" + Iframedoc.style.height + "&videoIP=" + this.saveURL;
                console.log("SRC:" + Iframedoc.src);//699, 471
                console.log(Iframedoc.style.width + "," + Iframedoc.style.height);
                
                Iframedoc.onload = Iframedoc.onreadystatechange = function() {
                    if (this.readyState && this.readyState != "complete")
                        return;
                    else {
                        console.log("699, 471 SRC:" + Iframedoc.src);//699, 471
                        //alert(Iframedoc.src+"\n699, 471");
                        // let Videodoc = iframe.contentWindow.document.getElementById(
                        //     "divPlugin"
                        // );
                        // Videodoc.style.width = Iframedoc.style.width;
                        // Videodoc.style.height = Iframedoc.style.height;
                        // console.log(
                        //     Videodoc.style.width + "," + Videodoc.style.height
                        // );
                    }
                };
            }
        },
        resizeVideoContainer(e) {
            var doc = document.getElementById(e);
            doc.style.width = doc.parentNode.clientWidth + "px";
            doc.style.height = doc.parentNode.clientHeight + "px";
            console.log(doc.style.width + "," + doc.style.height);
        }
    },
    mounted() {
        this.$nextTick(function() {
            // console.log("nextTick");
            // clickLogin();
            // setTimeout(function() {
            //     clickStartRealPlay();
            // }, 1000);
        });
        //this.openflvVideo(this.saveURL);
        //iframe.contentWindow.document.body
    },
    data: function() {
        return {
            saveURL:"10.17.5.99"
        };
    }
};
</script>
<style scoped>
.iframe-player {
    display: none;
    border: 1px solid #cc0000;
}
</style>