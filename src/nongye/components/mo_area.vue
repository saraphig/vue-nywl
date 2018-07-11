<!-- //////////////////////////////////////////////
//  自定义区域信息显示组件 (hyl 2018-03-09)
////////////////////////////////////////////// -->

<template>
    <div class="monitor_area_box" @click="handleClick" :style="box_styles">
        <div class="area_box">
            {{ name }}<div :title="warn_title" :class="warn_class" :style="warn_styles"></div><br/>
            <span id="objval" :style="obj_styles">{{ value }}</span>
            <span id="objunit" :style="obj_styles">{{ unit }}</span>
            <div class="monitor_area_act" :style="act_styles"></div>

        </div>
    </div>
</template>
<script>
export default {
    name: "mo-area",
    props: {
    isActive: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        },
        unit: {
            type: String,
            default: ""
        },
        stat: {
            type: String,
            default: ""
        },
        index: {
            type: Number,
            default: 0
        }
    },
    computed: {
        box_styles() {

        },
        warn_title() {
            return this.name + this.stat;
        },
        warn_class() {
            //console.log(this.stat);
            if (this.stat == "偏高" || this.stat == "过高"){
                return "monitor_area_warn_up";
            } else if (this.stat == "偏低" || this.stat == "过低" || this.stat == "断开") {
                return "monitor_area_warn_down";
            } else {
                return "monitor_area_warn_none";
            };
        },
        warn_styles() {
            return {
                display: "inline-block"
            }
        },
        act_styles() {
            let styleobj = {};
            if (this.isActive) {
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
        obj_styles() {
            let styleobj = {};
            if (this.isActive) {
                styleobj = {
                    color: "#0b83fe"
                };
            } else {
                styleobj = {
                    color: "#333333"
                };
            }
            return styleobj;
        },
        active() {
             this.isActive = true;
        }
    },
    methods: {
        handleClick(e) {
            //this.isActive = true;
            this.$emit("areaclick", this.index);
        }
    },
    data: function() {
        return {
            notes: "按钮效果",
            state: false
        };
    },
    created() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
#objval {
    font-weight: bolder;
    font-size: 1.6em;
}
#objunit {
    font-weight: bolder;
}

.monitor_area_box {
    display: inline-block;
    width: 16.9%;
    height: 48%;
    text-align: left;

    .area_box {
        position: relative;
        margin-right: 0.9em;
        padding: 1em;
        border-radius: 5px;
        background: #ffffff;
    }
    &:last-child {
        width: 15%;
        .area_box {
            margin-right: 0;
        }
    }
}

.monitor_area_act {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-top: 20px solid #ffffff;
    position: absolute;
    bottom: -20px;
    left: 43%;
}

.monitor_area_warn_up {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #ff0000;
    margin-left:10px;
    margin-bottom:2px;
    /* position: absolute;*
    top: 10px;
    left: 43%;*/
}
.monitor_area_warn_down {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #00ff00;
    margin-left:10px;
    margin-bottom:2px;
    /* position: absolute;*
    top: 10px;
    left: 43%;*/
}

.monitor_area_warn_none {
    display: none;
}
</style>
