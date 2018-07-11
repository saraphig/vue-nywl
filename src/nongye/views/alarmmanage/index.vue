<template>
  <div class="wrap">
    <div class="alarm-tit clearfix">
      <span class="fl webfont">告警管理</span>
      <!--<div class="alarm-btn fr">-->
        <!--<i class="iconfont icon-shanchu" @click="del()" title="删除区域"></i>-->
      <!--</div>-->
    </div>
    <ul class="alarm clearfix">
      <li v-for="(item, index) in items"  @click.stop.prevent = "selectHandel()">
        <span @click.stop.prevent ="setLevelHandel(index)">设置</span>
        <div :class="[item.colorClass, 'content']">{{item.text}}</div>
      </li>
    </ul>
    <v-setmaskLayer v-if="maskShowEdit==true"  @statusEdit="statusEdit" @editarea="editarea" :levelInfo="levelInfo" :maskShowEdit="maskShowEdit"></v-setmaskLayer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import VSetmaskLayer from '../../components/set-maskLayer'

  export default {
    components: {
      VSetmaskLayer
    },
    data(){
      return{
        levelInfo:{
          alarmName :''
        },
        maskShowEdit:false,
        selJudge:false,
        items:[
          {
            text:'一般告警',
            colorClass:'color1',
            id:'1'
          },{
            text:'重要告警',
            colorClass:'color2',
            id:'2'
          },{
            text:'紧急告警',
            colorClass:'color3',
            id:'3'
          },
        ]
      }
    },
    name: 'home',
    computed: {
      ...mapGetters({
        homeInfo: 'getHomeInfo',
      })
    },
    created() {

    },
    methods: {
      editarea(d) {
        if(d) {
          this.getLevelData();
          this.maskShowEdit = false;
        }
      },

      statusEdit: function(sta) {
        this.maskShowEdit = sta;
      },
      statusEdit: function(sta) {
        this.maskShowEdit = sta;
      },
      maskShowEdits: function(sta) {
        this.maskShowEdit = sta;
      },
      //点击编辑区域触发
      setLevelHandel(index) {
          setTimeout(() => {
            this.$store.dispatch('fetchAlarmManage', {
              levelId:this.items[index].id,
            }).then((data) => {
              this.maskShowEdits(true);
              this.levelInfo.alarmName = this.items[index].text;
              Object.assign(this.levelInfo,  { ...data});
            }, (error) => {
              alert('获取数据失败')
              console.log('start->error')
            });
          });
      },
      selectHandel(index){
        if(event.currentTarget.classList.contains('sel')){
          event.currentTarget.setAttribute('class', '')
        }else {
          event.currentTarget.setAttribute('class', 'sel')
        };
      },
      getLevelData(index) {
        this.$store.dispatch('fetchAlarmManage', {
          levelId:this.items[index].id,
        }).then((data) => {
          this.levelInfo.alarmName = this.items[index].text;
          Object.assign(this.levelInfo,  { ...data});
          console.log(this.levelInfo.delayMs)
        }, (error) => {
          console.log('start->error')
        });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
</style>
