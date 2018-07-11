<template>
  <header class="header">
    <div class="header-wrap">
      <h1></h1>
      <ul class="header-menu">
          <template v-for="(item,index) in menulist">
            <li @click="saveUrlId(item.urlId)">
              <template v-if="item.menuUrl">
                  <router-link :to="item.menuUrl">
                    <span>{{item.menuName}}</span>
                  </router-link>
              </template>
            </li>
          </template>
          <li  class="notice" @click='infoHandel()'>
            <i class="iconfont icon-tixingtianchong"></i>
            <i class="mesNum" v-show="mesNumShow">{{mesnum}}</i>
          </li>
      </ul>
      <span class="user-exit" @click='exitLayer'>
           <i class="iconfont icon-tuichu"></i>退出登录
      </span>
    </div>
     <v-messagebox v-show="show"  @select-type="onSelectType" :nobtnShow="true"  @sureHandel="sureHandel"></v-messagebox>
  </header>
</template>
<script>
  import eventBus from '@com/event-bus';
  import VMessagebox from '@com/alert/message-box';
  import { EventBus } from '@lib/js/event-bus';
  export default {
    name: 'top-header',
    components: {
      VMessagebox
    },
    data() {
      return {
        mesnum: 0,
        mesNumShow: false,
        show:false,
        menulist: [
          {menuName: "监控中心",urlId:1,menuUrl: "/page_monitor"},
          {menuName: "告警管理",urlId:2,menuUrl: "/page_realwarning"},
          //{menuName: "工单管理",urlId:3,menuUrl: "/repairorder"},
          {menuName: "设备管理",urlId:4,menuUrl: "/equipment"},
          //{menuName: "策略中心",urlId:5,menuUrl: "/strategy"},
          //{menuName: "统计中心",urlId:6,menuUrl: "/statistical"},
          //{menuName: "溯源中心",urlId:7,menuUrl: "/roots"},
          {menuName: "系统管理",urlId:8,menuUrl: "/area"}
        ],
      }
    },
    created: function () {
      this.getMesInfoDate();
    },
    mounted:function () {
      setInterval(()=>{
        this.getMesInfoDate();
      },3000000);
      eventBus.$on('getAlarmMesval', (data) => {
        if(data) this.getMesInfoDate();

      })
    },
    methods: {
      sureHandel () {
        this.$store.dispatch('logout', {})
          .then(response => {
            this.store.commit('FETCH_API_TOKEN', '');
            localStorage.clear();
            this.$router.push({path: '/login'});
            
          });
      },
      exitLayer(){
        
        this.show=!this.show;
        EventBus.$emit('loginOutclicked', this.show);
      },
      onSelectType: function (type) {
        this.show = type;
      },
      infoHandel() {
        localStorage.setItem("currentIndex", 1);
        this.$router.push({path: '/page_realwarning'});
        eventBus.$emit('getSlidebarPosition', 1)
      },
      saveUrlId(index){
        localStorage.setItem("urlId", index);
      },
      getMesInfoDate() {
        this.$store.dispatch('fetchAlarmNum', {
          statusIds: 3
        }).then((data) => {
          this.mesNumShow = true;
          this.mesnum = data.total;
          if (this.mesnum === 0 || this.mesnum === null || this.mesnum === undefined) {
            this.mesNumShow = false
          }else if(this.mesnum > 99){
            this.mesnum = '99+'
          }
        }, (error) => {
        })

      },
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header {
    .header-wrap {
      position fixed;
      top: 0px;
      left: 0;
      width:100%;
      height:50px;
      padding:0px;
      z-index:999999;
      background:#464c5b;
      overflow: hidden;
      h1 {
        margin: 0;
        float: left;
        width: 220px;
        height: 50px;
        background: url(../../../static/resource/nongye/img/white-logo.png) no-repeat center;
        background-size: 80% auto;
      }
      .header-menu{
        float:left;
        //min-width:1100px;
        min-width:550px;
        height:50px;
        padding:0px;
        margin:0px;
        display:flex;
        list-style:none;
        align-items:center;
        li{
          flex:1;
          font-size:16px;
          text-align:center;
          a{
            display:block;
            color:#fff;
            text-decoration: none;
          }
        }
      }
      .user-exit{
        float:right;
        height:50px;
        line-height:50px;
        margin-right:20px;
        font-size:14px;
        color:#fff;
        cursor:pointer;
        .iconfont{
          font-size:12px;
          margin-right:5px;
        }
      }
      .notice {
        position:relative;
        padding-left:0px;
        cursor: pointer;
        .iconfont {
          font-size: 18px;
          color: #b0b1b4;
        }
        .mesNum {
          position: absolute;
          top: -15px;
          right: 26px;
          min-width 28px;
          height: 20px;
          font-size 12px;
          font-style normal;
          border-radius: 20px;
          line-height: 20px;
          background: #ff5560;
          color: #fff;
          font-weight bold;
          text-align center;

        }
      }
    }
  }
   @media screen and (max-width: 1360px) {
    .header .header-wrap .header-menu{
        //min-width:900px;
      }
      
    }
    @media screen and (max-width: 1230px) {
    .header .header-wrap .header-menu{
        //min-width:800px;
      }
      
    }
  
  
</style>
