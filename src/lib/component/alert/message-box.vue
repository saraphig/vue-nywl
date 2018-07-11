//  自定义文本弹窗组件 (2018-03-16)
<template>
  <div class="meswrap" v-show="show">

    <div class="wrap">
      <div class="message-box" :style="'width:'+ width +'px'">
        <div class="header"><span>{{title}}</span><i class="fr iconfont icon-htmal5icon21"
                                                     @click.stop='closeHandel()'></i></div>
        <div class="content">{{content}}</div>
        <div class="footer">
          <button v-show="nobtnShow" @click='closeHandel()'>{{nobtn}}</button>
          <button @click='sureHandel()'>{{okbtn}}</button>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
  import { EventBus } from '@lib/js/event-bus';
  export default {
    name: 'v-messagebox',
    data() {
      return {
        selectType: 0,
        show: true
      }
    },
    props: {
      nobtnShow:{
        type:Boolean,
        default:false
      },
      width: {
        type: Number,
        default: 420
      },
      title: {
        type: String,
        default: "提示"
      },
      content: {
        type: String,
        default: "是否确定退出?"
      },
      nobtn:{
        type: String,
        default: "取消"
      },
      okbtn:{
        type: String,
        default: "确定"
      }
    },
    computed: {
      styles() {
      }
    },
    created: function () {
      this.sureHandel();
      this.$emit('nobtn', this.nobtnShow)
    },
    methods: {
      closeHandel() {
        //this.show = false;
        this.$emit('select-type', false)
        EventBus.$emit('loginOutclicked', false);

      },
      sureHandel() {
        this.$emit('select-type', true);
        this.$emit('sureHandel');
      }
    },
    created() {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .meswrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index 2000
  }

  .wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index 2011
  }

  .wrap:after {
    content ""
    display inline-block
    height 100%
    width 0
    vertical-align middle
  }

  .message-box {
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
    .header {
      position relative
      padding 15px
      padding-bottom 10px
      span {
        padding-left 0
        margin-bottom 0
        font-size 18px
        line-height 1
        color #303133
      }
      .fr {
        float right
        cursor pointer
      }

    }
    .content {
      position relative
      padding 10px 15px
      color #606266
      font-size 14px
      box-sizing border-box
    }
    .footer {
      padding 5px 15px 0
      text-align right

      button {
        display inline-block
        line-height 1
        white-space nowrap
        cursor pointer
        background #fff
        border 1px solid #dcdfe6
        border-color #dcdfe6
        color #606266
        -webkit-appearance none
        text-align center
        box-sizing border-box
        outline none
        margin 0
        transition .1s
        font-weight 500
        -moz-user-select none
        -webkit-user-select none
        -ms-user-select none
        padding 12px 20px
        font-size 14px
        border-radius 2px
        &:first-child {
          margin-right 10px
        }
        &:nth-child(2) {
          color: #fff;
          background-color:#41a259;
          border-color:#41a259;
        }
      }
    }
  }

  .mask {
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    opacity 0.5
    background #000
    z-index 2010
  }
</style>

