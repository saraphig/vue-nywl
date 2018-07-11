<template>
  <div class="right-head">
    <div class="right-head">
      <div class="right-head-logo"><img :src="logourl"
          v-if='logourl'></div>
      <div class='right-head-alarm'
        @mouseenter='closemonitor()'
        @mouseleave='showmonitor()'>
        <i class="iconfont icon-icon_topbar_gaojingtongzhi"></i>
        <i class="mesNum"
          v-show="mesNumShow">{{mesnum}}</i>
        <div class='alarm-list'>
          <ul>
            <li v-for="item in alarmList"
              @click='infoHandel()'>
              <div><img src="../../../static/resource/nongye/img/alarm-list-bg.png"></div>
              <div>
                <strong>{{item.areaName}}</strong>
                <p class="alarm-info"
                  v-html='alarmLevelColor(item)'></p>
                <p class="alarm-info-date">{{item.systemTime|filterGetDateTime}}</p>
              </div>
            </li>
            <li class="more-alarm"
              @click='infoHandel()'>{{alarmore}}</li>
          </ul>
        </div>
      </div>
      <div @mouseenter="showOrgPanel=false">
        <weather-view ref="$weather"
          class="weather-view"></weather-view>
      </div>
      <div class="right-head-dress">
        <i class="iconfont icon-icon_topbar_dangqianjigou"></i>
        <span>
          <div class="header-org-select"
            v-clickoutside="handleClickOutSide">
            <div class="header-org-select--input"
              @click="toggleOrgPanel">
              {{orgText}}
            </div>
            <!-- <i class="iconfont icon-icon_jiantou_xiazhankai"></i> -->
            <div class="header-org-select--dropdown"
              v-show="showOrgPanel">
              <sh-tree ref="tree"
                :defaultSelectKey="selectKey"
                nodeKey="areaCode"
                :disabledSelect="false"
                :defaultExpandAll="true"
                textKey="idName"
                childrenKey="childrens"
                :data="treeNodes"
                @node-click="handleClickNode"></sh-tree>
            </div>
          </div>
        </span>
      </div>

      <!--  -->
      <!-- <span>金诚集团</span> -->
      <!-- <div class="last-update-time">截止时间：{{organTime}}</div> -->
    </div>

  </div>
</template>
<script>
import treeOrganizatio from "./tree_organizatio";
import weatherView from "./weather_view";
import { mapGetters } from "vuex";
import eventBus from '@com/event-bus';
import alarmfilter from '../views/page_realwarning/filter.js'
import ShInput from "@com/sh-ui/components/sh-input"
import ShTree from "@com/sh-ui/components/sh-tree/sh-tree"
import clickoutside from "@com/sh-ui/directives/clickoutside"
import { setStore } from '@lib/js/mUtils'

