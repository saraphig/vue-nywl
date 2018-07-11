<template>
  <section class="page" v-if="show">
    <div class="shade" @click.stop='closeHandel()'>
      <div class="bbox" @click.stop='openHandel()'>
        <div class="tit"><span>告警级别设置</span> <i class="fr iconfont icon-htmal5icon21"
                                                @click.stop='closeHandel()'></i>
        </div>
        <div class="box-data">
          <div class="cen-box">
            <input class="cenTitle webfont" type="text" v-model="this.levelInfo.alarmName" placeholder="告警名称"
                   readonly="readonly"/>
          </div>
          <div class="select-wrap clearfix">
            <ul class="clearfix">
              <li>
                <div class="titl webfont">级别</div>
                <div class="input-wrap">
                  <input class="input-box" type="tel" name="alarm_levelnum" v-model="this.levelInfo.levelId"
                         readonly="readonly">
                </div>
              </li>
              <li>
                <div class="titl webfont">延时时间（秒）</div>
                <div class="input-wrap">
                  <input class="input-box" maxlength="3" name="alarm_delaytime" v-model="delayTime" type="number"><span class="tip-mes" v-show="delaytip">延长时间设为1~100之间</span>
                </div>
              </li>
              <li>
                <div class="titl webfont">短信通知</div>
                <div class="sel">
                  <div class="input-wrap" @click="handelMes">
                    <input class="input-box" v-model="selectMesText" name="alarm_mesinfo" readonly="readonly">
                    <i class="normal iconfont icon-paixujiantouxia"></i>
                  </div>
                  <ol v-show="mesListShow">
                    <li v-for="(item, index) in items" @click="selectMesHandel(index)">{{item.text}}</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>
          <div class="operation">
            <input class="sure but" type="button" value="确认" @click="sub()"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import VTable from '@com/table';
  import Vue from 'vue';
  import Vuelidate from 'vuelidate';
  import {required, minLength} from 'vuelidate/lib/validators';

  Vue.use(Vuelidate);
  export default {
    name: 'VSetmaskLayer',
    props: {
      levelInfo: {
        type: null,
        default: {}
      },
      maskShowEdit: {
        type: Boolean
      }
    },
    data() {
      return {
        delaytip:false,
        delayTime: this.levelInfo.delayMs,
        show: true,
        mesListShow: false,
        selectMesText: this.levelInfo.isSend ===  true ? '开' : '关',
        selectMesVal: this.levelInfo.isSend,
        items: [{text: '开', value: true}, {text: '关', value: false}]
      }
    },
    validations: {
      delayTime: {
        required,
        minLength: minLength(2)
      },
    },
    components: {},
    created(){
    },
    mounted: function () {
    },
    methods: {
      lengthContrl() {
        if (this.delayTime < 1 && this.delayTime > 100) {
          console.log(11)
          this.delayTip = true
        } else {
          console.log(12)
          this.delayTip = false
        }
      },
      selectMesHandel(index) {
        this.selectMesVal = this.items[index].value;
        this.selectMesText = this.items[index].text;
        this.mesListShow = !this.mesListShow
      },
      handelMes: function (e) {
        this.mesListShow = !this.mesListShow
      },
      openHandel() {
        this.show = true;
      },
      closeHandel: function () {
        this.show = false;
        this.$emit('statusEdit', this.show);
      },
      sub() {
        if (this.delayTime === '' || this.delayTime > 100 ||   this.delayTime < 1 || this.delayTime === undefined) {
          this.delaytip = true;
        }else{
          this.delaytip = false;
          this.$store.dispatch('modifyAlarmManage', {
            levelId: this.levelInfo.levelId,
            delayMs: this.delayTime,
            isSend: this.selectMesVal,
            t: new Date().getTime() //时间戳，ie兼容
          }).then((data) => {
            alert('确认成功')
            this.show = false;
            this.$emit('statusEdit', this.show);
          }, (error) => {
            alert('设置失败')
          });
        }
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tip-mes {
    position absolute;
    color red;
    left: 0;
    top: 56px;
    font-size 12px;
  }

  .select-wrap {
    width 110%;
  }

  .start, .end {
    position absolute;
    top 7px;
    font-size 14px;
    color #b0b1b4;
  }

  .start {
    left 0;
  }

  .end {
    right 0;
  }

  .fr.icon-htmal5icon21 {
    cursor: pointer;
  }

  .box-data ul > li ol {
    position: absolute;
    width: 100%;
    top: 75px;
    color: #313131;
    font-size: 16px;
    line-height: 30px;
    border: 2px solid #b1b4b6;
    background: #fff;
    box-sizing: border-box;
    text-indent: 10px;

  }

  .box-data ul > li ol li:hover {
    background: #eee;
    cursor: pointer;
  }

  .input-wrap {
    position: relative;
    width: 142px;
  }

  ul, ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .box-data {
    padding: 0 25px 20px 25px;
  }

  .box-data ul > li {
    position: relative;
    float: left;
    margin-right: 11px;
  }

  .box-data ul > li .titl {
    margin-bottom: 10px;
    font-size: 14px;
    color: #313131;
  }

  .box-data ul > li .input-box {
    width: 100%;
    height: 50px;
    border: 2px solid #b1b4b6;
    border-radius: 4px;
    box-sizing: border-box;
    font-weight: bold;
    font-size 16px;
    color: #313131;
    text-indent: 10px;
    line-height: 50px;
    cursor: pointer;
  }

  .box-data ul > li .iconfont {
    position: absolute;
    right: 5px;
  }

  .box-data ul > li .iconfont.icon-paixujiantouxia {
    top: 9px;
  }

  .box-data ul > li .iconfont.icon-paixujiantoushang {
    top: 6px;
  }

  .box-data ul > li .iconfont.icon-paixujiantouxia.normal {
    top: 8px;
  }

  .cenTitle {
    width: 100%;
    background: none;
    border: 0;
    font-size: 18px;
    color: #313131;
    height 42px;
    line-height: 42px;
    text-align: center;
    margin: 20px 0 39px;
    border-bottom: 2px solid #f0f0f0;
  }

  .shade {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .bbox .tit {
    width: 100%;
    height: 50px;
    background: #f5faff;
    line-height: 50px;
    padding: 0 20px 0 25px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 20px;
    position: relative;
  }

  .bbox {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    width: 500px;
    height: 350px;
    border-radius: 5px;
    background: white;
    margin: auto;
    color: black;
    z-index: 3;
    box-sizing: border-box;
  }

  .operation .but {
    width: 150px;
    height: 50px;
    border: none;
  }

  .operation .sure {
    margin-top: 45px;
    background: #0293ff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>
