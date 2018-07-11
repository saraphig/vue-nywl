<template>
	<div class="userlist">
    <div class="table-title webfont">用户列表</div>
    <button class="add-button" @click="showUserDetail" name="userlist-add-user">添加账户</button>
    <sh-alert
      v-show="showDetail"
      @callback="alertCallback"
      boxtitle="添加账户"
    >
      <div slot="alertFunctionBox" class="user-detail-form">
        <div class="user-form-group" :class="{ 'user-form-group--error': $v.username.$error }">
          <label>
            <i class="iconfont icon-touxiang"></i>
            <input
              class="form__input"
              v-model="username"
              @input="getByteLen"
              placeholder="用户昵称"
              name="userlist-username">
          </label>
        </div>
        <span class="user-form-group__message" v-if="!$v.username.required">请输入用户昵称</span>
        <span class="user-form-group__message" v-if="$v.username.required && !$v.username.nickname">
          请输入正确的用户昵称，不能用特殊符号</span>

        <div class="user-form-group" :class="{ 'user-form-group--error': $v.mobilephone.$error }">
          <label>
            <i class="iconfont icon-shouji"></i>
            <input
              class="form__input"
              v-model="mobilephone"
              @input="$v.mobilephone.$reset()"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              name="userlist-mobilephone"
              maxlength="11"
              @keyup.enter="appendUser"
              placeholder="手机账号">
          </label>
        </div>
        <span class="user-form-group__message" v-if="!$v.mobilephone.required">请输入11位手机账号</span>
        <span class="user-form-group__message" v-if="$v.mobilephone.required && !$v.mobilephone.mobilephone">
          请输入11位正确的手机账号</span>
        <button class="append-button" @click="appendUser" name="userlist-append-user">确定添加</button>
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
				<span v-if="props.arr.isUsed" class="color0b82fd" @click="setUserStatus(props.arr)">禁用</span>
				<span v-else class="color0b82fd" @click="setUserStatus(props.arr)">启用</span>
			</template>
		</sh-table>
	</div>
</template>
<script>
import ShTable from '@com/table';
import ShAlert from '@com/alert';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mobilephone, nickname } from '../../utils/regvalidator';

Vue.use(Vuelidate);

export default {
	data() {
		return {
		  showDetail: false,
			pageLen: 10, //一页展示的条数
			pageTotal: 1, //总页数
			pageNo: 1, //当前页
      param: {},
      tabTitle: {
        // displayOrder: '序号',
        userName: '用户昵称',
        loginCode: '账号',
        gmtCreate: '注册时间',
        loginCount: '登录次数'
      }, //表头
      tabwidth: {
        userName: '350',
        loginCode: '',
        gmtCreate: '',
        loginCount: ''
      },
			datalist: [], //数据列表
      username: '',
      mobilephone: '',
      aaa: null
		}
	},
	components: {
    ShTable,
    ShAlert
	},
  created() {
    this.getData();
    this.resetFormValue();
  },
	methods: {
	  showUserDetail() {
      this.showDetail = true;
    },
    appendUser() {
	    if (this.$v.mobilephone.required && this.$v.username.required
        && this.$v.mobilephone.mobilephone && this.$v.username.nickname) {
        const body = {
          userName: this.username,
          loginCode: this.mobilephone
        };
        this.$store.dispatch('appendUser', body)
          .then(response => {
            alert('添加成功');
            this.resetFormValue();
            this.showDetail = false;
            this.getData();
          }, err => alert(err));
      } else {
        this.$v.username.$touch();
        this.$v.mobilephone.$touch();
      }
    },
    alertCallback(status) {
      this.resetFormValue();
	    this.showDetail = status;
    },
    resetFormValue() {
      this.username ='';
      this.mobilephone ='';
      this.$v.username.$reset();
      this.$v.mobilephone.$reset();
    },
		getData() {
      const query = {
        pageNo: this.pageNo,
        rowNo: this.pageLen,
        timestamp: Date.now()
      };
			this.$store.dispatch('getUserList', query)
        .then(response => {
          this.datalist = response.data;
          if (response.page.total % this.pageLen === 0) {
            this.pageTotal = parseInt(response.page.total / this.pageLen)
          } else {
            this.pageTotal = parseInt(response.page.total / this.pageLen) + 1;
          }
        }, err => alert(err));
		},
		// 点击数据列表
		setUserStatus(currentData) {
      const body = {
        userId: currentData.id,
        isUsed: !currentData.isUsed,
      };
	    if (currentData.isUsed) {
        this.show_confirm(body);
      } else {
        this.$store.dispatch('setUserStatus', body)
          .then(response => {
            this.getData();
          }, err => alert(err));
      }
		},
    show_confirm(body) {
        let disable = confirm('确定要禁用当前用户吗？');
        if (disable === true) {
          this.$store.dispatch('setUserStatus', body)
            .then(response => {
              alert('禁用成功！');
              this.getData();
            }, err => alert(err));
        }
    },
		//当分页发生改变时出行请求数据
		pageNos(pageNo) {
			this.pageNo = pageNo;
			this.getData()
		},
    // 汉字算2个字符
    getByteLen() {
      this.$v.username.$reset()
      let len = 0;
      let chineseCount = 0;
      for (let i = 0; i < this.username.length; i++) {
        let a = this.username.charAt(i);
        if (/[\u4E00-\u9FA5]/.test(a)) {
          len += 2;
          if (chineseCount < 6) {
            chineseCount += 1;
          }
        } else {
          len += 1;
        }
        if (len > 12) {
          this.username = this.username.slice(0, 12 - chineseCount);
          break;
        }
      }
    }
	},
	mounted() {
	},
	watch: {
	},
  validations: {
    username: {
      required,
      nickname
    },
    mobilephone: {
      required,
      mobilephone
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
</style>
