<template>
  <ul class="tree-ul">
    <li v-for="model in data">
      <sh-tree-leaf :model="model"
        @openNode="openNode"
        @toggle="toggle"></sh-tree-leaf>
      <ul v-show="model.displayFold == 1"
        v-if='model.childrens'>
        <v-option :data='model.childrens'
          v-if="model.childrens"></v-option>
      </ul>
    </li>
  </ul>
</template>

<script>
import ShTreeLeaf from './sh-tree-leaf';
export default {
  name: "v-option",
  components: { ShTreeLeaf },
  props: {
    data: Array,
  },
  data() {
    return {
      onList: false,
      name: ''
    }
  },
  methods: {
    openNode: function (model) {
      let that = this
      if (model.childrens) {
        if (model.displayFold == 1) {
          model.displayFold = 0;
        } else {
          model.displayFold = 1;
        }
      }
      while (that.isNotTree(that.$parent)) {
        that = that.$parent;
      }

    },
    toggle(model, evt) {
      let that = this;
      while (that.isNotTree(that.$parent)) {
        that = that.$parent;
      }
      that.$emit('clickCallBack', model);
    },
    isNotTree(vm) {
      let classStr = vm.$el.className;
      if (classStr.indexOf('tree') !== -1) {
        return true;
      }
      return false;
    },
  }

}
</script>

<style lang="stylus">
.tree-ul {
  .icon-icon_jiantou_xiazhankai {
    transition: all 0.2s ease-in-out;
    display: inline-block;
    font-size: 12px;
  }

  .open {
    transform: rotate(0);
  }

  .close {
    transform: rotate(-90deg);
  }

  .tree-ul {
    padding-left: 11px;
  }

  .list-div {
    padding: 0 15px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 36px;
    line-height: 36px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;

    span {
      // font-weight: bold;
    }

    i {
      // display: inline-block;
      // width: 16px;
      // height: 16px;
      font-size: 16px;
      color: #444444;
      position: absolute;
      left: 6px;
      top: 3px;
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-left: 30px;
    }
  }

  .no-childrens {
    padding-left: 21px;
  }

  .list-div {
    cursor: pointer;
    padding: 2px 0;
  }

  .active-keyword {
    color: #3cd2dc;
  }

  .active {
    background: #3cd2dc !important;
    color: #fff !important;

    i {
      color: #fff !important;
    }

    .active-keyword {
      color: #fff;
    }
  }
}
</style>
