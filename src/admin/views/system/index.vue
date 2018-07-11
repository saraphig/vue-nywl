<template>
	<div class="system">
    <div class="table-title webfont">告警级别</div>
    <sh-table
      :datalist="alarmDatalist"
      :tabTitle="alarmTabTitle"
      :tabwidth="alarmTabwidth"
      :pageTotal="alarmPageTotal"
      :param="alarmParam"
      :pageNos="alarmPageNo"
      :tableSorting="true"
      :pageLen="alarmPageLen"
      @pageNo="alarmPageNos">
    </sh-table>
    <div class="table-title mt20 webfont">农业类型</div>
    <button class="system-add-button mt20" @click="showAgroDetail" name="system-add-agro-type">添加</button>
    <sh-alert
      v-show="showDetail"
      @callback="alertCallback"
      :boxtitle="alertBoxTitle"
    >
      <div slot="alertFunctionBox" class="agricultural-type-form">
        <div class="agricultural-type-form-group" :class="{ 'agricultural-type-group--error': $v.agroType.$error }">
          <label>
            <i class="iconfont icon-touxiang"></i>
            <input
              class="form__input"
              v-model="agroType"
              @input="$v.agroType.$reset()"
              placeholder="农业类型"
              maxlength="16"
              @keyup.enter="appendAgroType"
              name="system-argo-type">
          </label>
        </div>
        <span class="agricultural-type-group__message" v-if="!$v.agroType.required">请输入农业类型</span>
        <span class="agricultural-type-group__message" v-if="!$v.agroType.minLength">
          农业类型不少于{{$v.agroType.$params.minLength.min}}位</span>
        <span class="agricultural-type-group__message" v-if="!$v.agroType.nickname">请输入正确的农业类型，不能用特殊符号</span>

        <button class="append-button" @click="appendAgroType" name="userlist-append-user">
          {{ this.buttonName }}
        </button>
      </div>
    </sh-alert>
		<sh-table
      :datalist="datalist"
      :tabTitle="tabTitle"
      :tabwidth="tabwidth"
      :pageTotal="pageTotal"
      :operate="true"
      :param="param"
      :pageNos="pageNo"
      :tableSorting="true"
      :pageLen="pageLen"
      @pageNo="pageNos">
			<template slot="tableSlot" slot-scope="props">
				<span class="color0b82fd" @click="editArgoType(props.arr)">编辑</span>
			</template>
		</sh-table>
	</div>
</template>
<script>
import ShTable from '@com/table';
import ShAlert from '@com/alert';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { nickname } from '../../utils/regvalidator'

Vue.use(Vuelidate);

export default {
	data() {
		return {
		  alarmTabTitle: {
        alarmType: '告警名称',
        alarmLevel: '告警级别'
      },
      alarmTabwidth: {
        alarmType: '',
        alarmLevel: ''
      },
      alarmDatalist: [],
      alarmPageLen: 10, //一页展示的条数
      alarmPageTotal: 1, //总页数
      alarmPageNo: 1, //当前页
      alarmParam: {},
		  showDetail: false,
			pageLen: 10, //一页展示的条数
			pageTotal: 1, //总页数
			pageNo: 1, //当前页
      param: {},
      tabTitle: {
        dict_name: '类型名称'
      }, //表头
      tabwidth: {
        dict_name: ''
      },
			datalist: [], //数据列表
      agroType: '',
      type: 'add',  // 判断添加还是编辑   add：添加    edit： 编辑
      alertBoxTitle: '添加农业类型',
      current: null, // 当前选择的行数据
      buttonName: '确定添加'
		}
	},
	components: {
    ShTable,
    ShAlert
	},
  created() {
    this.getData();
    this.getAlarmData();
    this.resetFormValue();
  },
	methods: {
    showAgroDetail() {
      this.showDetail = true;
      this.type= 'add';
      this.alertBoxTitle = '添加农业类型';
      this.buttonName = '确定添加';
    },
    appendAgroType() {
	    if (this.$v.agroType.required && this.$v.agroType.minLength && this.$v.agroType.nickname) {
        let body = {};
        if (this.type === 'add') {
          body = {
            dict_name: this.agroType,
            description: this.agroType
          };
          this.$store.dispatch('appendAgroType', body)
            .then(response => {
              if (response === '该类型已存在，请重新输入。') {
                alert(response);
              } else if (response === '农业类型数量超过20，不能再添加。') {
                alert(response);
                this.resetFormValue();
              }  else {
                alert('添加成功');
                this.resetFormValue();
                this.getData();
              }
            }, err => alert(err));
        } else if (this.type === 'edit') {
          body = {
            id: this.current.id,
            dict_name: this.agroType,
            description: this.agroType
          };
          this.$store.dispatch('editAgroType', body)
            .then(response => {
              if (response === '该类型已存在，请重新输入。') {
                alert(response);
              } else if (response === '农业类型数量超过20，不能再添加。') {
                alert(response);
                this.resetFormValue();
              } else {
                alert('修改成功');
                this.resetFormValue();
                this.getData();
              }
            }, err => alert(err));
        }
      } else {
        this.$v.agroType.$touch();
      }
    },
    resetFormValue() {
      this.showDetail = false;
      this.agroType = '';
      this.$v.agroType.$reset();
    },
    alertCallback(status) {
      this.resetFormValue();
	    this.showDetail = status;
    },
		getData() {
      const query = {
        pageNo: this.pageNo,
        rowNo: this.pageLen,
        name: 'dvm_region_type',
        t: new Date().getTime() //时间戳，ie兼容
        // timestamp: Date.now()
      };
			this.$store.dispatch('getAgroTypeList', query)
        .then(response => {
          this.datalist = response.data;
          if (response.page.total % this.pageLen === 0) {
            this.pageTotal = parseInt(response.page.total / this.pageLen)
          } else {
            this.pageTotal = parseInt(response.page.total / this.pageLen) + 1;
          }
        }, err => alert(err));
		},
    getAlarmData() {
      this.alarmDatalist = [
        {
          alarmType: '一般告警',
          alarmLevel: '3',
        },{
          alarmType: '严重告警',
          alarmLevel: '2',
        },{
          alarmType: '紧急告警',
          alarmLevel: '1',
        }
      ];
    },
		// 点击数据列表
    editArgoType(current) {
      this.showDetail = true;
      this.type= 'edit';
      this.alertBoxTitle = '编辑农业类型';
      this.buttonName = '确定修改';
      this.$v.agroType.$reset();
      this.agroType = current.dict_name;
      this.current = current;
		},
		//当分页发生改变时出行请求数据
		pageNos(pageNo) {
			this.pageNo = pageNo;
			this.getData()
		},
    alarmPageNos(pageNo) {
			this.alarmPageNo = pageNo;
			this.getAlarmData()
		},
	},
	mounted() {
	},
	watch: {
	},
  validations: {
    agroType: {
      required,
      nickname,
      minLength: minLength(2)
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
</style>
