<!-- //////////////////////////////////////////////
//  自定义弹窗组件 (hjh 2018-03-16)
////////////////////////////////////////////// -->
<template>
  <div class="wwwwwwww">
    <div class="boxshade" v-if="boxtype==1">
      ...
    </div>
    <div class="boxshade" v-if="boxtype==2">
      <div class="boxpop" id="boxpop" :style="{ width: boxwidth + 'px' }">
        <div class="header">
          <span>{{boxtitle}}</span>
          <i class="close iconfont icon-htmal5icon21" @click.stop='close()'></i>
        </div>
        <div class="cont">
          <slot name="alertFunctionBox"></slot>
        </div>
      </div>
    </div>
    <!--<v-messagebox v-show = "!showType(n)"></v-messagebox>-->
  </div>
</template>

<script>

  import VMessagebox from './message-box';

  export default {
    name: "alert",
    components: {
      VMessagebox,
    },
    props: {
      boxwidth: {
        type: Number,
        default: 460
      },
      boxheight: {
        type: Number,
        default: 300
      },
      boxtype: {
        type: Number,
        default: 2	//1：文本弹窗，2：功能弹窗
      },
      boxtext: {
        type: String,
        default: "天上会掉馅饼吗？"
      },
      boxtitle: {
        type: String,
        default: "提示"
      }
    },
    data () {
      return {
        shows: this.show,
      };
    },
    methods: {
      showType(n){
        switch (n) {
          case 1:
            return true
            break;
          case 2:
            return true
            break;
        }
      },
      close(e) {
        this.$emit('callback', false);
      },
    },
    created() {
    },
    mounted() {
    	
			let h = document.documentElement.clientHeight 
			let divW = document.getElementById("boxpop").offsetWidth;
			let divh = document.getElementById("boxpop").offsetHeight;
			if(divh>h){
				document.getElementById("boxpop").style.height=h-40+"px"
				document.getElementById("boxpop").style.width=divW+25+"px"
				document.getElementById("boxpop").style.overflow="auto"
			}
    	
		},
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .boxshade
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    text-align: center;
    left: 0;
    top: 0;
    z-index: 99;

  .boxshade:after
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;

  .boxpop
    display: inline-block;
    margin: 0;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;

  .cont
    padding:20px 30px;
    overflow: hidden;


  .header {
    border-radius: 5px 5px 0 0;
    background: #f5fafe
    height: 50px
    line-height: 50px;
    padding-left: 20px;
    position: relative
    span {
      font-size 18px
      color #303133
    }
    .close {
      float right
      cursor pointer
      font-size: 28px;
      cursor: pointer;
      padding: 0 10px;
      margin-right: 5px;
    }
  }
</style>
