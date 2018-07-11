<template>
  <div id="monitor"
    class="monitor"
    onselectstart="return false">

    <!-- 头部 -->
    <div class="monitortop">

      <p class="monitorTitle webfont-bold">{{msges}}</p>

      <div class="searchbox">
        <div :class="{activecolor:kkkl}"
          class="relistinputbox">
          <input @focus='gaibian(2)'
            @blur='gaibian(1)'
            name="videomonitorlist"
            id="relistinput"
            @click="searchListl()"
            class="relistinput"
            v-model="showInput"
            placeholder="搜索地块名称" />
          <i class="seach_bott seach-iconfont iconfont icon-icon_shipinjiankong_suofang"></i>
          <!--@click="searchMonitorlist()"-->
        </div>
        <ul v-show='regionList.length>0?true:false'
          class="relistul">
          <li v-for='(showitem,i) in regionList'
            :key=i-999
            @click="findReginList(showitem.areaCode,showitem.idName)">{{showitem.idName}}</li>
        </ul>
      </div>

      <div id='activeBox'
        class='activeBox'
        :class="{activecolor : nowold}">
        <span id='monitorActive1'
          class='selSpan'>{{msges}}</span>
        <div class="iBox">
          <i id='monitorActive2'
            class="iconfont m-iconfont icon-icon_jiantou_xiazhankai"
            :class="{open : nowold}"></i>
        </div>
        <ul class='regionsela'
          v-show='nowold'>
          <li @click='monitorActive()'>{{msges2}}</li>
        </ul>
      </div>
    </div>

    <!-- 左侧 -->
    <div class='monitorleft'>
      <!-- <div class="titlebg clearfix monitorHead">
        <span class="monitorTitle webfont-bold">{{msges}}</span>     
      </div> -->

      <!-- <drop-down :datalist="getAreaTree" @homearea="homeArea"></drop-down> -->
      <!-- <div class="searchbox">
        <div class="relistinputbox" >
          <input id="relistinput" @input="searchList()" @click="searchListl()" class="relistinput" v-model="showInput" placeholder="搜索区域名称"/>
          <i class="seach_bott seach-iconfont iconfont icon-sousuo"></i>
          
        </div>
        <ul v-show='regionList.length>0?true:false' class="relistul">
          <li v-for='(showitem,i) in regionList' :key=i-999 @click="findReginList(showitem.areaCode,showitem.idName)">{{showitem.idName}}</li>
        </ul>
      </div> -->
      <div class="linebox">
        <div class="line"></div>
        <span class='monitoringPointp'>视图模式</span>
      </div>
      <div class="regionjpgbox">
        <div class="regionjpg"
          :class='{activejpg:pactive==1}'
          @click='patterActive(1)'>
          <i :class='{activejpgico:pactive==1}'
            class="xshitu-iconfont iconfont icon-icon_shipinjiankong_x"></i>
          <span :class='{activejpgico:pactive==1}'
            class="reginjpgspan">1x1</span>
        </div>
        <div class="regionjpg regionjpgleft"
          :class='{activejpg:pactive==2}'
          @click='patterActive(2)'>
          <i :class='{activejpgico:pactive==2}'
            class="xshitu-iconfont iconfont icon-icon_shipinjiankong_x1"></i>
          <span :class='{activejpgico:pactive==2}'
            class="reginjpgspan">2x2</span>
        </div>
        <div class="regionjpg regionjpgleft"
          :class='{activejpg:pactive==3}'
          @click='patterActive(3)'>
          <i :class='{activejpgico:pactive==3}'
            class="xshitu-iconfont iconfont icon-icon_shipinjiankong_x2"></i>
          <span :class='{activejpgico:pactive==3}'
            class="reginjpgspan">3x3</span>
        </div>
        <div class="regionjpg regionjpgleft"
          :class='{activejpg:pactive==4}'
          @click='patterActive(4)'>
          <i :class='{activejpgico:pactive==4}'
            class="xshitu-iconfont iconfont icon-icon_shipinjiankong_x3"></i>
          <span :class='{activejpgico:pactive==4}'
            class="reginjpgspan">4x4</span>
        </div>
      </div>
      <!-- <div class='regionalSelection' :class="{activecolor : showPattern}">
        <span id='monitorPattern1' class='selSpan2'>{{pattermsg}}</span>
        <i id='monitorPattern2' class="iconfont x-iconfont icon-paixujiantouxia" ></i>
        <ul class='regionsel' v-show='showPattern'>
          <li :class='{activefont:pactive==1}' @click='patterActive(1)' >1X1视图模式</li>
          <li :class='{activefont:pactive==2}' @click='patterActive(2)' >2X2视图模式</li>
          <li :class='{activefont:pactive==3}' @click='patterActive(3)' >3X3视图模式</li>
          <li :class='{activefont:pactive==4}' @click='patterActive(4)' >4X4视图模式</li>
        </ul>
      </div> -->
      <div class="linebox">
        <span class="line"></span>
        <span class='monitoringPointp'>监控点</span>
      </div>

      <!-- <div class='monitoringPointbox'>
        <ul class='monitoringPointList'>
          <li @mousedown='dragList(item.ip,index,item.passWord,item.userName,item.areaDeviceDesc)' :class="{actlist : showlist==index?true:false}" v-for='(item,index) in monitorList' :key='index'>{{item.areaDeviceDesc}}</li>
       </ul>      
       </div> -->

      <div class='monitoringPointbox'>
        <!-- <draggable v-model="monitorList" @end="chufashijian" @add="huoqvweizhi(e)" @update='huo'> -->

        <ul class='monitoringPointList'>
          <li :title="item.assertName"
            draggable="true"
            @dragend="chufashijian"
            @mousedown='dragList(item.ip,index,item.passWord,item.userName,item.assertName,item.portLogin,item.portLogin,item.nvrChannel)'
            :class="{actlist : showlist==index?true:false}"
            v-for='(item,index) in monitorList'
            :key='index+33'>{{item.assertName}}</li>
        </ul>
        <!--        
 </draggable> -->
      </div>

      <!-- <h2 class='monitoringPointp'>视图选择:</h2>
      <div class="regionjpgbox">
        <div class="regionjpg" :class='{activejpg:pactive==1}' @click='patterActive(1)'><i :class='{activejpgico:pactive==1}' class="xshitu-iconfont iconfont icon-shitumoshi_x"></i></div>
        <div class="regionjpg regionjpgleft" :class='{activejpg:pactive==2}' @click='patterActive(2)'><i :class='{activejpgico:pactive==2}' class="xshitu-iconfont iconfont icon-shitumoshi_x3"></i></div>
        <div class="regionjpg regionjpgleft" :class='{activejpg:pactive==3}' @click='patterActive(3)'><i :class='{activejpgico:pactive==3}' class="xshitu-iconfont iconfont icon-shitumoshi_x2"></i></div>
        <div class="regionjpg regionjpgleft" :class='{activejpg:pactive==4}' @click='patterActive(4)'><i :class='{activejpgico:pactive==4}' class="xshitu-iconfont iconfont icon-shitumoshi_x1"></i></div>
      </div> -->

      <div v-show='!this.showMonitor'>
        <div class="line"></div>
        <h2 class='monitoringPointp PTZh'>历史数据</h2>
        <div class='timescom'
          style="margin-left:30px;width:260px;height:330px;">
          <custom-calendar @daychanged="startHistory"
            CalendarId="CalendarId2"
            class="SelectBox"
            style="width:260px;"
            widthData="260"></custom-calendar>
        </div>
      </div>

      <div v-show='this.showMonitor'>
        <div class="line"></div>
        <h2 class='monitoringPointp PTZh'>云台控制</h2>
        <div class='PTZControl'>
          <div class="ptz">
            <div class='PTZbox PTZbox1'>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==5}"
                @mousedown="PTZControl(5);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==5}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zuoshang"></i>
              </div>
              <div :class="{activePTZ : PTZactive==1}"
                class='shouxing ptzbox2'
                @mousedown="PTZControl(1);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==1}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_shang"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==7}"
                @mousedown="PTZControl(7);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==7}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_youshang"></i>
              </div>
              <div :class="{activePTZ : PTZactive==3}"
                class='shouxing ptzbox4'
                @mousedown="PTZControl(3);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==3}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zuo"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==9}"
                @click="PTZControl(9);">
                <i :class="{activePTZmsg : PTZactive==9}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_fuyuan"></i>
              </div>
              <div :class="{activePTZ : PTZactive==4}"
                class='shouxing ptzbox6'
                @mousedown="PTZControl(4);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==4}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_you"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==6}"
                @mousedown="PTZControl(6);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==6}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zuoxia"></i>
              </div>
              <div :class="{activePTZ : PTZactive==2}"
                class='shouxing ptzbox8'
                @mousedown="PTZControl(2);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==2}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_xia"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==8}"
                @mousedown="PTZControl(8);"
                @mouseup="mouseUpPTZControl();">
                <i :class="{activePTZmsg : PTZactive==8}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_youxia"></i>
              </div>
            </div>
            <div class='PTZbox'>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==12}"
                @mousedown="PTZZoomout(12)"
                @mouseup="PTZZoomStop()">
                <i :class="{activePTZmsg : PTZactive==12}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_jianxiao"></i>
              </div>
              <div class='ptzbox2 boxbordernone'>
                <i class="PTZicofontz iconfont icon-icon_shipinjiankong_suofang"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==11}"
                @mousedown="PTZZoomIn(11)"
                @mouseup="PTZZoomStop()">
                <i :class="{activePTZmsg : PTZactive==11}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zengjia"></i>
              </div>
              <div class='shouxing ptzbox4'
                :class="{activePTZ : PTZactive==16}"
                @mousedown="PTZIrisOut(16)"
                @mouseup="PTZIrisStop()">
                <i :class="{activePTZmsg : PTZactive==16}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_jianxiao"></i>
              </div>
              <div class="boxbordernone">
                <i class="PTZicofontz iconfont icon-icon_shipinjiankong_guangquan"></i>
              </div>
              <div class='shouxing ptzbox6'
                :class="{activePTZ : PTZactive==15}"
                @mousedown="PTZIrisIn(15)"
                @mouseup="PTZIrisStop()">
                <i :class="{activePTZmsg : PTZactive==15}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zengjia"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==14}"
                @mousedown="PTZFoucusOut(14)"
                @mouseup="PTZFoucusStop()">
                <i :class="{activePTZmsg : PTZactive==14}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_jianxiao"></i>
              </div>
              <div class="ptzbox8 boxbordernone">
                <i class="PTZicofontz iconfont icon-icon_shipinjiankong_duijiao"></i>
              </div>
              <div class="shouxing"
                :class="{activePTZ : PTZactive==13}"
                @mousedown="PTZFocusIn(13)"
                @mouseup="PTZFoucusStop()">
                <i :class="{activePTZmsg : PTZactive==13}"
                  class="PTZicofont iconfont icon-icon_shipinjiankong_zengjia"></i>
              </div>
            </div>
          </div>
          <div>
            <div class='regionalSelection presetValue'
              :class="{activecolor : showPreset}">
              <span id='monitorPreset1'
                class='selSpan3'>预置点：
                <span class="presetnum">{{presetmsg}}</span>
              </span>
              <i id='monitorPreset2'
                class="iconfont y-iconfont icon-icon_jiantou_xiazhankai"
                :class="{open : showPreset}"></i>
              <ul class='presetsel'
                v-show='showPreset'>
                <li :class='{activefont: practive==itms}'
                  v-for='(itms,idx) in 99'
                  @click='presetActive(itms)'>{{itms}}</li>
              </ul>
            </div>
            <div class='preset pdiao shouxing'
              :class="{activego : ppt}"
              @mousedown='ppt=true'
              @mouseup='ppt=false'
              @click="GoPreset();">
              <p>调用</p>
            </div>
            <div class='preset pshe shouxing'
              :class="{activeset : pps}"
              @mousedown='pps=true'
              @mouseup='pps=false'
              @click="SetPreset();">
              <p>设置</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="monitorRightBox">
      <div>
        <!-- <div class="monitorRightTopbox">
          <div id='activeBox' class='activeBox' :class="{activecolor : nowold}">
            <span id='monitorActive1' class='selSpan'>{{msges}}</span>
            <div class="iBox">
            <i id='monitorActive2' class="iconfont m-iconfont icon-paixujiantouxia" :class="{open : nowold}"></i>
            </div>
            <ul class='regionsela monitorsel' v-show='nowold'>
              <li @click='monitorActive()'>{{msges2}}</li>
            </ul>
          </div>
        </div> -->

        <!-- <iframe src=""> -->
        <div id="divPlugin"
          class="plugin"
          v-show="getshowbox">

          <div class="promptmsg">
            <p v-show="showpromptmsg">您当前使用的浏览器不支持NPAPI插件,使用不兼容的浏览器可能导致浏览异常，请您使用IE10以及以上版本的IE浏览器！</p>
          </div>
        </div>
        <!-- </iframe> -->

        <!-- <div>
        <video id="my-player"
            class="video-js"
            preload="auto"
            autoplay
            data-setup='{}'> 
          <source src="" type="video/mp4"></source>
        </video>
      </div> -->

        <!-- <iframe src="../../../../view/nongye/themonitor.html">

        </iframe> -->
        <!-- <kkkp :datalist='kkp'></kkkp> -->

        <div id="bottom-panel"
          class="bottom-panel"
          v-show='showtimeq&&getshowbox'>
          <custom-progress ref="$progress"
            :timeval="thentime"
            @realTime="receiveTime"
            @enterTime="enterTime"></custom-progress>
          <span class="real-time">{{ realTime }}</span>
          <span class="fastwardmsg backward-ex"
            :style="show_backwardmsg">{{ fastBackwardMsg }}</span>
          <i class="icon iconfont icon-icon_shipinjiankong_kuaitui icon-control backward"
            :style="show_backward"
            @click="fastBackwardHander(this)"></i>
          <i :class="show_pauseClass"
            :style="show_pause"
            @click="pauseHander(this)"></i>
          <i class="icon iconfont icon-icon_shipinjiankong_kuaijin icon-control forward"
            :style="show_forward"
            @click="fastForwardHander(this)"></i>
          <span class="fastwardmsg forward-ex"
            :style="show_forwardmsg">{{ fastForwardMsg }}</span>
        </div>
      </div>
    </div>
    <!-- <button @click="lll()">llll</button> -->
    <!-- <div class="bottom-panel" v-show='!this.showMonitor'>
        <custom-progress ref="$progress" :timeval="thentime" @realTime="receiveTime" @enterTime="enterTime"></custom-progress>
        <span class="real-time">{{ realTime }}</span>
        <span class="fastwardmsg backward-ex" :style="show_backwardmsg">{{ fastBackwardMsg }}</span>
        <i class="icon iconfont icon-shipin_kuaitui icon-control backward" :style="show_backward" @click="fastBackwardHander(this)"></i>
        <i :class="show_pauseClass" :style="show_pause" @click="pauseHander(this)"></i>
        <i class="icon iconfont icon-shipin_kuaijin icon-control forward" :style="show_forward" @click="fastForwardHander(this)"></i>
        <span class="fastwardmsg forward-ex" :style="show_forwardmsg">{{ fastForwardMsg }}</span>  
    </div> -->
    <!-- <iframe id="msglist" :style="{width:'100%',height:'100%'}"></iframe> -->

    <div id='drogBox'
      class='drogBox'
      v-show="showDrog">{{drogmsg}}</div>

    <!-- <kkkp   v-model="checkedIds"
            :tree-data="treeData"
            ref="kkp"
            :options='options'>
    </kkkp>
    <button @click="showtree()">你又开始了</button> -->

    <v-alert @callback='closeBox2'
      boxtitle='视频无法正常打开可能存在以下3种情况，请检查核对'
      v-show="showPrompt">
      <div slot="alertFunctionBox">
        <p class='alertp2'>
          1.设备网络配置参数填写错误，请到设备编辑页面确认; 2.请检查您的网络配置与您正在使用的网络是否相匹配; 3.可能会存在网速过慢的问题
        </p>
        <button class='shouxing confirm-button'
          @click='closeBox2'>
          <a>确认</a>
        </button>
      </div>
    </v-alert>

    <v-alert @callback='closeBox'
      boxtext='请下载控件'
      v-show="showEdit"
      boxtitle="插件下载">
      <div slot="alertFunctionBox">
        <p class='alertp'>您还未安装过插件,请下载监控需要的插件</p>
        <button class='shouxing confirm-button'
          @click='dowlond'>
          <a>确认</a>
        </button>
        <button class="shouxing confirm-button2"
          name="lights-confirm-button"
          @click='showEdit=false'>关闭</button>
      </div>
    </v-alert>
  </div>
