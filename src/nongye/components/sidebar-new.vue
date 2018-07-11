<template>
  <div class="slde-wrap">
    <div class="sidebar">
      <div class="sidebar-main">
        <ul class="sidebar-menu">
          <template v-for="(item ,index) in menulist">
            <li class="itemClass" v-if='item.currentId  == urlId'>
              <template v-if="item.menuUrl">
                <div class="single" @click="isToggle(item.menuName, item.defaultActive, index)">
                  <router-link :to="item.menuUrl" :name="'sidebar_item_'+index">
                    <i :class="['iconfont', item.menuIcon]"></i>
                    <span >{{item.menuName}}</span>
                  </router-link>
                </div>
              </template>
              <template v-else-if="item.children">
                <div class="single" @click="isToggle(item.menuName, item.defaultActive, index)">
                  <i :class="['iconfont',item.menuIcon]"></i>
                  <span >{{item.menuName}}</span>
                  <i class="trangle"
                     :class="[config.iconfont, (item.menuName === toggleName) || item.defaultActive? config.icon_expand: config.icon_collapse]"></i>
                </div>
                <transition name="sliderToggle" mode="out-in">
                  <ul class="tree-menu" v-show="treeMenu">
                    <li v-for="(subitem,subindex) in item.children" :key="subindex"
                        :class="currentUrl === subitem.menuUrl ? 'active':''" @click='selectSidebarDec(index)'>
                      <router-link :to="subitem.menuUrl"  :name="'sidebar_child_'+subindex">
                        <!--<i :class="subitem.menuIcon"></i>-->
                        <span >{{subitem.menuName}}</span>
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </template>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import VMessagebox from '@com/alert/message-box'
  import eventBus from '@com/event-bus';

  export default {
    name: 'new-sidebar',
    components: {
      VMessagebox
    },
    data() {
      return {
        show: false,
        baseMaskShow: false,
        nowIndex: 0,
        childIndex: 0,
        treeMenu:true,
        currentUrl: '', // 默认当前浏览器的url /page_monitor
        urlId:1,//初始当前路径id
        toggleName: '',  // 菜单子项目名称
        config: {
          'iconfont': 'iconfont', // iconfont的字体
          'icon_collapse': 'icon-tubiao-', // 箭头 下
          'icon_expand': 'icon-jiantou_up' // 箭头 上
        },
        props: ['toggle', 'padMode'], // 这里是用来构成布局响应传递的props,单一组件不用管他

        showPersonal: false,
        baseInfo: {
          name: '测试者',
          number: '159 6027 8888',
          time: '2018-3-9 11:25'
        },
        info: {
          imgUrl: require('../assets/img/logo.png'),
          administrators: '管理员',
          adminName: '石先生'
        },
        menulist: [
           {
            index: '',
            menuName: "监控中心",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "1",
            children: [
               {menuName: "实时状态", "menuUrl": "/page_monitor"},
               {menuName: "视频监控", "menuUrl": "/monitor"}
            ]
          },
           {
            menuName: "告警管理",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "2",
            children: [
              {menuName: "实时告警", "menuUrl": "/page_realwarning"},
              {menuName: "告警记录", "menuUrl": "/page_warnlog"},
              //{menuName: "告警管理", "menuUrl": "/alarmmanage"},
              //{menuName: "告警设置", "menuUrl": "/alarm_setup"}
            ]
          },
           {
            menuName: "工单管理",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "3",
            children: [
               {menuName: "工单列表", "menuUrl": "/repairorder"}
            ]
          },
           {
            menuName: "设备管理",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "4",
            children: [
               {menuName: "设备列表", "menuUrl": "/equipment"}
            ]
          },
           {
            menuName: "策略中心",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "5",
            children: [
               {menuName: "策略设置", "menuUrl": "/strategy"}
            ]
          },
           {
            menuName: "统计中心",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "6",
            children: [
               {menuName: "数据统计", "menuUrl": "/statistical"}
            ]
          },
           {
            menuName: "溯源中心",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "7",
            children: [
               {menuName: "溯源设置", "menuUrl": "/roots"}
            ]
          },
           {
            menuName: "系统管理",
            menuIcon: 'iconfont icon-31',
            menuUrl: "",
            currentId: "8",
            children: [
               {menuName: "区域管理", "menuUrl": "/area"},
               //{menuName: "系统设置", "menuUrl": "/systems"}

            ]
          }/*,
          {
            menuName: "设置",
            menuIcon: 'iconfont icon-shezhi',
            children: [
              {menuName: "系统设置", "menuUrl": "/system"},
              {menuName: "告警管理", "menuUrl": "/alarmmanage"}

            ]
          }*/
        ],
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo',
      }),

    },
    destroyed: function () {
    },
    mounted:function () {
      this.judgeSidebar();
      eventBus.$on('getSlidebarPosition', (data) => {
        this.nowIndex = data
      })
    },
    created: function () {
      this.nowIndex = localStorage.getItem("currentIndex") || 0;

      this.$nextTick(() => {
        this.menulist.forEach((item, index) => { // 增加标记位,判断当前url然后自动展开或者激活对应项(刷新默认展开当前url的项)
          if (!item.children && item.menuUrl) {
            this.currentUrl === item.menuUrl ? this.$set(item, 'defaultActive', true) : '';
          } else {
            if (item.children) {
              item.children.forEach((subitem, index) => {
                this.currentUrl === subitem.menuUrl ? this.$set(item, 'defaultActive', true) : '';
              })
            }
          }
        })
      });
    },
    methods: {
      selectSidebarDec(index){
        this.nowIndex = index
      },
            //判断当前路由匹配左侧导航
      judgeSidebar(){
        for(let i=0;i<this.menulist.length;i++){
            for(let j=0;j<this.menulist[i].children.length;j++){
                 if(this.menulist[i].children[j].menuUrl==this.$route.fullPath.split('?')[0]){
                        localStorage.setItem("urlId", this.menulist[i].currentId);
                        this.urlId=this.menulist[i].currentId;
                    }
            }
        }
      },
     /* classObject: function () {
        document.getElementsByClassName('active').parentNode.style.display=block;
      },*/
      sureHandel () {
        this.$store.dispatch('logout', {})
          .then(response => {
            this.$router.push({path: '/login'});
            localStorage.clear();
          });
      },
      onSelectType: function (type) {
        this.show = type;
      },
      isToggle(name, defaultActive, index) {
        this.treeMenu=!this.treeMenu;
        this.nowIndex = index;
        //点击默认第一个按钮
        this.currentUrl = this.menulist[index].children[0].menuUrl;
        this.$router.push({path: this.currentUrl});
        this.clearDefaultActive();
        // 判断展开收缩的核心
        ((defaultActive ? false : name) !== this.toggleName) ? this.toggleName = name : this.toggleName = '';
      },
      clearDefaultActive() {
        this.menulist.forEach(item => {
          this.$delete(item, 'defaultActive')
        })
      },
      personalToggle() {
        this.showPersonal = !this.showPersonal;
      },
      baseDataToggle() {
        this.baseMaskShow = !this.baseMaskShow;
      },
      
//    
    },
    watch: {
      '$route'() {
          console.log(this.$route.fullPath);
        if(this.$route.fullPath !== '/index'){
          this.currentUrl = this.$route.fullPath;
        }else{
          this.currentUrl='/page_monitor' 
        }
         // 实时监测当前路由的变化并且赋值
        
        
        localStorage.setItem('currentIndex', this.nowIndex);
        this.judgeSidebar();
        if(localStorage.getItem("urlId")!==null){
          this.urlId=localStorage.getItem("urlId");
        }else {
          this.urlId=1
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar-main{
    margin-top:-5px;
  }
  .sidebar-main ul li.active:nth-child(1) a, a.active.router-link-exact-active {
    color: #48c9b0;
  }
  .slde-wrap {
    position fixed;
    top: 50px;
    left: 0;
    width:220px;
    height: 100%;
    box-sizing: border-box;
    z-index: 99;
    background #fcfcfc;
  }

  .mask {
    position fixed;
    width 100%;
    height 100%;
    top: 0;
    left: 0;
    background #fff;
    opacity 0;
    z-index 9999
  }

  .base-data {
    position fixed
    width 100%
    height 100%
  }

  .base-mask {
    position: fixed;
    width: 100%;
    height 100%;
    background: #000;
    opacity 0.5;
    z-index 9999;
  }

  .data-con {
    position: absolute;
    background #fff;
    z-index: 99999;
    width: 500px;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -170px;
    .tit {
      width: 100%;
      height: 50px;
      background: #f5faff;
      line-height: 50px;
      padding: 0 20px 0 25px;
      box-sizing: border-box;
      font-weight: bold;
      .fr {
        float: right;
        cursor: pointer;
      }
      span {
        font-size: 20px;
      }
    }
    ul {
      padding: 5px 20px 91px 20px;
      li {
        border-bottom: 2px solid #f0f0f0;
        color: #b0b1b4;
        line-height: 66px;
        padding 0 5px 0 7px;
        box-sizing border-box
      }
      .contxt {
        float: right;
        color: #313131;
      }
    }

  }

  a {
    color: #313131;
    text-decoration none
  }


  .personalCenter {
    position: absolute;
    top: 50px;
    background #fff;
    padding: 15px 0 12px 30px;
    z-index: 999999;
    width: 176px;
    box-sizing: border-box;
    box-shadow: 3px 3px 20px #e4e4e4;
    .safeOut{
      margin-top: 9px;
      padding-top: 5px;
    }

    .center-item {
      line-height: 39px;
      padding-right: 50px;
      cursor pointer
      .iconfont {
        margin-right: 10px;
      }
      span:hover {
        color #47a1fd
      }
    }
    .safeOut {
      border-top: 2px solid #f0f0f0;
    }
  }

  .personalCenter::after {
    content: "";
    position absolute
    top 28px;
    left -12px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 12px solid transparent;
  }

  .sidebar {
    float: left;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fcfcfc;
    height: 100vh;
    box-shadow: 3px 3px 20px #e4e4e4;
    .top {
      padding: 48px 0 30px 70px;
      overflow: hidden;
      .admin {
        height 25px;
        margin-top:7px;
        font-size 14px
        color: #b0b1b4
      }
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 11px;
        cursor: pointer;
      }
      span {
        display: block;
        line-height: 25px;
      }
    }
  }

  .sidebar-menu > li {
    padding: 0px;
    line-height: 50px;
    font-weight 100;
    font-size 18px;
    box-sizing border-box;
    background:#eee;
    color:#888;
    cursor: pointer;
    .iconfont {
      margin-right: 0px;
      font-size 20px
    }
    .webfont {
      font-weight:100;
    }
    .trangle {
      float: right
      margin-right: 46px;
      font-size 20px
    }
    &.active {
      box-sizing: border-box;
      > .single {
        color #48c9b0
        a {
          display block
        }
      }
    }

    .tree-menu {
      background:#fcfcfc
      li{
        padding-left:60px;
        border-bottom:1px solid #f2f2f2;
      }
      li:hover{
        background:#fff;
        color #48c9b0
        a{
          color #48c9b0
        }
      }
      li a{
        display block
      }
      li.active {
        background:#fff;
        > a {
          color #48c9b0
        }
      }
    }
  }

  .sidebar-menu li .single {
    margin-left:34px;
    overflow: hidden
    display: block;
    color: #313131
  }

  ul {
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    li {
      font-size: 16px;
      display: block;
    }
  }

  .icon-touxiang:before, .icon-ziliaoduibi:before, .icon-lock:before, .icon-tuichu:before {
    color #47a1fd
  }


</style>