export default {
  name: 'right-header',
  directives: {
    clickoutside
  },
  components: {
    "weather-view": weatherView,
    ShInput,
    ShTree
  },
  data() {
    return {
      queryParams: {
        levelId: null,
        typeId: null,
        pageNumber: 1,
        startTime: null,
        endTime: null
      },
      logourl: null,
      alarmList: [],
      mesNumShow: false,
      mesnum: 0,
      areaList: [{
        id: '1',
        value: '金诚集团'
      }],
      organDefault: '1',
      organTime: '2018-03-01 12:30:00',
      treeNodes: [],
      showOrgPanel: false,
      orgText: "",
      selectKey: null,
      alarmore: '当前暂无告警'
    }
  },
  computed: {
    ...mapGetters({
      userKey: 'getUserKey',
    }),
  },
  methods: {
    ...alarmfilter,
    handleClickOutSide() {
      this.showOrgPanel = false;
    },
    handleClickNode(treeNode) {
      debugger
      if (!treeNode || treeNode.data && !treeNode.data.areaCode) {
        alert("此机构被禁用，请联系管理员。");
        this.$router.push({
          path: '/login',
          query: {}
        });
        return;
      }
      let nodeData = treeNode.data;
      let areaCode = nodeData.areaCode;
      // 全局处理areaCode区域编码
      this.showOrgPanel = false;
      this.orgText = nodeData.idName;
      this.logourl = nodeData.pictureUrl;
      this.$refs.tree.setSelectKey(areaCode);
      setStore('organizationCode', areaCode);
      setStore('organizationId', nodeData.id);//机构编辑用到的 parentId 
      setStore('organizationName', nodeData.idName);//机构编辑用到的 parentName 

      this.$store.commit("FETCH_ORGANIZATION_ENTITY", nodeData);
      // setStore('organizationId', nodeData.id);
      let saveurl = this.$route.fullPath;
      let geturl = saveurl.split("?");
      let lasturl = geturl[0].split("/");
      this.currentUrl = "/" + lasturl[1];
      this.$router.push({
        path: this.currentUrl,
        query: {}
      })
      this.$store.commit('FETCH_USER_KEY', new Date().toString())
      this.getalarm();
    },
    toggleOrgPanel() {
      this.showOrgPanel = !this.showOrgPanel;
      if (this.showOrgPanel) {
        this.getOrganizationTree(true);
      }
    },
    dataAreaTree() {

    },
    closemonitor() {
      eventBus.$emit('thismonitor', true)
      this.showOrgPanel = false;
    },
    showmonitor() {
      eventBus.$emit('thismonitor', false)
    },
    getTime() {
      let myDate = new Date();
      let date = myDate.toLocaleDateString().split("/").join('-');
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let seconds = myDate.getSeconds();
      this.organTime = date + " " + hours + ":" + minutes + ":" + seconds;
    },
    infoHandel() {
      localStorage.setItem("currentIndex", 1);
      this.$router.push({ path: '/page_realwarning' });
      eventBus.$emit('getSlidebarPosition', 1)
    },
    getalarm() {
      this.$store
        .dispatch("getAlarmData", {
          statusIds: "0,1,4,5",
          levelId: this.queryParams.levelId,
          statusId: this.queryParams.typeId,
          systemStartTime: this.queryParams.startTime,
          systemEndTime: this.queryParams.endTime,
          pageNo: 1,
          pageSize: "4",
          t: new Date().getTime() //时间戳，ie兼容
        })
        .then(
          data => {

            this.alarmList = data.data;

            this.mesNumShow = true;
            this.mesnum = data.total;
            this.alarmore = '查看所有告警'
            if (this.mesnum === 0 || this.mesnum === null || this.mesnum === undefined) {
              this.mesNumShow = false
              this.alarmore = '当前暂无告警'
            } else if (this.mesnum > 99) {
              this.mesnum = '99+'
            }

          },
          error => {
            alert("获取实时告警数据失败，服务器错误！");
          }
        );
    },
    getOrganizationTree(isNotClick) {
      this.$store.dispatch('getOrganizationTree', { "USER-ID": 1 }
      ).then((response) => {
        const deleteArea = function (nodes) {
          if (!nodes) return;
          nodes.map(childNode => {
            if (childNode.childrens) {
              const childList = childNode.childrens;
              childNode.childrens = [];
              childList.forEach(cnode => {
                if (cnode.areaLevel !== 9) {
                  childNode.childrens.push(cnode);
                }
              });
              if (childNode.childrens.length < 1) {
                delete childNode.childrens;
              }
              deleteArea(childNode.childrens)
            }
          });
        }
        deleteArea(response)
        this.treeNodes = response;
        this.$nextTick(() => {
          if (!isNotClick) {
            this.handleClickNode(this.$refs.tree.getNodes()[0]);
          }
        })
      }, (error) => {
        this.treeNodes = [];
      })
    },
  },
  created() {
    this.getOrganizationTree();

  },
  mounted() {
    this.getalarm();
    this.getTime();


    //setInterval(this.getTime,10000);//定时更新时间
    /*this.$store.dispatch('getAreaSelect').then((data) => {
     for(let i=0;i<data.length;i++){
             data[i].value=data[i].idName;
           }
     this.areaList=data;
     this.organTime=this.areaList[1].gmtModified;
     this.$store.commit('GET_ORGAN_DATA',data);
     if(this.areaList.length > 0) {
       this.$refs.organSelect.setDefaultSelect(this.areaList[1].id, this.areaList[1].value); //设置默认区域显示
       this.$store.commit('GET_ORGAN_ID',this.areaList[1].id);//设置默认区域id

     }
   }, (error) => {
     console.log(error);
   });*/
    this.$store.commit('GET_ORGAN_ID', this.areaList[0].id);
    this.$store.commit('GET_ORGAN_DATA', this.areaList);

    eventBus.$on('setUpdateTime', (intime) => {
      this.organTime = intime;
    })
  },
  watch: {
    organDate() {
      this.organTime = this.organDate;
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.right-head {
  width: 100%;
  height: 60px;
  background-color: white;
  position: relative;
  white-space: nowrap;

  .right-head-logo {
    margin: 0;
    float: left;
    margin-left: 50px;
    margin-top: 20px;
    width: 124px;
    height: 20px;
    // background: url('../../../static/resource/nongye/img/logo1.png') no-repeat center;
    background-size: 100% 100%;
  }

  .right-head-logo img {
    height: 100%;
    width: 100%;
  }

  .right-head-dress {
    float: right;
    font-size: 14px;
    height: 60px;
    line-height: 60px;

    .icon-icon_jiantou_xiazhankai {
      position: absolute;
      right: 5px;
      top: 10px;
      height: 16px;
      line-height: 16px;
    }

    &:hover {
      // background: #f1f7fa;
    }
  }

  .right-head-dress .icon-icon_topbar_dangqianjigou {
    float: left;
    font-size: 24px;
    line-height: 60px;
    margin-right: 7px;
    color: #41a259;
  }

  .right-head-dress span {
    float: left;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }

  .right-head-alarm {
    position: relative;
    float: right;
    height: 60px;
    line-height: 60px;
    width: 90px;
    text-align: center;
    margin-right: 20px;

    .iconfont {
      font-size: 24px;
      color: #666666;
    }

    .mesNum {
      position: absolute;
      top: 5px;
      right: 15px;
      min-width: 28px;
      height: 20px;
      font-size: 12px;
      font-style: normal;
      border-radius: 20px;
      line-height: 20px;
      background: #ff5560;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }

    .alarm-list {
      display: none;
      position: absolute;
      top: 50px;
      right: 0px;
      z-index: 999;
      padding: 10px 30px;
      background: #fff;
      width: 280px;
      -moz-box-shadow: 0px 3px 7px #ccc;
      -webkit-box-shadow: 0px 3px 7px #ccc;
      box-shadow: 0px 3px 7px #ccc;
      box-shadow: 0px 3px 7px #ccc;
      -webkit-box-shadow: 0px 3px 7px #ccc;
      box-shadow: 0px 3px 7px #ccc;

      ul {
        overflow: hidden;
        padding: 0px;
      }

      li {
        list-style: none;
        padding-top: 20px;
        height: 80px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;

        div:first-child {
          float: left;
          width: 60px;
          height: 60px;

          img {
            width: 100%;
          }
        }

        div:last-child {
          float: right;
          width: 193px;
          text-align: left;

          strong {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            display: block;
            margin: 0px;
            font-weight: 100;
          }

          .alarm-info {
            line-height: 20px;
            margin: 0px;
            font-size: 14px;
            overflow: hidden;
            color: red;

            span {
              display: inline-block;
              margin-top: 3px;
              margin-right: 5px;
              font-size: 12px;
              height: 20px;
              border-radius: 2px;
              padding-left: 3px;
              padding-right: 3px;
            }
          }

          .alarm-info-date {
            line-height: 20px;
            margin: 0px;
            font-size: 12px;
            color: #888;
          }
        }
      }

      li:last-child {
        border-bottom: 1px;
      }

      .more-alarm {
        padding-top: 0px;
        height: 60px;
        line-height: 60px;
        color: #666666;
        font-weight: 100;
        font-size: 14px;
      }
    }

    .alarm-list:before {
      content: '';
      position: absolute;
      top: -10px;
      right: 30px;
      z-index: 99999;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 10px solid #fff;
    }
  }

  .right-head-alarm:hover {
    background: #f1f7fa;

    .alarm-list {
      display: block;
    }
  }

  .cur-org {
    position: absolute;
    left: 45px;
    top: 24px;
  }

  .select {
    position: absolute;
    left: 140px;
    top: 12px;
  }

  .last-update-time {
    position: absolute;
    left: 400px;
    top: 24px;
    color: #CCCCCC;
  }

  .weather-view {
    position: relative;
    display: inline-block;
    width: 120px;
    float: right;
  }
}

.header-org-select {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  color: #444444;

  .header-org-select--input {
    display: block;
    background-color: #fff;
    background-image: none;
    border-radius: 2px;
    box-sizing: border-box;
    color: #444444;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    outline: 0;
    padding-left: 15px;
    padding-right: 30px;
    cursor: pointer;
  }

  .header-org-select--dropdown {
    background: #FFFFFF;
    box-shadow: 0 2px 10px 0 rgba(7, 23, 51, 0.05);
    min-width: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    position: absolute;
    z-index: 900;
    min-height: 120px;
    max-height: 400px;
    overflow: auto;
    width: 260px;
    top: 50px;

    .sh-tree-node--content {
      height: 40px !important;
      line-height: 40px !important;
    }
  }

  .sh-tree-node--icon {
    margin-left: 14px !important;
  }
}
</style>
