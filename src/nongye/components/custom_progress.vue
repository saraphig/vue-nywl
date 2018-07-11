<!-- //////////////////////////////////////////////
//  定制时间进度条 (hyl 2018-04-12)
//  sample:
//       <custom-progress :min="min" :max="max" :pos="pos" :timeval="thentime" @realTime="receiveTime"></custom-progress>
////////////////////////////////////////////// -->
<template>
<div id="panel-progress-box" class="panel-progress">
    <div id="current-position-bar" class="current-position" :style="pos_width"></div>
    <div id="circle-position-mark" class="circle-mark" :style="pos_circle"></div>
</div>
</template>
<script>
import Vue from "vue";
import Hammer from "hammerjs";
//progress bar

export default {
    name: "custom-progress",
    props: {        
        progressid: {
            type: String,
            default: "custom-progress"
        },
        timeval:{
            type: String,
            default: ""            
        },
        min: {
            type: Number,
            default:0
        },
        max: {
            type: Number,
            default:100
        },
        pos: {
            type: Number,
            default:30
        },
        
    },
    data: function() {
        return {
            posper:0,
            current_x:0,
            disX:0,
            disY:0,
            isPanStart:false,
            saveCenterX:0,
            parenWidth:0,
        };
    },
    computed: {
        pos_width() {
            //console.log("pos_width:" + this.current_x);
            return {
                width: ((this.current_x + 7) + "px")
            }
        },
        pos_circle() {
            //console.log("pos_circle:" + this.current_x);
            return {
                //"transition-duration": "10ms",
                transform: "translateX(" + this.current_x + "px)"
            }
        }
    },
    watch: {
        timeval(val) {
            if (val.indexOf(":") > 0) {
               // console.log("intime:" + val);
                this.current_x = this.timeToCurrentX(val);
                this.$emit("realTime", val);//即时事件直接返回时间
                //console.log("intime:current_x=" + this.current_x);
            };
        },
        current_x(val) {
            //console.log("current_x:" + val);
            if (this.isPanStart) {
                this.$emit("realTime", this.currentToTime(val));//拖动的情况下产生即时事件
            };
        },
        isPanStart(val) {
            if (!val) {
                //this.$emit("enterTime", this.currentToTime(this.current_x));//在拖动结束事件产生当前时间事件
            };
        }
        
    },
    methods: {
        setinTimeVal(inVal) {
           this.timeval = inVal;
           let circle = document.getElementById("circle-position-mark");
           this.parenWidth = circle.parentNode.clientWidth;
           if (this.timeval.indexOf(":") > 0) {
                //console.log("intime:" + this.timeval);
                this.current_x = this.timeToCurrentX(this.timeval)
            };
        },
        currentToTime(inval) {
            //按长度比值获取时间值
            //console.log("current_x:" + val);
            let circle = document.getElementById("circle-position-mark");
            let curTime = (24 * inval) / (circle.parentNode.clientWidth - 14);//通过比值转换为时间值
            //console.log("curTime:" + curTime);
            //时间值转为 hh:mm:ss格式
            let h = parseInt(curTime);
            let m = (curTime - h) * 60;
            let s = Math.round((m - parseInt(m)) * 60);
            m = parseInt(m);
            h = (h < 10?"0":"") + h;
            m = (m < 10?"0":"") + m;
            s = (s < 10?"0":"") + s;
            //console.log("Time:" + h + ":" + m + ":" + s);//按长度比值获取时间值
            this.$emit("realTime", (h + ":" + m + ":" + s));//传出即时时间事件
            return (h + ":" + m + ":" + s);
        },
        timeToCurrentX(inTime) { //收到时间转为current_x长度
            let ret_current_x = 0;
            let h = 0,m = 0,s = 0;
            //console.log("timeToCurrentX:" + inTime);
            if (inTime.indexOf(":") > 0) {
                let h = parseInt(inTime.substr(0,inTime.indexOf(":")));
                inTime = inTime.substr(inTime.indexOf(":") + 1);
                //console.log("inTime:" + inTime+","+h);
                if (inTime.indexOf(":") > 0) {
                    m = parseInt(inTime.substr(0,inTime.indexOf(":")));
                    s = parseInt(inTime.substr(inTime.indexOf(":") + 1));
                    //console.log("ms:" + m +"," + s);
                };
                let circle = document.getElementById("circle-position-mark");
                //console.log("clientWidth:" + this.parenWidth);
                ret_current_x = (circle.parentNode.clientWidth - 14) * ((s / 60 + m) / 60 + h) / 24;
                //console.log("ret_current_x:" + ret_current_x + ","+ h + ","+ m + ","+ s);
            }
            //console.log("ret_current_x:" + ret_current_x);
            return ret_current_x;
        }
    },
    created() {},
    mounted() {
        this.$nextTick(function() {
            // 滑动功能
            var circle = document.getElementById("circle-position-mark");
            //console.log("circle");
            //console.log(circle.parentNode.clientWidth);
            this.parenWidth = circle.parentNode.clientWidth;
            this.current_x = (this.parenWidth - 14) * this.pos / (this.max - this.min);

            if (this.timeval.indexOf(":") > 0) {
                //console.log("intime:" + this.timeval);
                this.current_x = this.timeToCurrentX(this.timeval)
            };


            /*var circle = document.getElementById('circle-position-mark');
    
            circle.onmousedown = (ev) => {
                this.disX = ev.clientX - circle.offsetLeft;
                this.disY = ev.clientY - circle.offsetTop;
            }
            circle.onmousemove = (ev) => {
                var l = ev.clientX - this.disX;
                var t = ev.clientY - this.disY;

                circle.style.left = l +'px'
                circle.style.top = t +'px'
            }
            circle.onmouseup = (ev) => {
                document.onmousemove = null;
                document.onmouseup = null;
            }*/
  




            var hammertime = new Hammer(circle);
             var _this = this;
            hammertime.on('panstart', (ev) => {
                this.isPanStart = true;
                this.saveCenterX = ev.deltaX;
                //console.log("panstart");//panright
                // this.current_x = this.current_x + ev.deltaX;
                // console.log(this.current_x + "," + ev.deltaX);
                // if (this.current_x > circle.parentNode.clientWidth - 14) this.current_x = circle.parentNode.clientWidth - 14;
             }).on('panleft', (ev) => {

                if (this.isPanStart = true) {
                    this.current_x = this.current_x + (ev.deltaX - this.saveCenterX)
                    this.saveCenterX = ev.deltaX;
                }
                //console.log(this.current_x + "," + circle.parentNode.clientWidth);
                //console.log(ev.center.x + "," + circle.offsetLeft + "," + circle.offsetWidth+","+this.isPanStart);
                if (this.current_x > circle.parentNode.clientWidth - 14){
                    this.current_x = circle.parentNode.clientWidth - 14;
                    this.isPanStart = false;
                } else if (this.current_x < 0) {
                    this.current_x = 0;
                    this.isPanStart = false;
                };   

            }).on('panright', (ev) => {

                if (this.isPanStart = true) {
                    this.current_x = this.current_x + (ev.deltaX - this.saveCenterX)
                    this.saveCenterX = ev.deltaX;
                } 
                //console.log(this.current_x + "," + circle.parentNode.clientWidth);
                //console.log(ev.center.x + "," + circle.offsetLeft + "," + circle.offsetWidth+","+this.isPanStart);
                if (this.current_x > circle.parentNode.clientWidth - 14){
                    this.current_x = circle.parentNode.clientWidth - 14;
                    this.isPanStart = false;
                } else if (this.current_x < 0) {
                    this.current_x = 0;
                    this.isPanStart = false;
                };                

            }).on('panend', (ev) => {
                //console.log("panend");
                //console.log(ev);
                this.isPanStart = false;
                this.$emit("enterTime", this.currentToTime(this.current_x));//在拖动结束事件产生当前时间事件
                
                //console.log(ev.center.x + "," + circle.offsetLeft + "," + circle.offsetWidth+","+this.isPanStart);

                //this.$emit("downTime", (h + ":" + m + ":" + s));//传出即时时间事件

                if (this.current_x > circle.parentNode.clientWidth - 14){
                    this.current_x = circle.parentNode.clientWidth - 14;
                } else if (this.current_x < 0) {
                    this.current_x = 0;
                };
             //hammertime.get('pinch').set({ enable: true });
            //  hammertime.get("swipe").set({ enable: true,direction: Hammer.DIRECTION_ALL });
            //  hammertime.on("press", (ev) => urrent_x = 0;
            }).on('tap', (ev) => {//doubletap

                console.log("doubletap:" + circle.offsetLeft + "," + circle.parentNode.offsetLeft);
                console.log(ev);
                //this.current_x = 0;
                //this.current_x = ev.center.x - circle.parentNode.clientLeft;

                if (this.current_x > circle.parentNode.clientWidth - 14){
                    this.current_x = circle.parentNode.clientWidth - 14;
                } else if (this.current_x < 0) {
                    this.current_x = 0;
                };
                //console.log(this.current_x + "," + circle.parentNode.clientLeft);
                //console.log(circle.parentNode.clientLeft);
                
            });
            //      //控制台输出
            //      console.log(ev);
            //  });
            //  hammertime.get('swipe').set({ enable: true,direction: Hammer.DIRECTION_VERTICAL });
            //  hammertime.on("swipeleft", (ev) => {
            //     console.log("swipeleft");
            //     console.log(ev);
                     /*if (
                         (this.current_x + (this.area_list.length - 6) * awidth >
                         0)
                     ) {
                         this.current_x = this.current_x + e.deltaX;
                         if ((this.current_x  + (this.area_list.length - 6) * awidth) < 0) {
                             this.current_x = -(this.area_list.length - 6) * awidth;
                         }
                     }*/
                //  })
                //  .on("swiperight", (ev) => {
                //      console.log("swiperight");
                //      console.log(ev);
                     /*if (this.current_x < 0) {
                         this.current_x = this.current_x + e.deltaX;
                         if (this.current_x > 0) this.current_x = 0;
                     } else {
                         this.current_x = 0;
                     }*/
                //  });
        });
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.panel-progress
    position relative
    display inline-block
    width 100%
    height 5px
    background #878d9b
    top -11px

.current-position
    position absolute
    display inline-block
    width 30%
    height 5px
    left 0px
    top 0px
    background #3bd2dd

.circle-mark
    position absolute
    width 14px
    height 14px
    border-radius 7px
    background #3dd1db
    box-shadow 0 0 10px #3dd1db
    border 5px solid #ffffff
    box-sizing border-box
    top -5px

</style>