</template>
<script>
// v-show="!getPopupState"
import { mapGetters } from 'vuex';
// import customFlatpickr from "@com/datetime/custom_flatpickr";
import customProgress from "../../components/custom_progress";
//import customFlatpickr from "@com/datetime/custom_flatpickr";
import VAlert from '@com/alert';
import dropDown from '@com/drop-down';
import { setFontSize } from "@lib/js/mUtils";
import { EventBus } from '@lib/js/event-bus';
//import roleTree from '../../components/role-tree';
import axios from 'axios';
import eventBus from '@com/event-bus';
import customCalendar from '@com/custom_calendar';
// import roleTree from '../../components/tree/VueTree';
export default {
  name: 'monitors',
  data() {
    return {
      kkkl: false,
      //ids:['3.2'],
      // checkedIds:['3.2'],
      //treeData:[],
      //kkp:[{'name':'监控中心','id':'kkk','children':[{'name':'实时状态','id':'ooo'},{'name':'地图监控','id':'iii'}]},{'name':'系统管理','id':'ppp','children':[{'name':'机构管理'},{'name':'区域管理'},{'name':'权限管理','children':[{'name':'用户权限'},{'name':'管理权限'}]}]}],
      showInput: '',
      homearea: { id: 1, name: '全部区域' },
      getAreaTree: [],
      supersw: false,
      showEdit: false,
      drogmsg: '',
      getshowbox: true,
      showlist: 9999,
      monitorList: [],//[],
      playVideo: [],
      iWndIndex: 0,
      iiTypes: 2,
      number: 0,
      showPrompt: false,
      showpromptmsg: false,
      showMonitor: true,
      g_bPTZAuto: false,
      showRegion: false,
      showPattern: false,
      showPreset: false,
      nowold: false,
      pattermsg: '2X2视图模式',
      regionmsg: '全部区域',
      presetmsg: '1',
      loginIp: [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]],
      ppt: false,
      pps: false,
      PTZactive: 99,
      zidong: false,
      calendar_option: {
        inline: true,
        enableTime: false,
        defaultDate: this.getToday()
      },
      pactive: 2,
      practive: 1,
      thistimes: '',
      showDrog: false,
      speed: 0,
      Vstop: false,
      showdrogBox: false,
      backTime: '',
      thentime: "00:00:00",
      realTime: "00:00:00",
      fastBackwardlevel: 0,
      fastForwardlevel: 0,
      fastBackwardMsg: "慢放1x",
      fastForwardMsg: "快进1x",
      levelState: "",
      stepspeed: 0,
      sp: 1,
      spnum: 0,
      pageWidth: 0,
      chajian: true,
      sw: true,
      inputsw: 0,
      historyStart: 0,
      regionList: [],//[{AreaCode:1,AreaName:'ppp'},{AreaCode:1,AreaName:'ppp'},{AreaCode:1,AreaName:'ppp'},{AreaCode:1,AreaName:'ppp'},{AreaCode:1,AreaName:'ppp'}]
      options: {
        label: 'actionGroupName',
        depthOpen: 99,
        checkbox: true,
        checkedIcon: 'iconfont icon-icon_shipinjiankong_zengjia',
        uncheckedIcon: "iconfont icon-yuntaikongzhi_tiaoxiao",
        halfCheckedIcon: 'iconfont icon-icon_shipinjiankong_jianxiao',
        idsWithParent: false
      }
    }
  },
  computed: {
    //  ...mapGetters({
    //    getPopupState:"getPopupState"
    // }),
    show_backwardmsg() {
      if (this.levelState == "fastbackward") {
        return { color: "#41a259" }
      } else {
        return { color: "#111a39" }
      };
    },
    show_forwardmsg() {
      if (this.levelState == "fastforward") {
        return { color: "#41a259" }
      } else {
        return { color: "#111a39" }
      };
    },
    show_backward() {
      if (this.levelState == "fastbackward") {
        return { color: "#41a259" }
      } else {
      };
    },
    show_forward() {
      if (this.levelState == "fastforward") {
        return { color: "#41a259" }
      } else {
      };
    },
    show_pause() {
      if (this.levelState == "pause") { //icon-shipin_bofang
        return { color: "#41a259" }
      };
    },
    show_pauseClass() {
      if (this.levelState == "pause") { //
        return "icon iconfont icon-icon_shipinjiankong_bofang icon-control pause";
      } else {
        return "icon iconfont icon-icon_shipinjiankong_zanting icon-control pause";
      };
    },
    msges: function () {
      if (this.showMonitor) {
        return '实时监控'
      } else {
        return '历史录像'
      }
    },
    msges2: function () {
      if (this.showMonitor) {
        return '历史录像'
      } else {
        return '实时监控'
      }
    },
    showtimeq: function () {
      if (!this.showMonitor && this.chajian) {
        return true
      } else {
        return false
      }
    },
    activeBox_changed() { //改变右边下拉样式位置
      /*if (this.pageWidth > 0) {
          let tmpLeft = ((this.pageWidth - 780) * 884 / 1140) + 440;
          console.log("activeBox_changed" + this.pageWidth);
          console.log(tmpLeft);
          return {
              left: tmpLeft + "px"
          }
      }*/
    }
  },
  watch: {

  },
  // destroyed:{
  //   document.removeEventListener()
  // },
  components: {
    'v-alert': VAlert,
    'drop-down': dropDown,
    "custom-progress": customProgress,
    //'kkkp':roleTree,
    "custom-calendar": customCalendar
  },
  beforeDestroy() {
    var that = this;
    window.onresize = '';
    // for(var lo=0;lo<this.monitorList.length;lo++){
    //   //console.log(that.monitorList[lo].ip);
    //    that.monitorLogout(that.monitorList[lo].ip)
    // }
    this.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]];
    EventBus.$off('loginOutclicked');
    for (var i = 0; i < 16; i++) {
      if (that.showMonitor) {
        that.StopRealPlay(i)
      } else {
        that.StopPlayback(i)
      }
    }
  },

  destroyed() {

    var that = this;
    // for(var lo=0;lo<this.monitorList.length;lo++){
    //   //console.log(that.monitorList[lo].ip);
    //    that.monitorLogout(that.monitorList[lo].ip)
    // }
    this.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]];
    EventBus.$off('loginOutclicked');
    eventBus.$off('weatherShow');
    eventBus.$off('thismonitor');
    for (var i = 0; i < 16; i++) {
      if (that.showMonitor) {
        that.StopRealPlay(i)
      } else {
        that.StopPlayback(i)
      }
    }
  },
  mounted() {
    var that = this;
    // this.$store.dispatch('getRole', {
    // }).then((data) => {
    //   that.treeData=data;
    // })



    EventBus.$on('loginOutclicked', (ev_show) => {
      //console.log(ev_show)
      //console.log(`Oh, that's nice. loginOutclicked clicks! :)`+ ev_show);
      that.getshowbox = !ev_show;
    });
    EventBus.$on('baseclick', (ev_show) => {
      //console.log(ev_show)
      //console.log(`Oh, that's nice. loginOutclicked clicks! :)`+ ev_show);
      that.getshowbox = !ev_show;
    });

    eventBus.$on('weatherShow', (ev_show) => {
      //console.log(ev_show)
      //console.log(`Oh, that's nice. loginOutclicked clicks! :)`+ ev_show);
      that.getshowbox = !ev_show;
    });
    eventBus.$on('thismonitor', (ev_show) => {
      //console.log(ev_show)
      //console.log(`Oh, that's nice. loginOutclicked clicks! :)`+ ev_show);
      that.getshowbox = !ev_show;
    });
    //document.getElementById('msglist').window.document.write(this.drogmsg)
    //初试化插件
    this.videoInit();
    //console.log(document.getElementById('drogBox').style.display)//='none';
    // that.dataAreaTree();
    // that.getMonitorlists();
    window.onresize = function () {
      var w = document.getElementById("divPlugin").offsetWidth;
      //console.log(w);
      document.getElementById('divPlugin').style.height = 0.5964 * w + 'px';
      //document.getElementById('indexcontroller').style.height=0.673*w+'px';
    }
    // document.getElementById('divPlugin').addEventListener('mouseup',function(){
    //   alert('haha1')
    // })

    var heightnow = document.getElementById("divPlugin").offsetWidth;
    //console.log(w);
    document.getElementById('divPlugin').style.height = 0.5964 * heightnow + 'px';
    //console.log(document.getElementById('divPlugin').style.height)
    // 鼠标抬起监听
    document.getElementById('monitor').addEventListener("mouseup", function () {
      that.historyStart = 0;
      //console.log('taiqi')
    })
    document.getElementById('monitor').addEventListener("mousedown", function () {
      that.historyStart = 1;
    })
    // document.getElementById('monitor').addEventListener("mouseup",function(e){
    //   //alert('fangkaile')
    //   //alert(2)
    //  // console.log(that.showdrogBox)
    //  console.log(111)

    //   if(that.showdrogBox==true){
    //     var e = event || window.event;
    //     var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //     var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    //     var jk = {'x':e.clientX-800+scrollLeft,'y':e.clientY-205+scrollTop};
    //     var dw = document.getElementById('divPlugin').offsetWidth-40;
    //     var dh = document.getElementById('divPlugin').offsetHeight-40;
    //     console.log(jk);
    //    // that.jjk = jk;
    //     //alert(dw);
    //     //alert(dh);
    //     //alert(scrollLeft)
    //     if(jk.x<0||jk.y<0||jk.x>dw||jk.y>dh||that.drogmsg==''){
    //       that.showdrogBox=false;
    //       that.showDrog=false;
    //       return  
    //     }else{
    //       var sx = dw/that.iiTypes;
    //       var sy = dh/that.iiTypes;
    //       var m = Math.ceil(jk.x/sx);
    //       var n = Math.ceil(jk.y/sy)-1;
    //       var index = n*that.iiTypes+m-1;
    //       //that.iWndIndex = index;
    //       //alert(index);
    //       //alert(that.iWndIndex);
    //       that.showdrogBox=false;
    //       that.showDrog=false;
    //       //alert(index);
    //       if(that.loginIp[index][0]==1||that.loginIp[index][0]==that.playVideo[0]){

    //         let promise = new Promise(function(resolve, reject) {
    //           //alert(that.loginIp[index][0])
    //           //that.monitorLogout(that.loginIp[index][0]);
    //           resolve();
    //         });

    //         promise.then(function() {
    //           that.monitorLogin(that.playVideo[0],that.playVideo[1],that.playVideo[2]);
    //           //alert(that.playVideo);
    //           for(var m=0;m<16;m++){
    //             if(that.loginIp[m][0]==that.playVideo[0]&&that.showMonitor){
    //               that.StopRealPlay(m);
    //               that.loginIp[m][0]=1;
    //             }else if(that.loginIp[m][0]==that.playVideo[0]&&that.showMonitor==false){
    //               that.StopPlayback(m);
    //               that.loginIp[m][0]=1;
    //             }
    //           }
    //           that.loginIp[index][0]=that.playVideo[0];
    //         });

    //       }else{
    //           that.monitorLogin(that.playVideo[0],that.playVideo[1],that.playVideo[2]);
    //           for(var m=0;m<16;m++){
    //             //alert(that.loginIp[m][0]);
    //             //alert(that.playVideo[0]);
    //             if(that.loginIp[m][0]==that.playVideo[0]&&that.showMonitor){
    //                //alert(m);
    //                that.StopRealPlay(m);
    //                that.StartRealPlay(that.loginIp[index][0],m)
    //                that.loginIp[m][0]=that.loginIp[index][0];
    //             }else if(that.loginIp[m][0]==that.playVideo[0]&&that.showMonitor==false){
    //                //that.StopPlayback(m);
    //                //console.log('交换播放，开始播放被换的')

    //               if(that.realTime){
    //                 var timex = that.realTime;
    //                 var timey = that.backTime?that.backTime:that.getToday();
    //                 var time = timey+' '+timex;
    //               }else{
    //                 var time = that.backTime?that.backTime:that.getToday();
    //               }
    //                that.StartPlayback(that.loginIp[index][0],m,time)
    //                that.loginIp[m][0]=that.loginIp[index][0];
    //             }
    //           }
    //           that.loginIp[index][0]=that.playVideo[0];





    //       }
    //       var ttt = setTimeout(function(){
    //       if(that.showMonitor){

    //         //var ttt = setTimeout(function(){
    //           //alert(that.playVideo[0])
    //           that.StartRealPlay(that.playVideo[0],index);
    //         //},1000);

    //       }else{
    //         //console.log('交换播放，开始播放拖拽的')
    //         //var ttt = setTimeout(function(){
    //           if(that.realTime){
    //             var timex = that.realTime;
    //             var timey = that.backTime?that.backTime:that.getToday();
    //             var time = timey+' '+timex;
    //           }else{
    //             var time = that.backTime?that.backTime:that.getToday();
    //           }
    //           that.StartPlayback(that.playVideo[0],index,time);
    //           that.loginIp[index][1]=0;
    //           that.loginIp[index][2]=true;
    //           //that.levelState="";
    //           // that.levelState='';
    //           // that.speed=0;

    //         //},1000);

    //       }
    //     },1000)
    //       that.drogmsg==''
    //     }
    //     that.drogmsg=='';
    //     that.showdrogBox=false;
    //     that.showDrog=false;
    //   }
    //   //that.PTZactive=99
    // });

    // 鼠标移动监听
    // document.getElementById('monitor').addEventListener("mousemove",function(e){



    //     var e = event || window.event;
    //     var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //     var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    //     var jk = {'x':e.clientX-800+scrollLeft,'y':e.clientY-205+scrollTop};
    //     var dw = document.getElementById('divPlugin').offsetWidth-40;
    //     var dh = document.getElementById('divPlugin').offsetHeight-40;
    //     that.jjk = jk;

    // //  console.log(jk);
    // //   var e = event || window.event;
    // //   var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // //   var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    // //   var jk = {'x':e.clientX+scrollLeft,'y':e.clientY+scrollTop};
    // //   that.jjk = jk;
    // //   //console.log(jk);
    // //  document.getElementById('drogBox').style.top=jk.y-80+'px';
    // //  document.getElementById('drogBox').style.left=jk.x-400+'px';
    //   // if(that.showdrogBox){
    //   //   that.showDrog = true;
    //   // }
    //     var e = event || window.event;
    //     var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //     var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    //     var jk = {'x':e.clientX-800+scrollLeft,'y':e.clientY-205+scrollTop};
    //     var dw = document.getElementById('divPlugin').offsetWidth-40;
    //     var dh = document.getElementById('divPlugin').offsetHeight-40;
    //     that.jjk = jk;

    // });









    var timejk = setInterval(function () {
      if (that.showMonitor == false && that.sw == true && that.historyStart == 0) {
        if (that.realTime == '23:59:59' || that.realTime == '24:00:00' || that.realTime == '24:00:01' || that.realTime == '24:00:02' || that.realTime == '24:00:03' || that.realTime == '24:00:04') {
          that.historyStart = 1
          // console.log(0)
          that.sw = false;
          //that.realTime = '00:00:00'; 
          // that.levelState = "pause";
          // clearInterval(that.thistimes);
          that.speed = 0;
          that.levelState = '';
          that.Vstop = false;
          var sum = that.iiTypes * that.iiTypes;
          var n = new Date(that.backTime)
          //console.log(n);
          var k = n.getTime() + 1 * 24 * 60 * 60 * 1000;
          //console.log(k);
          var t = new Date(k);
          //console.log(t);
          var year = t.getFullYear();
          var day = ("0" + t.getDate()).slice(-2);
          var month = ("0" + (t.getMonth() + 1)).slice(-2);
          var today = t.getFullYear() + "-" + month + "-" + day;
          that.$refs.$flatpickr.setDefaultDates(year, month, day);
          // console.log(today);
          for (var l = 0; l < sum; l++) {
            that.StopPlayback(l);
          }
          for (var i = 0; i < sum; i++) {
            if (that.loginIp[i][0] != 1) {
              //that.realTime = '00:00:00'; 
              // that.StopPlayback(i);
              that.StartPlaybacks(that.loginIp[i][0], i, today, that.loginIp[i][1], that.loginIp[i][2])
            }
          }
          that.backTime = today;
          //that.realTime = '00:00:00'; 
          setTimeout(function () { that.sw = true; that.historyStart = 0; that.realTime = '00:00:00' }, 100);
        }
      }
    }, 1000)










    // 下拉监听
    document.getElementById('monitor').addEventListener("click", function (e) {
      //alert(1);
      if (e.target.id == 'monitorReginal1' || e.target.id == 'monitorReginal2') {
        that.showRegion = !that.showRegion;
        that.showPattern = false;
        that.showPreset = false;
        that.nowold = false;
        that.regionList = []
      } else if (e.target.id == 'monitorPattern2' || e.target.id == 'monitorPattern1') {
        that.showPattern = !that.showPattern;
        that.showRegion = false;
        that.showPreset = false;
        that.nowold = false;
        that.regionList = []
      } else if (e.target.id == 'monitorPreset1' || e.target.id == 'monitorPreset2') {
        that.showPreset = !that.showPreset;
        that.showPattern = false;
        that.showRegion = false;
        that.nowold = false;
        that.regionList = []
      } else if (e.target.id == 'monitorActive1' || e.target.id == 'monitorActive2') {
        that.nowold = !that.nowold;
        that.showPattern = false;
        that.showRegion = false;
        that.showPreset = false;
        that.regionList = []
      } else {
        that.showPattern = false;
        that.showRegion = false;
        that.showPreset = false;
        that.nowold = false;
        that.regionList = []
      }
    });





    // 回放
    // var time = setInterval(function(){
    //   for(var l=0;l<that.monitorList.length;l++){
    //     that.StartPlayback(that.monitorList[l][0]);
    //   }
    //   clearInterval(time)
    // },2000)



    //定时器10秒更新一次进度条时间
    //this.thistimes = setInterval(() => {
    //this.updateProgressTime();
    // this.thentime = :"00:00:00",
    // realTime:"00:00:00",
    // if (!this.showMonitor) {
    //     let tmptime = this.realTime;
    //     let stepspeed = 1 * (this.speed > 0? this.speed:(this.speed < 0? -1 / this.speed:1)); 
    //     console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
    //     let numtime = (parseInt(tmptime.substr(0,2)) * 60 + parseInt(tmptime.substr(3,2)) ) * 60 +  parseInt(tmptime.substr(6)) + stepspeed;
    //     this.thentime = this.numberToFormatTime(numtime);
    //      console.log(this.thentime);
    // };
    //},1000);
    // setFontSize(document, window, (fontSize,clientWidth) => {
    //      this.pageWidth = clientWidth;
    // });
  },
  watch: {
    // pageWidth(val) { //侦测浏览器宽度变化，页面元素样式相应改变
    //     console.log("pageWidth=" + val);
    // }
    showInput: {
      handler: function () {
        console.log('改变了绑定值');
        if (this.supersw == false) {
          console.log('点击框改变，不搜索')
          return
        }
        this.searchList()

      }
    }
  },
  // methods: {
  /*updateProgressTime() {
      if (!this.showMonitor) {
          let tmptime = this.realTime;
          let numtime;
          if (this.speed > 0){
              this.stepspeed = this.speed * 1;
              numtime = (parseInt(tmptime.substr(0,2)) * 60 + parseInt(tmptime.substr(3,2)) ) * 60 +  parseInt(tmptime.substr(6)) + this.stepspeed;
          } else if (this.speed < 0) {
              this.stepspeed = this.stepspeed + (-1 / this.speed);//速度小于0的情况，进行累加直到大于等于 1 再改变时间，相当于减慢时间步长
              console.log(this.speed + ",stepspeed=" + this.stepspeed);
              if (this.stepspeed < 1) return;
              console.log(this.speed + ",yer=" + this.stepspeed);
              numtime = (parseInt(tmptime.substr(0,2)) * 60 + parseInt(tmptime.substr(3,2)) ) * 60 +  parseInt(tmptime.substr(6)) + this.stepspeed;
              this.stepspeed = 0;
          } else {
              this.stepspeed = 1;
              numtime = (parseInt(tmptime.substr(0,2)) * 60 + parseInt(tmptime.substr(3,2)) ) * 60 +  parseInt(tmptime.substr(6)) + this.stepspeed;
          }

          //let stepspeed = 1 * (this.speed > 0? this.speed:(this.speed < 0? -1 / this.speed:1)); 
          //console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
          this.thentime = this.numberToFormatTime(numtime);
          console.log(this.thentime);
      };
  },*/
  // this.thistimes = setInterval(() => {
  //     // this.thentime = :"00:00:00",
  //     // realTime:"00:00:00",

  //     if (!this.showMonitor) {
  //         let tmptime = this.realTime;
  //         let stepspeed = 1 * (this.speed > 0? this.speed:(this.speed < 0? -1 / this.speed:1)); 
  //         //console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
  //         if(stepspeed<1){
  //           //alert(stepspeed);
  //           that.sp=1/stepspeed;
  //           that.spnum++
  //         }
  //         if(that.sp==that.num){
  //           that.num=0;
  //           stepspeed=1
  //         }
  //         let numtime = (parseInt(tmptime.substr(0,2)) * 60 + parseInt(tmptime.substr(3,2)) ) * 60 +  parseInt(tmptime.substr(6)) + stepspeed;
  //         this.thentime = this.numberToFormatTime(numtime);
  //          //console.log(this.thentime);
  //     };
  //   },1000);
  // },
  methods: {

    //  showtree(){
    //   console.log(this.checkedIds)
    //console.log(this.$refs.kkp.item)
    // },


    // lll(){
    //   axios.post('http://ip.taobao.com/service/getIpInfo2.php', {
    //     ip:'10.17.8.161'
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // },


    closeBox2() {
      this.showPrompt = false;
      this.getshowbox = true;
    },



    //搜索下拉框点击事件
    findReginList(a, b) {
      var that = this;
      this.supersw = false;

      this.showInput = b;
      this.regionList = [];
      this.getMonitorlist(a);
      setTimeout(function () {
        that.supersw = true;
      }, 1000)
    },

    searchListl() {
      console.log(1)
      var that = this;
      //this.supersw = false;
      this.inputsw = 1;
      this.showInput = '';
      setTimeout(function () {
        that.searchList();
      }, 100)
    },


    //获取区域列表
    searchList() {
      // setTimeout(function(){},100)
      //console.log(this.supersw)
      //  if(this.supersw==false){
      //    //this.supersw=true
      //    return
      //  }
      //this.supersw=true
      var that = this;
      //var is = document.getElementById('relistinput').value;
      //console.log('is--->'+is);
      console.log('this.showInput--->' + this.showInput);
      if (this.showInput != '' && this.inputsw == 1) {
        console.log('666')
        //this.regionList=[{AreaCode:1,AreaName:'这个区'},{AreaCode:1,AreaName:'那个区'},{AreaCode:1,AreaName:'区区区'},{AreaCode:1,AreaName:'这里区'},{AreaCode:1,AreaName:'哪里区'}];
        this.$store.dispatch('getRegionList', {
          // 'USER-ID':15,
          'idName': that.showInput,//that.showInput,
          'areaType': '',
          'pageNo': 0,
          'pageSize': 0
        }).then((data) => {
          console.log(data);
          if (typeof (data) == 'string') {
            that.regionList = []
          } else {
            that.regionList = data.data;
          }
          // that.regionList=data;
          //var list = data[0].childrens;
          // for(var k=0;k<data.length;k++){
          //   var list = data[k].childrens;
          //   for(let i=0;i<list.length;i++){
          //     for(let j=0;j<list[i].childrens.length;j++){
          //     // console.log(list[i].childrens[j].areaName,j)
          //       if(list[i].childrens[j].areaLevel==9){
          //         that.regionList.push(list[i].childrens[j])
          //       }
          //     }
          //   }
          // }
          //console.log(list);
          //console.log(that.regionList)
          //that.regionList = data;
        }, (error) => {
          console.log(that.showInput);
          that.regionList = [];
        })

      } else if (this.showInput == '' && this.inputsw == 1) {
        console.log('777');
        //this.supersw=false;
        this.$store.dispatch('getRegionList', {
          // 'USER-ID':15,
          'idName': that.showInput,
          //'areaType':1
          'areaType': '',
          'pageNo': 0,
          'pageSize': 0
        }).then((data) => {
          console.log(data);

          if (typeof (data) == 'string') {
            that.regionList = []
          } else {
            that.regionList = data.data;
          }
          //           for(var k=0;k<data.length;k++){
          //             var list = data[k].childrens;
          //             for(let i=0;i<list.length;i++){
          //               for(let j=0;j<list[i].childrens.length;j++){
          //               // console.log(list[i].childrens[j].areaName,j)
          //                 if(list[i].childrens[j].areaLevel==9){
          //                   that.regionList.push(list[i].childrens[j])
          // //console.log(list[i].childrens[j].areaCode);
          //                 }
          //               }
          //             }
          //           }
          //console.log(that.regionList)
          //that.regionList = data;
        }, (error) => {
          console.log(2);
          that.regionList = [];
        })
        //this.regionList=[]
      }
      setTimeout(function () {
        that.supersw = true
      }, 100)

    },
    //搜索监控列表
    searchMonitorlist() {
      console.log('搜索了')
    },


    //拖拽事件处理
    chufashijian(e) {
      //var e = event || window.event;
      var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
      var jk = { 'x': e.clientX - 670 + scrollLeft, 'y': e.clientY - 205 + scrollTop };
      var dw = document.getElementById('divPlugin').offsetWidth - 40;
      var dh = document.getElementById('divPlugin').offsetHeight - 40;
      // console.log(jk);
      //console.log(e);
      var that = this;
      if (jk.x < 0 || jk.y < 0 || jk.x > dw || jk.y > dh || that.drogmsg == '') {
        that.showdrogBox = false;
        that.showDrog = false;
        return
      } else {
        var sx = dw / that.iiTypes;
        var sy = dh / that.iiTypes;
        var m = Math.ceil(jk.x / sx);
        var n = Math.ceil(jk.y / sy) - 1;
        var index = n * that.iiTypes + m - 1;
        // console.log(index);
        //that.iWndIndex = index;
        //alert(index);
        //alert(that.iWndIndex);
        that.showdrogBox = false;
        that.showDrog = false;
        //alert(index);
        if (that.loginIp[index][0] == 1 || that.loginIp[index][0] == that.playVideo[0] && that.loginIp[index][1] == that.playVideo[4] && that.loginIp[index][2] == that.playVideo[5]) {

          let promise = new Promise(function (resolve, reject) {
            //alert(that.loginIp[index][0])
            //that.monitorLogout(that.loginIp[index][0]);
            resolve();
          });

          promise.then(function () {

            that.monitorLogin(that.playVideo[0], that.playVideo[1], that.playVideo[2], that.playVideo[3]);
            //alert(that.playVideo);
            for (var m = 0; m < 16; m++) {
              if (that.loginIp[m][0] == that.playVideo[0] && that.loginIp[m][1] == that.playVideo[4] && that.loginIp[m][2] == that.playVideo[5] && that.showMonitor) {
                that.StopRealPlay(m);
                that.loginIp[m][0] = 1;
              } else if (that.loginIp[m][0] == that.playVideo[0] && that.loginIp[m][1] == that.playVideo[4] && that.loginIp[m][2] == that.playVideo[5] && that.showMonitor == false) {
                that.StopPlayback(m);
                that.loginIp[m][0] = 1;
              }
            }
            that.loginIp[index][0] = that.playVideo[0];
            that.loginIp[index][1] = that.playVideo[4];
            that.loginIp[index][2] = that.playVideo[5];
          });

        } else {

          that.monitorLogin(that.playVideo[0], that.playVideo[1], that.playVideo[2], that.playVideo[3]);
          for (var m = 0; m < 16; m++) {
            //alert(that.loginIp[m][0]);
            //alert(that.playVideo[0]);
            if (that.loginIp[m][0] == that.playVideo[0] && that.loginIp[m][1] == that.playVideo[4] && that.loginIp[m][2] == that.playVideo[5] && that.showMonitor) {
              //alert(m);
              that.StopRealPlay(m);
              console.log(m)
              that.StartRealPlay(that.loginIp[index][0], m, that.loginIp[index][1], that.loginIp[index][2])
              that.loginIp[m][0] = that.loginIp[index][0];
              that.loginIp[m][1] = that.loginIp[index][1];
              that.loginIp[m][2] = that.loginIp[index][2];
            } else if (that.loginIp[m][0] == that.playVideo[0] && that.loginIp[m][1] == that.playVideo[4] && that.loginIp[m][2] == that.playVideo[5] && that.showMonitor == false) {
              //that.StopPlayback(m);
              //console.log('交换播放，开始播放被换的')                 
              if (that.realTime) {
                var timex = that.realTime;
                var timey = that.backTime ? that.backTime : that.getToday();
                var time = timey + ' ' + timex;
              } else {
                var time = that.backTime ? that.backTime : that.getToday();
              }
              that.StartPlayback(that.loginIp[index][0], m, time, that.loginIp[index][1], that.loginIp[index][2])
              that.loginIp[m][0] = that.loginIp[index][0];
              that.loginIp[m][1] = that.loginIp[index][1];
              that.loginIp[m][2] = that.loginIp[index][2];
            }
          }
          that.loginIp[index][0] = that.playVideo[0];
          that.loginIp[index][1] = that.playVideo[4];
          that.loginIp[index][2] = that.playVideo[5];




        }
        var ttt = setTimeout(function () {
          if (that.showMonitor) {

            //var ttt = setTimeout(function(){
            //alert(that.playVideo[0])
            console.log('data--->' + that.playVideo)
            that.StartRealPlay(that.playVideo[0], index, that.playVideo[4], that.playVideo[5]);
            //},1000);

          } else {
            //console.log('交换播放，开始播放拖拽的')
            //var ttt = setTimeout(function(){
            if (that.realTime) {
              var timex = that.realTime;
              var timey = that.backTime ? that.backTime : that.getToday();
              var time = timey + ' ' + timex;
            } else {
              var time = that.backTime ? that.backTime : that.getToday();
            }
            that.StartPlayback(that.playVideo[0], index, time, that.playVideo[4], that.playVideo[5]);
            //that.loginIp[index][1]=0;
            //that.loginIp[index][2]=true;
            //that.levelState="";
            // that.levelState='';
            // that.speed=0;
            //},1000);
          }
        }, 1000)
        that.drogmsg == ''
      }
      that.drogmsg == '';
      that.showdrogBox = false;
      that.showDrog = false;
    },


    numberToFormatTime(inNumber) {
      let tmpNum = parseInt(inNumber);
      let s = tmpNum % 60;
      tmpNum = (tmpNum - s) / 60;
      let m = tmpNum % 60;
      let h = (tmpNum - m) / 60;

      h = (h < 10 ? "0" : "") + h;
      m = (m < 10 ? "0" : "") + m;
      s = (s < 10 ? "0" : "") + s;
      //console.log("Time:" + h + ":" + m + ":" + s);//按长度比值获取时间值
      return (h + ":" + m + ":" + s);
    },


    // 区域选择事件
    // homeArea(d) {
    //     this.homearea = d;
    //     //console.log(d);
    //     this.getMonitorlist();
    // },


    // 获取区域监控列表
    getMonitorlist(code) {
      var that = this;
      this.showlist = 999;
      // for(var lo=0;lo<this.monitorList.length;lo++){
      //   //console.log(that.monitorList[lo].ip);
      //    that.monitorLogout(that.monitorList[lo].ip)
      // }
      // if(code==1){
      //   code=null
      // }
      //that.monitorLogin('59.61.78.162','wnvxiaoti5566123','admin','8902');
      //that.monitorLogin('59.61.78.162','wnv5566123','admin','8901');
      // //that.monitorLogin('59.61.78.162','wnvxiaoti5566123','admin','8902',1,1);
      // setTimeout(function(){
      //   console.log(8888)
      //   that.StartRealPlay('59.61.78.162',0,8901,4);
      //   that.StartRealPlay('59.61.78.162',1,8901,3);
      // },2000)
      console.log(code);
      this.$store.dispatch('getMonitorList', {
        areaCode: code,
        'deviceType': '0003',
        'pageSize': 99999
      }).then((data) => {
        //console.log(data);
        //console.log(data.data[0].ip);
        // console.log("getMonitorDate success!")            
        // console.log(data.data)
        let k = [];
        if(data.data){
          k=data.data
        }
        that.monitorList = k;
        //that.monitorList = data.data;
        //登录
        console.log('list===>' + data.data);
        console.log(data.data);
        //return
        var ki = that.iiTypes * that.iiTypes;
        if (that.monitorList.length < ki) {
          ki = that.monitorList.length;
        }
        if (that.realTime) {
          var timex = that.realTime;
          var timey = that.backTime ? that.backTime : that.getToday();
          var times = timey + ' ' + timex;
        } else {
          var times = that.backTime ? that.backTime : that.getToday();
        }
        // if(that.monitorList.length<1){

        // }
        that.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]];
        console.log(ki)
        for (var i = 0; i < ki; i++) {
          //alert(that.monitorList[i].ip)
          console.log(that.monitorList[i].ip, that.monitorList[i].passWord, that.monitorList[i].userName, that.monitorList[i].portLogin);
          // that.monitorLogin('59.61.78.162','wnv5566123','admin','8901');
          that.monitorLogin(that.monitorList[i].ip, that.monitorList[i].passWord, that.monitorList[i].userName, that.monitorList[i].portLogin);
          // that.monitorLogin(that.monitorList[i].ip,that.monitorList[i].passWord,that.monitorList[i].userName);
          that.loginIp[i][0] = that.monitorList[i].ip;//ip
          that.loginIp[i][1] = that.monitorList[i].portLogin;//播放端口
          that.loginIp[i][2] = that.monitorList[i].nvrChannel;//通道
          //alert(that.loginIp[i][0]);
        }
        // for(var i=0;i<ki;i++){
        //   that.monitorLogin(that.monitorList[i].ip,that.monitorList[i].passWord,that.monitorList[i].userName);
        // }

        setTimeout(function () {
          // for(var j=0;j<16;j++){
          //   that.StopRealPlay(j+1)
          // }
          if (that.showMonitor) {
            for (var j = 0; j < 16; j++) {
              that.StopRealPlay(j)
            }
            for (var l = 0; l < ki; l++) {
              that.StartRealPlay(that.monitorList[l].ip, l, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
            }
          } else {
            //alert(ki)
            for (var j = 0; j < 16; j++) {
              that.StopPlayback(j)
            }
            for (var l = 0; l < ki; l++) {

              that.StartPlayback(that.monitorList[l].ip, l, times, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
            }
            that.levelState = '';
            that.speed = 0;
          }
          clearInterval(that.thistimes);
          that.thistimes = setInterval(() => {
            // this.thentime = :"00:00:00",
            // realTime:"00:00:00",
            if (!that.showMonitor) {
              let tmptime = that.realTime;
              let stepspeed = 1 * (that.speed > 0 ? that.speed : (that.speed < 0 ? -1 / that.speed : 1));
              if (stepspeed < 1) {
                //alert(stepspeed);
                that.sp = 1 / stepspeed;
                that.spnum++
              }
              if (that.sp <= that.spnum) {
                that.spnum = 0;
                stepspeed = 1
                //alert('+1')
              }
              // console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
              let numtime = (parseInt(tmptime.substr(0, 2)) * 60 + parseInt(tmptime.substr(3, 2))) * 60 + parseInt(tmptime.substr(6)) + stepspeed;
              that.thentime = that.numberToFormatTime(numtime);
              // console.log(this.thentime);
            };
          }, 1000);
          //clearInterval(timeq)
        }, 2000)
      }, (error) => {
        //console.log("getMonitorDate error!")            
        //alert('区域管理获取数据失败')
      });
      // 预览或回放

    },


    // 开始时获取区域监控列表
    getMonitorlists() {
      var that = this;
      if (this.homearea.id == 1) {
        this.homearea.id = null
      }
      this.$store.dispatch('getMonitorDate', {
        areaCode: that.homearea.id,
        'deviceType': 4,
        'pageSize': 99999
      }).then((data) => {
        //console.log("getMonitorlists success!")            
        //console.log(data.data)
        this.monitorList = data.data;
        //登录
        var ki = 4;
        if (that.monitorList.length < 4) {
          ki = that.monitorList.length;
        }
        for (var i = 0; i < ki; i++) {
          //alert(that.monitorList[i].ip)
          that.monitorLogin(that.monitorList[i].ip, that.monitorList[i].passWord, that.monitorList[i].userName, that.monitorList[i].portLogin);
          that.loginIp[i][0] = that.monitorList[i].ip;//ip
          that.loginIp[i][1] = that.monitorList[i].portLogin;//播放端口
          that.loginIp[i][2] = that.monitorList[i].nvrChannel;//通道
        }
        //预览
        var time = setInterval(function () {
          for (var l = 0; l < ki; l++) {
            //console.log(ki)
            that.StartRealPlay(that.monitorList[l].ip, l, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
          }
          clearInterval(time)
        }, 1000)
        //console.log(that.monitorList)
      }, (error) => {
        //console.log("getMonitorlists error!")            
        //alert('区域管理获取数据失败')
      });
    },




    receiveTime(timeval) { //接收进度条即时时间
      //console.log("receive timeval:" + timeval);
      //console.log('进入即时时间事件')
      var that = this;
      if (timeval == '24:00:01' || timeval == '24:00:02' || timeval == '24:00:03' || timeval == '24:00:04' || timeval == '24:00:05' || timeval == '24:00:06' || timeval == '24:00:07' || timeval == '24:00:08' || timeval == '24:00:09' && that.sw == true) {
        that.realTime = '24:00:00'
      } else {
        that.realTime = timeval;
      }
      //console.log(that.historyStart);
      //this.realTime = timeval;
      // if(this.realTime=='23:59:59'||this.realTime=='24:00:00'||this.realTime=='24:00:01'||this.realTime=='24:00:02'||this.realTime=='24:00:03'||this.realTime=='24:00:04'||this.realTime=='24:00:05'||this.realTime=='24:00:06'||this.realTime=='24:00:07'||this.realTime=='24:00:08'||this.realTime=='24:00:09'&&that.sw==true){
      //   if(that.historyStart==1){
      //     console.log(1);
      //     that.realTime = timeval;
      //   }else{
      //     that.historyStart=1
      //     console.log(0)
      //     that.sw = false;
      //     that.realTime = '00:00:00'; 
      //     // that.levelState = "pause";
      //     // clearInterval(that.thistimes);
      //     that.speed=0;
      //     that.levelState='';
      //     var sum = that.iiTypes*that.iiTypes;
      //     var n = new Date(that.backTime)
      //     //console.log(n);
      //     var k = n.getTime() + 1 * 24 * 60 * 60 * 1000;
      //     //console.log(k);
      //     var t = new Date(k);
      //     //console.log(t);
      //     var day = ("0" + t.getDate()).slice(-2);
      //     var month = ("0" + (t.getMonth() + 1)).slice(-2);
      //     var today = t.getFullYear() + "-" + month + "-" + day;
      //     this.$refs.$flatpickr.setDefaultDate(today);
      //     console.log(today);
      //     for(var l=0;l<sum;l++){
      //       that.StopPlayback(l);
      //     }
      //     for(var i =0;i<sum;i++){
      //       if(that.loginIp[i][0]!=1){
      //         //that.realTime = '00:00:00'; 
      //        // that.StopPlayback(i);
      //         that.StartPlaybacks(that.loginIp[i][0],i,today)
      //       }
      //     }
      //     that.backTime = today;
      //     //that.realTime = '00:00:00'; 
      //     setTimeout(function(){that.sw = true;that.historyStart=0;that.realTime = '00:00:00'},100);
      //   }
      // }else{
      //   that.realTime = timeval;
      // }

    },
    enterTime(timeval) { //接收进度条最后时间
      //console.log("enter timeval:" + timeval);
      var that = this;
      this.realTime = timeval;
      //console.log(this.monitorList);
      //console.log(this.loginIp);
      //console.log(999)
      //console.log('一直触发？')
      if (this.realTime == '23:59:59' || this.realTime == '24:00:00' || this.realTime == '24:00:01' || this.realTime == '24:00:02' || this.realTime == '24:00:03' || this.realTime == '24:00:04') {
        //this.realTime = '00:00:00' 
        //that.receiveTime(timeval)
        //return
        // console.log('拖动事件触发了')
      } else {
        let p = new Promise((resolved) => {
          //console.log("Promise");
          var times = that.backTime ? that.backTime : that.getToday();
          var timeVal = times + ' ' + timeval;
          this.speed = 0;
          this.Vstop = false;
          that.levelState = "";
          // alert()

          for (var i = 0; i < 16; i++) {
            if (that.loginIp[i][0] != 1) {
              that.StopPlayback(i);
              that.StartPlayback(that.loginIp[i][0], i, timeVal, that.loginIp[i][1], that.loginIp[i][2])
            }
          }

        }).then((result) => {
          // console.log("Promise success!");
        }).catch(() => {
          //console.log("Promise error!");
        });
      }


    },
    fastBackwardHander(ev) { //点击快退图标
      var that = this;
      if (this.Vstop == false) {
        this.speed -= 2;
      }

      if (that.speed > 0 && that.Vstop == false) {
        if (that.speed > 4) {
          that.speed = 4
        }
        var i = that.speed
        that.levelState = "fastforward";
        that.fastForwardMsg = "快进" + i + "x";
      } else if (that.speed < 0 && that.Vstop == false) {
        if (that.speed < -4) {
          that.speed = -4
        }
        var i = that.speed - that.speed - that.speed;
        that.levelState = "fastbackward";
        that.fastBackwardMsg = "慢放" + i + "x";
      } else if (that.speed == 0 && that.Vstop == false) {
        that.levelState = "";
      } else {
        that.levelState = "pause";
      }

      //this.fastForwardMsg = "";
      // this.fastForwardlevel = 0;
      // this.fastBackwardlevel = (this.fastBackwardlevel >= 3?3:this.fastBackwardlevel + 1); 
      // this.fastBackwardMsg = "慢放"+ (this.fastBackwardlevel + 1) +"x";
      // if (this.fastBackwardlevel == 0) this.levelState = "";
      //console.log(this.levelState);
      setTimeout(function () {
        for (var i = 0; i < 16; i++) {
          that.PlaySlow(i)
        }
      }, 100);//当前视频慢放

    },
    fastForwardHander(ev) { //点击快进图标
      // this.levelState = "fastforward";
      // //this.fastBackwardMsg = "";
      // this.fastBackwardlevel = 0;
      // this.fastForwardlevel = (this.fastForwardlevel >= 3?3:this.fastForwardlevel + 1); 
      // this.fastForwardMsg = "快进"+ (this.fastForwardlevel + 1) + "x";
      // if (this.fastForwardlevel == 0) this.levelState = "";
      //console.log(this.levelState);
      var that = this;
      if (this.Vstop == false) {
        that.speed += 2;
      }
      if (that.speed > 0 && that.Vstop == false) {
        if (that.speed > 4) {
          that.speed = 4
        }
        var i = that.speed
        that.levelState = "fastforward";
        that.fastForwardMsg = "快进" + i + "x";
      } else if (that.speed < 0 && that.Vstop == false) {
        if (that.speed < -4) {
          that.speed = -4
        }
        var i = that.speed - that.speed - that.speed;
        that.levelState = "fastbackward";
        that.fastBackwardMsg = "慢放" + i + "x";
      } else if (that.speed == 0 && that.Vstop == false) {
        that.levelState = "";
      } else {
        that.levelState = "pause";
      }

      setTimeout(function () {
        for (var i = 0; i < 16; i++) {
          that.PlayFast(i)
        }
      }, 100);//当前视频快放
      //setTimeout(this.PlayFast(this.iWndIndex),100);//当前视频快放
    },
    pauseHander(ev) {  //点击暂停图标
      var that = this;
      this.levelState = this.Vstop ? "" : "pause";
      this.Vstop = !this.Vstop;
      //this.fastForwardMsg = "";
      //this.fastBackwardMsg = "";
      //console.log(this.levelState);
      setTimeout(() => {
        if (this.levelState == "pause") {
          clearInterval(this.thistimes);
          for (var i = 0; i < 16; i++) {
            that.clickPause(i);
          }
        } else {
          if (that.speed > 0 && that.Vstop == false) {
            if (that.speed > 4) {
              that.speed = 4
            }
            var i = that.speed
            that.levelState = "fastforward";
            that.fastForwardMsg = "快进" + i + "x";
          } else if (that.speed < 0 && that.Vstop == false) {
            if (that.speed < -4) {
              that.speed = -4
            }
            var i = that.speed - that.speed - that.speed;
            that.levelState = "fastbackward";
            that.fastBackwardMsg = "慢放" + i + "x";
          } else if (that.speed == 0 && that.Vstop == false) {
            that.levelState = "";
          } else {
            that.levelState = "pause";
          }
          this.thistimes = setInterval(() => {
            //this.updateProgressTime();
            // this.thentime = :"00:00:00",
            // realTime:"00:00:00",
            if (!this.showMonitor) {
              let tmptime = this.realTime;
              let stepspeed = 1 * (this.speed > 0 ? this.speed : (this.speed < 0 ? -1 / this.speed : 1));
              if (stepspeed < 1) {
                //alert(stepspeed);
                that.sp = 1 / stepspeed;
                that.spnum++
              }
              if (that.sp <= that.spnum) {
                that.spnum = 0;
                stepspeed = 1
                //alert('+1')
              }
              // console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
              let numtime = (parseInt(tmptime.substr(0, 2)) * 60 + parseInt(tmptime.substr(3, 2))) * 60 + parseInt(tmptime.substr(6)) + stepspeed;
              this.thentime = this.numberToFormatTime(numtime);
              //console.log(this.thentime);
            };
          }, 1000);
          setTimeout(function () {
            for (var i = 0; i < 16; i++) {
              that.clickResume(i);
            }
          }, 100);


        }
      }, 100);
    },


    gaibian(a) {
      console.log(a)
      if (a == 2) {
        //this.supersw = false
        this.kkkl = true
      } else {
        //this.supersw = true
        this.kkkl = false
      }
    },
    //初始化插件
    videoInit() {
      var that = this;
      var iRet = WebVideoCtrl.I_CheckPluginInstall();

      if (-2 == iRet) {
        // setTimeout(function(){
        //   alert("您当前使用的浏览器不支持NPAPI插件,使用不兼容的浏览器可能导致浏览异常，请您使用IE10以及以上版本的IE浏览器！");
        // },1000)
        that.showpromptmsg = true;
        that.chajian = false;
        return;
      } else if (-1 == iRet) {
        function myBrowser() {
          var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
          var isOpera = userAgent.indexOf("Opera") > -1;
          if (isOpera) {
            return "Opera"
          }; //判断是否Opera浏览器
          if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
          } //判断是否Firefox浏览器
          if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
          }
          if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
          } //判断是否Safari浏览器
          if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
          }; //判断是否IE浏览器
        }
        var k = myBrowser();
        if (k == 'FF') {
          //console.log('这是火狐')
          that.showpromptmsg = true;
          that.chajian = false;
        } else {
          that.showEdit = true;
          that.chajian = false;
        }

        return;
      }
      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin("100%", "100%", {//1040, 700
        bWndFull: false,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
        iWndowType: 2,
        cbSelWnd: function (xmlDoc) {
          that.iWndIndex = parseInt(that.xmlToString(xmlDoc).substr(that.xmlToString(xmlDoc).indexOf('SelectWnd') + 10));
          // if(that.loginIp[that.iWndIndex][1]>0&&that.loginIp[that.iWndIndex][2]==true){
          //   if(that.loginIp[that.iWndIndex][1]>4){
          //     that.loginIp[that.iWndIndex][1]=4
          //   }
          //   var i = that.loginIp[that.iWndIndex][1]
          //   that.levelState = "fastforward";
          //   that.fastForwardMsg = "快进"+ i + "x";
          // }else if(that.loginIp[that.iWndIndex][1]<0&&that.loginIp[that.iWndIndex][2]==true){
          //   if(that.loginIp[that.iWndIndex][1]<-4){
          //     that.loginIp[that.iWndIndex][1]=-4
          //   }
          //   var i = that.loginIp[that.iWndIndex][1]-that.loginIp[that.iWndIndex][1]-that.loginIp[that.iWndIndex][1];
          //   that.levelState = "fastbackward";
          //   that.fastBackwardMsg = "慢放"+ i +"x";
          // }else if(that.loginIp[that.iWndIndex][2]==true){
          //   that.levelState = "";
          // }else{
          //   that.levelState = "pause";
          // }
        },
        cbEvent: (evType, winIndex, docAny) => {
          console.log('evTyoe' + evType);
          console.log('winIndex' + winIndex);
          console.log("docAny" + docAny);
        },
      });
      WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
    },


    // 窗口分割数
    changeWndNum(iType) {
      iType = parseInt(iType, 10);
      this.iiTypes = iType;
      WebVideoCtrl.I_ChangeWndNum(iType);
    },


    // 登录
    monitorLogin(ip, pwd, admin, port) {
      //alert(pwd,admin);
      // var K = k;
      var that = this;
      var szIP = ip;
      var szPort = port;
      var szUsername = admin;
      var szPassword = pwd;
      console.log('ip==>' + ip);
      console.log('iport==>' + port);
      console.log('admin==>' + admin);
      console.log('pwd==>' + pwd);
      //var index = idx;
      // var szIP = '59.61.78.162';
      // var szPort = '8901';
      // var szUsername = 'admin';
      // var szPassword = 'wnv5566123';
      if ("" == szIP || "" == szPort) {
        return;
      }
      var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
        async: false,
        success: function (xmlDoc) {
          console.log(port + '--登陆成功');
          //that.StartRealPlay(szIP,idx,szPort,2)
        },
        error: function () {
          alert('摄像头登录失败，请检查摄像头网络配置和本地网络')
          //that.showPrompt = true;
          //that.getshowbox = false;
          console.log(szIP + '登录失败')
        }
      })
      if (iRet == -1) {
        console.log('已登录过')
      }
    },


    // 退出
    monitorLogout(ip) {
      var szIP = ip;
      if (szIP == "") {
        //alert('ip为空')
        return;
      }
      var iRet = WebVideoCtrl.I_Logout(szIP);
      if (0 == iRet) {
        //alert('退出了')
        console.log('推出')
      } else {
        alert("退出失败！");
      }
    },


    // 开始预览
    StartRealPlay(ip, windowsIndex, iport, ichannelid) {
      console.log('开始预览')
      var nk = 1;
      if (this.iiTypes > 2) {
        nk = 2
      }
      var that = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      var szIP = ip;
      var iStreamType = nk;//码流类型
      var iChannelID = ichannelid;//播放通道号
      var bZeroChannel = false;
      var that = this;
      // console.log('ip==>'+ip);
      // console.log('iport==>'+iport);
      // console.log('ichannelid==>'+ichannelid);
      // console.log('index==>'+windowsIndex);
      if ("" == szIP) {
        return;
      }
      if (oWndInfo != null) {
        WebVideoCtrl.I_Stop(windowsIndex);
      }
      var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
        iWndIndex: windowsIndex,
        iStreamType: iStreamType,
        iChannelID: iChannelID,
        bZeroChannel: bZeroChannel,
        // iPort : iport
      });

      if (iRet == -1) {
        //that.loginIp[windowsIndex][0]=1;
        //that.showPrompt = true;
        //that.getshowbox = false;
        alert('预览失败，请检查摄像头网络配置和本地网络')
        console.log(szIP + '--' + iport + '--预览失败')
      }
      if (iRet == 0) {
        console.log(szIP + '--' + ichannelid + '--预览成功');
        //that.monitorLogout(szIP)
      }



      // console.log('开始预览')
      // //var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      // var szIP = '59.61.78.162';
      // var iStreamType = 2;//码流类型
      // var iChannelID = 1;//播放通道号
      // var bZeroChannel = false;
      // var iport = '5555'
      // var that = this;
      // if ("" == szIP) {
      //   return;
      // }
      // // if (oWndInfo != null) {
      // //   WebVideoCtrl.I_Stop(windowsIndex);
      // // }
      // var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
      //   iWndIndex : 0,
      //   iStreamType: iStreamType,
      //   iChannelID: iChannelID,
      //   bZeroChannel: bZeroChannel,
      //   iPort : iport
      // });

      // if (iRet == -1) {
      //   //that.loginIp[windowsIndex][0]=1;
      //   //alert('预览失败')
      //   console.log(szIP+'--'+iport+'--预览失败')
      // }
    },


    // 停止预览
    StopRealPlay(windowsIndex) {
      //console.log(11)
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop(windowsIndex);
        if (0 == iRet) {
          //alert('ting')
        } else {
          alert("停止预览失败！");
        }
      }
    },


    // xml转字符串
    xmlToString(xmlData) {
      var xmlString;
      //IE
      if (window.ActiveXObject) {
        xmlString = xmlData.xml;
      }
      // code for Mozilla, Firefox, Opera, etc.
      else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
      }
      return xmlString;
    },


    // 云台控制,PTZ开始
    mouseDownPTZControl(iPTZIndex, windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      var that = this;
      var iPTZSpeed = 2;
      var stop = false;
      if (oWndInfo != null) {
        if (9 == iPTZIndex && that.g_bPTZAuto) {
          stop = true;// 自动开启后，速度置为0可以关闭自动
        } else {
          that.g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
        }
        WebVideoCtrl.I_PTZControl(iPTZIndex, stop, {
          iPTZSpeed: iPTZSpeed,
          success: function (xmlDoc) {
            if (9 == iPTZIndex) {
              that.g_bPTZAuto = !that.g_bPTZAuto;
            }
          },
          error: function () {
            //alert(" 开启云台失败！");
            //alert('云台控制失败')
          }
        });
      }
    },


    //云台控制点击
    PTZControl(a) {
      var that = this;
      if (a == 9) {
        this.mouseDownPTZControl(a);
        if (that.zidong) {
          that.zidong = !that.zidong;
          that.PTZactive = 99;
        } else {
          that.zidong = !that.zidong;
          that.PTZactive = 9;
        }
      } else {
        this.mouseDownPTZControl(a);
        this.PTZactive = a;
      }
    },


    // 云台控制,PTZ停止
    mouseUpPTZControl() {
      this.PTZactive = 99;
      WebVideoCtrl.I_PTZControl(1, true, {
        success: function (xmlDoc) {

        },
        error: function () {
          // alert(" 停止云台失败！");
        }
      });
    },


    // 设置预置点
    SetPreset() {
      var iPresetID = this.presetmsg;
      WebVideoCtrl.I_SetPreset(iPresetID, {
        success: function (xmlDoc) {
          alert(" 设置预置点成功！");
        },
        error: function () {
          alert(" 设置预置点失败！");
        }
      });
    },


    // 调用预置点
    GoPreset() {
      var iPresetID = this.presetmsg;
      WebVideoCtrl.I_GoPreset(iPresetID, {
        success: function (xmlDoc) {
          alert(" 调用预置点成功！");
        },
        error: function () {
          alert(" 调用预置点失败！");
        }
      });
    },


    // 调焦+
    PTZZoomIn(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(10, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          //alert("  调焦+失败！");
        }
      });
    },


    // 调焦-
    PTZZoomout(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(11, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          //alert("  调焦-失败！");
        }
      });
    },


    // 调焦停止
    PTZZoomStop() {
      this.PTZactive = 99;
      WebVideoCtrl.I_PTZControl(11, true, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  调焦停止失败！");
        }
      });
    },


    // 聚焦+
    PTZFocusIn(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(12, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  聚焦+失败！");
        }
      });
    },


    // 聚焦-
    PTZFoucusOut(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(13, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  聚焦-失败！");
        }
      });
    },


    // 聚焦停止
    PTZFoucusStop() {
      this.PTZactive = 99;
      WebVideoCtrl.I_PTZControl(12, true, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  聚焦停止失败！");
        }
      });
    },


    // 光圈+
    PTZIrisIn(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(14, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          //alert("  光圈+失败！");
        }
      });
    },


    // 光圈-
    PTZIrisOut(a) {
      this.PTZactive = a;
      WebVideoCtrl.I_PTZControl(15, false, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  光圈-失败！");
        }
      });
    },


    // 光圈停止
    PTZIrisStop() {
      this.PTZactive = 99;
      WebVideoCtrl.I_PTZControl(14, true, {
        success: function (xmlDoc) {
        },
        error: function () {
          // alert("  光圈停止失败！");
        }
      });
    },


    // 开始回放
    StartPlayback(ip, windowsIndex, time, port, ichannelid) {
      var that = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      var szIP = ip;
      var bZeroChannel = false;
      var iChannelID = ichannelid;
      var times = this.backTime ? this.backTime : this.getToday();
      var szStartTime = (time.indexOf(":") > -1 ? time : time + ' 00:00:00');
      var szEndTime = (times + ' 23:59:59');
      var iRet = -1;
      //alert(szStartTime);
      //alert(szEndTime);
      if ("" == szIP) {
        return;
      }
      if (bZeroChannel) {// 零通道不支持回放
        return;
      }
      if (oWndInfo != null) {// 已经在播放了，先停止
        WebVideoCtrl.I_Stop(windowsIndex);
      }

      iRet = WebVideoCtrl.I_StartPlayback(szIP, {
        iWndIndex: windowsIndex,
        iChannelID: iChannelID,
        szStartTime: szStartTime,
        szEndTime: szEndTime,
        iPort: port
      })

      if (iRet == -1) {
        alert('回放失败，请确认当前时间段录像是否存在')
        /*alert('回放失败，请确认当前时间段录像是否存在')
        let tmpStart = szStartTime.substr(0,szStartTime.indexOf(" ")) + "00:00:00";
        let tmpEnd = szEndTime.substr(0,szEndTime.indexOf(" ")) + "23:59:59";
         console.log(tmpStart + "," + tmpEnd);
        
        I_RecordSearch(szIP,iChannelID,tmpStart,tmpEnd,{
            async:true,
            success:(xmlDoc) => {
               console.log(xmlDoc);
               console.log(this.xmlToString(xmlDoc));
            },
            error:(stste,xmlDoc) => {
               console.log(xmlDoc);
            }
        });*/
        //that.loginIp[windowsIndex][0]=1;
        //alert('回放失败，请确认当前时间段录像是否存在,或者线路已被占满')
        console.log('失败');
      }
      if (iRet == 0) {
        if (that.speed > 0) {
          let num = that.speed / 2;
          let pro = new Promise(function (resolve, reject) {
            for (let i = 0; i < num; i++) {
              that.PlayFast(windowsIndex)
            }
            resolve();
          });
          pro.then(function () {
            if (that.Vstop) {
              setTimeout(function () {
                that.clickPause(windowsIndex)
              }, 1000)
            }
          })
        } else if (that.speed < 0) {
          let num = that.speed / -2;
          let pro = new Promise(function (resolve, reject) {
            for (let i = 0; i < num; i++) {
              that.PlaySlow(windowsIndex)
            }
            resolve();
          });
          pro.then(function () {
            if (that.Vstop) {
              setTimeout(function () {
                that.clickPause(windowsIndex)
              }, 1000)
            }
          })
        } else if (that.speed == 0 && that.Vstop) {
          setTimeout(function () {
            that.clickPause(windowsIndex)
          }, 1000)
        }
      }
    },


    // 停止回放
    StopPlayback(windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Stop(windowsIndex);
      }
    },


    // 暂停
    clickPause(windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Pause(windowsIndex);
      }
    },


    // 慢放
    PlaySlow(windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_PlaySlow(windowsIndex);
      }
    },


    // 快放
    PlayFast(windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_PlayFast(windowsIndex);
      }
    },


    // 恢复
    clickResume(windowsIndex) {
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      if (oWndInfo != null) {
        var iRet = WebVideoCtrl.I_Resume(windowsIndex);
      }
    },


    // 监控列表点击
    activeList(a) {
      this.showlist = a;
    },










    // 时间到开始回放
    StartPlaybacks(ip, windowsIndex, time, port, ichannelid) {
      var that = this;
      var oWndInfo = WebVideoCtrl.I_GetWindowStatus(windowsIndex);
      var szIP = ip;
      var bZeroChannel = false;
      var iChannelID = ichannelid || 1;
      //var times = this.backTime?this.backTime:this.getToday();
      var szStartTime = (time.indexOf(":") > -1 ? time : time + ' 00:00:00');
      var szEndTime = (time + ' 23:59:59');
      var iRet = -1;
      //alert(szStartTime);
      //alert(szEndTime);
      if ("" == szIP) {
        return;
      }
      if (bZeroChannel) {// 零通道不支持回放
        return;
      }
      if (oWndInfo != null) {// 已经在播放了，先停止
        WebVideoCtrl.I_Stop(windowsIndex);
      }

      iRet = WebVideoCtrl.I_StartPlayback(szIP, {
        iWndIndex: windowsIndex,
        iChannelID: iChannelID,
        szStartTime: szStartTime,
        szEndTime: szEndTime,
        iPort: port
      })

      if (iRet == -1) {
        /*alert('回放失败，请确认当前时间段录像是否存在')
        let tmpStart = szStartTime.substr(0,szStartTime.indexOf(" ")) + "00:00:00";
        let tmpEnd = szEndTime.substr(0,szEndTime.indexOf(" ")) + "23:59:59";
         console.log(tmpStart + "," + tmpEnd);
        
        I_RecordSearch(szIP,iChannelID,tmpStart,tmpEnd,{
            async:true,
            success:(xmlDoc) => {
               console.log(xmlDoc);
               console.log(this.xmlToString(xmlDoc));
            },
            error:(stste,xmlDoc) => {
               console.log(xmlDoc);
            }
        });*/
        //that.loginIp[windowsIndex][0]=1;
        //alert('回放失败，请确认当前时间段录像是否存在,或者线路已被占满')
        console.log('失败');
      }
      if (iRet == 0) {
        if (that.speed > 0) {
          let num = that.speed / 2;
          let pro = new Promise(function (resolve, reject) {
            for (let i = 0; i < num; i++) {
              that.PlayFast(windowsIndex)
            }
            resolve();
          });
          pro.then(function () {
            if (that.Vstop) {
              setTimeout(function () {
                that.clickPause(windowsIndex)
              }, 1000)
            }
          })
        } else if (that.speed < 0) {
          let num = that.speed / -2;
          let pro = new Promise(function (resolve, reject) {
            for (let i = 0; i < num; i++) {
              that.PlaySlow(windowsIndex)
            }
            resolve();
          });
          pro.then(function () {
            if (that.Vstop) {
              setTimeout(function () {
                that.clickPause(windowsIndex)
              }, 1000)
            }
          })
        } else if (that.speed == 0 && that.Vstop) {
          setTimeout(function () {
            that.clickPause(windowsIndex)
          }, 1000)
        }
      }
    },












    // 日期选择
    startHistory(a) {
      console.log(a)
      // console.log("@@@@"+a);



      var that = this;
      this.backTime = a;
      var k1 = this.iiTypes * this.iiTypes;
      var k2 = this.loginIp.length;
      var k = k1 < k2 ? k1 : k2;
      // this.thentime="00:00:00";
      // this.realTime="00:00:00";
      // if(that.realTime){
      //   var timex = that.realTime;
      //   var timey = a;
      //   var time = timey+' '+timex;


      // var n = new Date(this.backTime);//.getTime() + 1 * 24 * 60 * 60 * 1000;
      //             //var n = d.getTime() + 1 * 24 * 60 * 60 * 1000;
      //             var k = n.getMonth();
      //             console.log(k)

      this.speed = 0;
      this.levelState = '';
      this.Vstop = false;

      // }else{
      var time = a
      // }
      that.realTime = '00:00:00'
      for (var i = 0; i < 16; i++) {
        if (that.loginIp[i][0] != 1) {
          that.StartPlayback(that.loginIp[i][0], i, time, that.loginIp[i][1], that.loginIp[i][2]);
        }
      }
      //that.StartPlayback(that.loginIp[that.iWndIndex][0],that.iWndIndex,time);
      //that.loginIp[that.iWndIndex][1]=0;
      //that.loginIp[that.iWndIndex][2]=true;
      clearInterval(this.thistimes);
      this.thistimes = setInterval(() => {
        // this.thentime = :"00:00:00",
        // realTime:"00:00:00",
        if (!this.showMonitor) {
          let tmptime = this.realTime;
          let stepspeed = 1 * (this.speed > 0 ? this.speed : (this.speed < 0 ? -1 / this.speed : 1));
          if (stepspeed < 1) {
            //alert(stepspeed);
            that.sp = 1 / stepspeed;
            that.spnum++
          }
          if (that.sp <= that.spnum) {
            that.spnum = 0;
            stepspeed = 1
            //alert('+1')
          }
          // console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
          let numtime = (parseInt(tmptime.substr(0, 2)) * 60 + parseInt(tmptime.substr(3, 2))) * 60 + parseInt(tmptime.substr(6)) + stepspeed;
          this.thentime = this.numberToFormatTime(numtime);
          // console.log(this.thentime);
        };
      }, 1000);
    },


    // 视图模式选择
    patterActive(a) {
      var that = this;
      var str = a + 'X' + a + '视图模式';
      this.pattermsg = str;
      this.pactive = a;
      var ll = this.iiTypes;
      //console.log(this.pactive)
      this.changeWndNum(a);
      var num1 = a * a;
      var num2 = this.monitorList.length;
      var num3 = ll * ll;
      var nums = num1 < num2 ? num1 : num2;
      that.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]];
      if (num1 < num3) {
        console.log('shaole');
        for (var k = num1; k < num3; k++) {
          that.loginIp[k][0] = 1;
          if (that.showMonitor) {
            that.StopRealPlay(k);
          } else {
            that.StopPlayback(k);
          }
        }
      }//else{
      //    for(var i=0;i<nums;i++){
      //     that.monitorLogin(that.monitorList[i].ip,that.monitorList[i].passWord,that.monitorList[i].userName);
      //   }
      //   this.iiTypes = a;
      //   setTimeout(function(){
      //     if(that.showMonitor){
      //       for(var l=0;l<nums;l++){
      //         that.StopRealPlay(l);
      //         that.loginIp[l][0]=that.monitorList[l].ip;
      //         that.StartRealPlay(that.monitorList[l].ip,l);
      //       }
      //     }else{
      //       if(that.realTime){
      //         var timex = that.realTime;
      //         var timey = that.backTime?that.backTime:that.getToday();
      //         var times = timey+' '+timex;
      //       }else{
      //         var times = that.backTime?that.backTime:that.getToday();
      //       }
      //       for(var l=0;l<nums;l++){
      //         that.StopPlayback(l);
      //         that.loginIp[l][0]=that.monitorList[l].ip;
      //         that.StartPlayback(that.monitorList[l].ip,l,times);
      //       }
      //     }

      //   },1000)
      // }

      // for(var k=0;k<16;k++){
      //   if(that.showMonitor){
      //     that.StopRealPlay(k);
      //   }else{
      //     that.StopPlayback(k);
      //   }
      // }
      for (var i = 0; i < nums; i++) {
        that.monitorLogin(that.monitorList[i].ip, that.monitorList[i].passWord, that.monitorList[i].userName, that.monitorList[i].portLogin);
      }
      this.iiTypes = a;
      setTimeout(function () {
        if (that.showMonitor) {
          for (var l = 0; l < nums; l++) {
            that.StopRealPlay(l);
            that.loginIp[l][0] = that.monitorList[l].ip;//ip
            that.loginIp[l][1] = that.monitorList[l].portLogin;//播放端口
            that.loginIp[l][2] = that.monitorList[l].nvrChannel;//通道
            that.StartRealPlay(that.monitorList[l].ip, l, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
          }
        } else {
          if (that.realTime) {
            var timex = that.realTime;
            var timey = that.backTime ? that.backTime : that.getToday();
            var times = timey + ' ' + timex;
          } else {
            var times = that.backTime ? that.backTime : that.getToday();
          }
          for (var l = 0; l < nums; l++) {
            that.StopPlayback(l);
            that.loginIp[l][0] = that.monitorList[l].ip;//ip
            that.loginIp[l][1] = that.monitorList[l].portLogin;//播放端口
            that.loginIp[l][2] = that.monitorList[l].nvrChannel;//通道
            that.StartPlayback(that.monitorList[l].ip, l, times, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
          }
        }

      }, 1000)
    },


    // 区域选择
    regionActive(a) {
      var str = this.regionArr[a];
      this.regionmsg = str;
    },


    // 预置点选择
    presetActive(a) {
      this.presetmsg = a;
      this.practive = a;
      //document.getElementById('divPlugin').style.width='500px';
    },


    // 获取时间
    getToday() {
      let now = new Date();
      //格式化日，如果小于9，前面补0
      let day = ("0" + now.getDate()).slice(-2);
      //格式化月，如果小于9，前面补0
      let month = ("0" + (now.getMonth() + 1)).slice(-2);
      //拼装完整日期格式
      let today = now.getFullYear() + "-" + month + "-" + day;
      return today;
    },


    // 弹窗控制
    closeBox(a) {
      this.showEdit = a;
    },


    // //区域获取
    // dataAreaTree() {
    //   this.$store.dispatch('getAreaTree', {
    //   }).then((data) => {
    //     console.log("getAreaTree success!");
    //    //console.log(data);
    //     this.getAreaTree=data
    //     //console.log(this.getAreaTree)
    //   }, (error) => {
    //     console.log("getAreaTree error!");
    //    // console.log(error);
    //     //alert('区域管理获取数据失败')
    //   });
    // },


    // 拖拽的按下事件
    dragList(a, b, c, d, e, f, g, h) {
      this.activeList(b);
      this.playVideo = [a, c, d, f, g, h];
      console.log(this.playVideo)
      this.showdrogBox = true;
      this.drogmsg = e;
    },


    // 下载文件
    dowlond() {
      window.open("/static/resource/nongye/haikang/WebComponentsKit.exe");
      this.showEdit = false
    },


    // 实时和历史切换
    monitorActive() {
      var that = this;
      var k = this.iiTypes * this.iiTypes;
      this.showlist = 999;
      if (this.showMonitor == false) {
        //that.backTime = that.getToday();
        clearInterval(this.thistimes);
        this.showMonitor = true;
        this.speed = 0;
        this.levelState = '';
        this.Vstop = false;
        // for(var i=0;i<that.loginIp.length;i++){
        //     that.monitorLogout(that.loginIp[i]) 
        // }
        // that.loginIp=[];
        // for(var j=0;j<that.monitorList.length;j++){
        //   that.monitorLogin(that.monitorList[j][0],that.monitorList[j][1]);
        //   that.loginIp.push(that.monitorList[j][0])
        // }
        for (var m = 0; m < 16; m++) {
          that.StopPlayback(m)
        }
        that.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]]
        var nums = k < that.monitorList.length ? k : that.monitorList.length;
        var time = setInterval(function () {
          for (var l = 0; l < nums; l++) {
            that.loginIp[l][0] = that.monitorList[l].ip;//ip
            that.loginIp[l][1] = that.monitorList[l].portLogin;//播放端口
            that.loginIp[l][2] = that.monitorList[l].nvrChannel;//通道
            that.StartRealPlay(that.monitorList[l].ip, l, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
          }
          clearInterval(time)
        }, 1000)
      } else {
        that.backTime = '';
        //alert(that.backTime);
        this.showMonitor = false;
        this.thentime = "00:00:00";
        // for(var i=0;i<that.loginIp.length;i++){
        //   that.monitorLogout(that.loginIp[i]) 
        // }
        // that.loginIp=[];
        // for(var j=0;j<that.monitorList.length;j++){
        //   that.monitorLogin(that.monitorList[j][0],that.monitorList[j][1]);
        //   that.loginIp.push(that.monitorList[j][0])
        // }

        this.thistimes = setInterval(() => {
          //this.updateProgressTime();
          // this.thentime = :"00:00:00",
          // realTime:"00:00:00",
          if (!this.showMonitor) {
            let tmptime = this.realTime;
            let stepspeed = 1 * (this.speed > 0 ? this.speed : (this.speed < 0 ? -1 / this.speed : 1));
            if (stepspeed < 1) {
              //alert(stepspeed);
              that.sp = 1 / stepspeed;
              that.spnum++
            }
            if (that.sp <= that.spnum) {
              that.spnum = 0;
              stepspeed = 1
              //alert('+1')
            }
            // console.log(tmptime.substr(0,2) + "," + tmptime.substr(3,2) + "," + tmptime.substr(6));
            let numtime = (parseInt(tmptime.substr(0, 2)) * 60 + parseInt(tmptime.substr(3, 2))) * 60 + parseInt(tmptime.substr(6)) + stepspeed;
            this.thentime = this.numberToFormatTime(numtime);
            // console.log(this.thentime);
          };
          // console.log(this.thentime);
          //};
        }, 1000);



        for (var m = 0; m < 16; m++) {
          that.StopRealPlay(m)
        }
        // if(that.realTime){
        //   var timex = that.realTime;
        //   var timey = that.backTime?that.backTime:that.getToday();
        //   var times = timey+' '+timex;
        // }else{
        var timek = that.getToday();
        //}

        // console.log("this.$refs.$flatpickr");
        // console.log(this.$refs.$flatpickr.setDefaultDate);
        //this.$refs.$flatpickr.setDefaultDate("2018-04-17");
        //this.calendar_option.defaultDate = that.getToday();
        // this.$refs.$flatpickr.setDefaultDate();

        that.loginIp = [[1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true], [1, 0, true]]
        var nums = k < that.monitorList.length ? k : that.monitorList.length;
        //alert(that.monitorList[0].ip);
        setTimeout(function () {
          // alert(1)
          for (var l = 0; l < nums; l++) {
            //alert(1);
            that.loginIp[l][0] = that.monitorList[l].ip;//ip
            that.loginIp[l][1] = that.monitorList[l].portLogin;//播放端口
            that.loginIp[l][2] = that.monitorList[l].nvrChannel;//通道

            that.StartPlayback(that.monitorList[l].ip, l, timek, that.monitorList[l].portLogin, that.monitorList[l].nvrChannel);
          }
        }, 2000)

        //var wk = document.getElementById("bottom-panel").style.width;
        // console.log(wk);
        //document.getElementById("bottom-panel").style.width=wk+40+'px';

      }
    }
  },
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import 'index.styl';

.flatpickr-calendar, .animate, .inline, .showTimeInput {
  width: 260px !important;
  background: red;
}
</style>
