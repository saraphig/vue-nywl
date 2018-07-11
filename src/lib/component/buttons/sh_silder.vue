<!-- //////////////////////////////////////////////
//  自定义滑动按钮组件 (hyl 2018-03-08)
////////////////////////////////////////////// -->

<template>
  <!-- <div style="vertical-align: middle;"> -->
  <div class="sh-silder-box" @click="handleBoxClick" :style="box_styles">
    <button class="sh-silder" @click="handleClick" @mouseenter="handleEnter" @mouseleave="handleLeave" :style="styles">
    </button>
  </div>
  <!-- </div> -->
</template>
<script>
  export default {
    name: "sh-silder",
    props: {
      state: {
        type: Boolean,
        default: false
      },
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
      box_styles() {
        let styleobj = {};
        if (this.cstate) {
          styleobj = {
            background: "#0088ff"
            //border: "1px solid #cccccc"
          };
        } else {
          styleobj = {
            background: "#cccccc"
            // border: "1px solid #aaaaaa"
          };
        }
        return styleobj;
      },
      styles() {
        let styleobj = {};
        if (this.cstate) {
          styleobj = {
            float: "right"
          };
        } else {
          styleobj = {
            float: "left"
          };
        }
        return styleobj;
      }
    },
    watch: {
      state: {
        cstate: this.state
      }
    },
    methods: {
      handleBoxClick(e) {
        this.cstate = !this.cstate;
        this.$emit("click", this.cstate);
      },
      handleClick(e) {
        //this.state = !this.state;
        this.$emit("click", this.cstate);
      },
      handleEnter(e) {
        //this.$emit("mouseenter", e);
      },
      handleLeave(e) {
        //this.$emit("mouseleave", e);
      }
    },
    data: function () {
      return {
        notes: "按钮效果",
        cstate: false
      };
    },
    created() {
      this.cstate = this.state;
    }
  };
</script>
<style scoped>
  .sh-silder-box {
    display: inline-block;
    height: 20px;
    width: 42px;
    /* border: 1px solid #cccccc; */
    /* box-shadow: 5px 5px 2px #888888; */
    border-radius: 10px;
    padding: 1px;
    transition: border-color .8s, background-color .8s;
    cursor: pointer;
  }

  .sh-silder {
    /* position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #aaaaaa;*/
    /* padding: 0.6em;
    margin: 0.6em; */
    height: 20px;
    width: 20px;
    background: #eeeeee;
    /* box-shadow: 3px 3px 1px #888888; */
    border-radius: 10px;
    border: 0; /*"1px solid #ffffff";*/
    outline: none;
    transition: transform .8s;
    cursor: pointer;
  }

  /*悬停项*/
  .sh-silder-box:hover {
    /* border: 1px solid #ffffff; */
  }

  /*点击项*/
  .sh-silder-box:active {
    /* border: 1px solid #ff0000; */
  }

  /*选中项*/
  /*.sh-button:focus {
      background-color: #7a381e;
      color: #f8f7f7;
  }*/
</style>
