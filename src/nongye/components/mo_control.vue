<!-- //////////////////////////////////////////////
//  自定义滑动按钮组件 (hyl 2018-03-08)
////////////////////////////////////////////// -->

<template>
    <div class="monitor_control_box" @click="handleClick" :style="box_styles">
        <div v-if="iconshow" class="control_run"></div>
        <img v-else :src="img_src" class="control-img"/>
        <br/>
        <span class="objname">{{ displayname }}</span><br/>
        <span class="objstat">{{ msgstate }}</span><br/>
        <sh-silder @click="SilderClick($event)" style="margin-top:0.8em;" :state="swstate"></sh-silder>
        <div :title="msgtitle" class="warn_icon" v-if="show">!</div>
    </div>
</template>
<script>
import ShSilder from "@com/buttons/sh_silder";

export default {
    name: "mo-control",
    components: {
        ShSilder
    },
    props: {
        msgstate: {
            type: String,
            default: ""
        },
        swstate: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ""
        },
        devid:{
            type: Number,
            default: 0
        },
        //   iconName:{
        //     type: String,
        //     default: ""
        //   },
        // key: {
        //     type: Number,
        //     default: 0
        // }
    },
    computed: {
        msgtitle() {
           return (this.displayname + this.msgstate);
        },
        iconshow() {
            this.iconName = this.control_icon[this.displayname];
            return this.iconName == undefined
        },
        displayname() {
            return this.name.replace(/控制/g, '');
        },
        show() {
            //console.log("this.msgstate=" + this.msgstate);
            return this.msgstate.indexOf("停止") >= 0 || (this.msgstate.indexOf("异常") >= 0);
        },
        box_styles() {
            let styleobj = {};
            if (this.state) {
                styleobj = {
                    //background: "#0088ff"
                    //border: "1px solid #cccccc"
                };
            } else {
                styleobj = {
                    //background: "#cccccc"
                    // border: "1px solid #aaaaaa"
                };
            }
            return styleobj;
        },
        run_styles() {
            let styleobj = {};
            if (this.iconName == undefined) {
                styleobj = {
                    display: "inline-block"
                };
            } else {
                styleobj = {
                    display: "none"
                };
            }
            return styleobj;
        },
        img_styles() {
            let styleobj = {};
            if (this.iconName == undefined) {
                styleobj = {
                    dispaly: "none"
                };
            } else {
                styleobj = {
                    dispaly: "inline-block"
                };
            }
            console.log(styleobj);
            return styleobj;
        },
        img_src() {
            //console.log("icon");
            // this.iconName = this.control_icon[this.displayname];
            // console.log(this.iconName);
            return this.iconName;
            //return this.control_icon[this.name];
        },
        active() {
            this.isActive = true;
        }
    },
    methods: {
        handleClick(e) {
            //this.isActive = true;
            this.$emit("click", this.index);
        },
        SilderClick(e) {
            //console.log("SilderClick");
            let tempobj = { id:this.devid, field:(e?1:0) };
            //console.log(e);
            this.$emit("SwitchClick", tempobj);
        }
    },
    data: function() {
        return {
            notes: "按钮效果",
            state: false,
            control_icon: {
                风机控制: require("../assets/img/control_fan.png"),
                风机: require("../assets/img/control_fan.png"),
                电磁阀: require("../assets/img/control_solenoid.png"),
                检测灯: require("../assets/img/control_senselight.png"),
                喂虾机: require("../assets/img/control_shrimpfeeding.png"),
                增氧泵: require("../assets/img/control_incoxygenpump.png"),
                自动天窗: require("../assets/img/control_autoskylight.png"),
                监测灯: require("../assets/img/control_senselight.png"),
                水口阀: require("../assets/img/control_solenoid.png"),
                天窗: require("../assets/img/control_autoskylight.png"),
            },
            iconName: ""
        };
    },
    created() {},
    mounted() {}
};
</script>
<style scoped>
.warn_icon {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 16px;
    right: 16px;
    display: inline-block;
    border: 1px solid #ff0000;
    border-radius: 8px;
    color: #ff0000;
}

.objname {
    display: inline-block;
    font-weight: bolder;
    font-size: 22px;
    margin-top: 0.8em;
    height: 49px;
    color: #313131;
}

.objstat {
    display: inline-block;
    font-weight: bolder;
    font-size: 14px;
    color: #b0b1b5;
    margin-top: 0.8em;
}

.monitor_control_box {
    position: relative;
    float: left;
    text-align: center;
    width: 31%;
    height: 230px;
    background: #fff;
    margin: 0 2% 12px 0;
    border-radius: 5px;
}

.control_box {
    margin-right: 0.9em;
    margin-top: 0.8em;
    padding-bottom: 28px;
    border-radius: 5px;
    background: #ffffff;
    text-align: center;
}

.control_run {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid #0f83fe;
    border-radius: 50%;
    margin-top: 1.3em;
}

.control-img {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-top: 1.3em;
}
</style>
