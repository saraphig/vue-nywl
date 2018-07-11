<template>
  <div class="container">
    <div :class="disabled ? 'select selectback' : 'select'" ref="select" :disabled="disabled" :style="tree_border">
      <input class="inp" type="text" :disabled="disabled" readonly v-model="name" @click='openOption' :placeholder="placeholder">
      <input type="hidden" readonly v-model="currentValue" @click='openOption'>
      <i @click='openOption' :class="onList ? 'iconfont-open iconfont ' + icon  : 'iconfont ' + icon" :style="hasborder?{'font-size':iconSize + 'px','color':disabled ? '#c0c4cc' : '#999999'}:{'display':'none'} "></i>
    </div>
    <div v-if="onList && data.length == 0" class="dataZero">
      暂无数据
    </div>
    <div class="option-content" v-if='!isTree && onList && data.length > 0'>
      <ul class="option-box">
        <li v-for="item in data" @click="selectChange(item)" :style="value == item.id ? 'color:#c9cfda' : ''">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="tree" v-if='onList && isTree && data.length > 0'>
      <v-option :data="data" @clickCallBack="selectChange"></v-option>
    </div>
  </div>
</template>
<script>
import VOption from "./sh-tree-option.vue";

export default {
    components: { VOption },
    name: "ShTreeSelect",
    provide() {
        return { shTreeSelect: this };
    },
    props: {
        value: {
            required: true
        },
        data: Array,
        change: Function,
        height: String,
        iconSize: String,
        icon: {
            default: "icon-icon_jiantou_xiazhankai",
            type: String
        },
        placeholder: {
            default: "请选择用户组"
        },
        isTree: {
            type: Boolean,
            default: false
        },
        hasborder: {
            type: Boolean,
            default: true
        },
        treeName: String,
        disabled: {
            default: false,
            type: Boolean
        },
        currentId:{
          type: String,
          default:""
        }
    },
    data() {
        return {
            onList: false,
            name: ""
        };
    },
    methods: {
        openOption() {
            if (this.disabled) {
                return;
            }
            this.onList = !this.onList;
        },
        selectChange(item) {
            if (this.isTree == false) {
                this.currentValue = item.id;
            } else {
                this.currentValue = item.areaCode;
                this.name = item.idName;
            }
            this.onList = false;
            this.$emit("clickCallBack", item);
        },
        findIdresName(findId,InArray) { //递归算法，通过ID找出机构名称
            let resName = "";
            for (let i = 0; i < InArray.length; i ++) {
                if (InArray[i].id == findId) {
                    resName = InArray[i].idName;
                    console.log(InArray[i].areaCode + "," + InArray[i].idName + "," + InArray[i].sysName);
                    this.$emit("current", InArray[i]);
                    //document.title = InArray[i].sysName;
                    break;
                } else if (InArray[i].childrens != null && InArray[i].childrens.length > 0) {
                    resName = this.findIdresName(findId,InArray[i].childrens);
                    if (resName != "") break;
                }
            }//end for
            return resName;
        }
    },
    computed: {
        currentValue: {
            get: function() {
                return this.value; // 将props中的value赋值给currentValue
            },
            set: function(val) {
                this.$emit("input", val); // 通过$emit触发父组件
            }
        },
        tree_border() {
            let isShow = this.onList;
            return {
                border: isShow ? "1px solid #41a259" : (this.hasborder?"1px solid #e3e8ea":"0")
            };
        }
    },
    watch: {
        currentValue: function(newQuestion, oldQuestion) {
            if (newQuestion == "") {
                this.name = "";
            } else {
                if (this.isTree == false) {
                    for (let i in this.data) {
                        if (newQuestion == this.data[i].id) {
                            this.name = this.data[i].name;
                        }
                    }
                }
            }
        },
        data: { 
　　　　     handler(newValue, oldValue) {
                this.name = this.findIdresName(this.currentId,newValue);
            }
        },
    },

    mounted() {
        this.$nextTick(() => {
        });
        document.addEventListener("click", event => {
            let iconfont = true;
            if (event.path == undefined) {
                if (event.srcElement.className.includes("iconfont")) {
                    iconfont = false;
                }
            } else {
                if (event.path[0].className.includes("iconfont")) {
                    iconfont = false;
                }
            }
            if (this.onList && iconfont) {
                this.onList = false;
            }
        });
        this.$refs.select.addEventListener("click", event => {
            event = event || window.event;
            event.stopPropagation();
        });
    }
};
</script>

<style scoped lang="stylus">
.container {
  width: 100%;
  height: 36px;
  position: relative;
//   border: 1px solid #0000ff
}

.option-box {
}

.option-box li {
  line-height: 50px;
  font-size: 18px;
  color: #111a39;
  font-weight: 800;
  padding-left: 20px;
  // text-align: left;
}

.option-box li:hover {
  color: #111a39;
  background: #e2fdfe;
}

.iconfont-open {
  // transform: rotate(0deg);
}

.iconfont {
  position: absolute;
  top: 19px;
  right: 12px;
  color: #000;
  // transform: rotate(-90deg);
  transition: all 0.2s ease-in-out;
}

.select {
//   position: absolute;
  position: relative;
  display inline-block
  box-sizing border-box
  width: 100%;
  height: 36px;
  left: 0px;
  top: 0px;
}

.select .inp {
  display inline-block
  box-sizing border-box
  background-color: #fff;
  border: 0px solid #e4eaed;
  border-radius: 2px;
  columns: #444444;
  -webkit-appearance: none;
  background-image: none;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  height: 34px;
  line-height: 34px;
  outline: none;
  padding: 0 16px;
//   padding: 0;
//   margin: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  cursor pointer

  &:placeholder {
    color: #999999;
  }
}

.select .iconfont {
  position: absolute;
  top: 9px;
  right: 7px;
  color: #999999;
  width: 16px;
  height: 18px;
  font-size: 16px;
}

.tree {
  z-index: 999999999;
  position: absolute;
  background-color: #fff;
  width: 100%;
  min-width: 100%;
  max-height: 230px;
  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 2px #808080;
  box-shadow: 0px 0px 2px #808080;
  overflow-y: auto;
  -webkit-transition: opacity 0.3s linear;
  transition: opacity 0.3s linear;
}

.option-content {
  background-color: #ffffff;
  border: solid #c9cfda;
  border-width: 0 2px 2px 2px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 999;
  position: absolute;
  width: 99%;
  padding-left: 1px;
}

.selectback {
  background-color: #ebebe5;
}

.dataZero {
  background-color: #ffffff;
  border: solid #c9cfda;
  border-width: 0 2px 2px 2px;
  height: 180px;
  line-height: 180px;
  text-align: center;
  overflow-y: auto;
}
</style>
