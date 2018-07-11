<!-- //////////////////////////////////////////////
//  自定义按钮组件 (hyl 2018-03-08)
////////////////////////////////////////////// -->

<template>
    <div style="vertical-align: middle;">
        <button class="sh-button" @click="handleClick" @mouseenter="handleEnter" @mouseleave="handleLeave" :style="styles">
            <slot></slot>
        </button>
    </div>
</template>
<script>
export default {
    name: "sh-button",
    props: {
        color: {
            type: String,
            default: "#ffcc66"
        },
        icon: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: "卡片组件"
        },
        type: {
            type: String,
            default: "default"
        },
        callback: {
            type: Function,
            default: null
        }
    },
    computed: {
        styles() {
            let styleobj = {};
            switch (this.type) {
                case "default": //自定义几种不同的样式 
                    styleobj = {
                        // background: this.color,
                        // border: "1px solid #ff0000"
                    };
                    break;
            }
            return styleobj;

        }
    },
    methods: {
        handleClick(e) {
            this.$emit("click", e);
        },
        handleEnter(e) {
            //this.$emit("mouseenter", e);
        },
        handleLeave(e) {
            //this.$emit("mouseleave", e);
        }
    },
    data: function() {
        return {
            notes: "按钮效果"
        };
    },
    created() {}
};
</script>
<style scoped>
.sh-button {
    /* position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #aaaaaa;*/
    padding: 0.6em;
    margin: 0.6em;
    /*height: 3.6em;
    width: 12.6em; 
    background: #cccccc;*/
    box-shadow: 5px 5px 2px #888888;
    border-radius: 3px;
    border: 0;
    outline: none;
}
/*悬停项*/
.sh-button:hover {
    background-color: #0088ff;
    color: #fdfcfc;
}
/*点击项*/
.sh-button:active {
    background-color: #fc6c34;
    color: #fbfbfb;
}
/*选中项*/
/*.sh-button:focus {
    background-color: #7a381e;
    color: #f8f7f7;
}*/
</style>