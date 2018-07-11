<template>
  <div class="areacont">
    <VmaskLayer v-if="maskShow==true"
      @status="status"
      :subdata="subdata"></VmaskLayer>
    <VmaskLayerAdd v-if="maskShowOne==true"
      @statusOne="statusOne"
      @addarea="addarea"></VmaskLayerAdd>
    <VmaskLayerEdit v-if="maskShowEdit==true"
      @checkOr="checkOr"
      @statusEdit="statusEdit"
      @editarea="editarea"
      :areaInfo="areaInfo"
      :maskShowEdit="maskShowEdit"></VmaskLayerEdit>
    <div class="titlebg clearfix">
      <span class="title fl webfont">操作日志</span>
      <div class="fr">
        <button class="search-btn fl"
          name="sysoperate"
          @click="searchHandel()">搜索</button>
      </div>
    </div>
    <v-table :datalist="datalist"
      :tabTitle="tabTitle"
      :tabwidth="tabwidth"
      :pageTotal="pageTotal"
      :param="param"
      @checkboxlist="boxlist"
      :pageNos="pageNo"
      @pageNo="pageNos"
      :tableSorting="true"
      :sort="true">
    </v-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import VTable from '@com/table'
import VMessagebox from '@com/alert/message-box'

export default {
  components: {
    VTable,
    VMessagebox
  },
  data() {
    return {
      pageNoMes: 1,
      selectType: 0,
      form: {
        dateStart: null,
        dateEnd: null,
      },
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.form.dateEnd;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        },
        //          defaultDate: "2018-03-21 12:00:00"
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.form.dateStart;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        },
        //          defaultDate: "2018-04-21 12:00:00"
      },
      pageLen: 10, //一页展示的条数
      subpageLen: 5,//设备页一页展示条数
      pageTotal: 1, //总页数
      pageNo: 1, //当前页
      subPageNo: 1,//自设备列表当前页
      subdata: [], //子设备数据
      subdataConnect: '',
      datalist: [], //区域数据列表
      searchval: '', //搜索内容
      maskShow: false,
      maskShowOne: false,
      maskShowEdit: false,
      checkboxlists: [], // 返回复选框选中的值
      //url: '/api/table', // 请求路径
      areaInfo: {}, //获取区域信息
      param: {}, // 向服务器传递参数
      tabTitle: {
        className: '日志类型',
        typeName: '日志内容',
        userTypeName: '角色',
        userLoginCode: '账户',
        gmtCreate: '记录时间',
      }, //表头
      tabwidth: {
        className: '',
        typeName: '',
        userTypeName: '',
        userLoginCode: '',
        gmtCreate: '',
      }, //每列的宽度
    }
  },
  created: function () {

  },
  destroyed: function () {
  },
  methods: {
    onSelectType: function (type) {
      this.selectType = type
      console.log(type)
    },
    startTimeClick(indate) {
      this.form.dateStart = indate;
    },
    endTimeClick(indate) {
      this.form.dateEnd = indate;
    },
    getSec(date) {
      var date = date + ''
      let year = date.substring(0, 4) * 60 * 60 * 24 * 30 * 12;
      let month = date.substring(5, 7) * 60 * 60 * 24 * 30;
      let day = date.substring(8, 10) * 60 * 60 * 24;
      let hour = date.substring(11, 13) * 60 * 60;
      let min = date.substring(14, 16) * 60;
      let sec = date.substring(17, 19) * 1;
      let total = year + month + day + hour + min + sec;
      return total
    },
    dateDiff(endTime, startTime) {
      return (this.getSec(endTime) - this.getSec(startTime)) / (60 * 60 * 24)
    },
    getData() {

      if (this.dateDiff(this.form.dateEnd, this.form.dateStart) > 30) {
        alert('请选择一个月内的范围')
      } else if (this.form.dateStart > this.form.dateEnd) {
        alert('结束日期要大于开始日期')
      } else {
        this.pageNoMes = 1;
        this.$store.dispatch('fetchSystemSetting', {
          startTime: this.form.dateStart,
          endTime: this.form.dateEnd,
          pageNo: this.pageNo,
          rowNum: this.pageLen
        }).then((data) => {
          if (data == '无符合条件记录') {
            alert('暂无数据记录');
            this.datalist = [];
            this.pageTotal = 0;
          } else {
            this.pageTotal = Math.ceil(data.page.total / this.pageLen);
            this.datalist = data.data
          }
        }, (error) => {
          alert('区域管理获取数据失败')
        });
      }

    },
    checkOr: function (d) {
      this.checkboxlists = d;
    },
    searchHandel() {
      if (this.form.dateStart === null || this.form.dateEnd === null || this.form.dateStart === undefined || this.form.dateEnd === undefined) {
        alert('请选择时间段')
      } else {
        this.pageNo = 1;
        this.getData()
      }
    },
    //当分页发生改变时出行请求数据
    pageNos(d) {
      this.pageNo = d
      this.getData()
    },
    //获取复选框的数据
    boxlist(d) {
      this.checkboxlists = d
    },
    //返回搜索区域
    SearchVal(d) {
      this.searchval = d
    },
    //返回搜索区域
    addarea(d) {
      if (d) {
        this.getData();
        this.maskShowOne = false;
      }
    },
    status: function (s) {
      this.maskShow = s;
    },
    statusOne: function (sta) {
      this.maskShowOne = sta;
    },
    statusEdit: function (sta) {
      this.maskShowEdit = sta;
    },
    maskShowEdits: function (sta) {
      this.maskShowEdit = sta;
    },
  },
  mounted() {
    this.getData()
  },
  watch: {
    // 监测当前页变化
    searchval: function () {
      this.getData()
    }
  },
}
</script>

<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import 'index.styl';
</style>
