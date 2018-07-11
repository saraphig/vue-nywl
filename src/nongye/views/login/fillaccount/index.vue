<template>
  <div class="forget-password-bg">
    <div class="mp-header-button-group">
      <img class="back-btn"
        src="../../../assets/img/login/back.png"
        @click="back" />
      <p class="empty-space"></p>
    </div>
    <img class="forget-password-img"
      src="../../../assets/img/login/forget-password-step1.png" />
    <p class="forget-password-step1-text">填写账户</p>
    <div class="forget-password-form">
      <div class="form-group"
        :class="{ 'form-group--error': $v.username.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_shoujihao"></i>
          <input class="form__input"
            v-model="username"
            @keyup.enter="nextStep"
            maxlength="11"
            name="fill-account-username"
            placeholder="请输入手机号">
        </label>
      </div>

      <span class="fill-account-err"
        v-show="errshow">
        {{errmsg}}</span>
      <!--       <p class="forget-password-step1-tip">注: 账户名为用户的11位手机号码</p> -->
    </div>
    <button class="next-step-button"
      @click="nextStep"
      name="fill-account-next-step">下一步</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { setStore, getStore } from '@lib/js/mUtils';
import { mobilephone } from '@nongye/utils/regvalidator';

Vue.use(Vuelidate);

export default {
  name: 'modifyPassword',
  computed: {
    ...mapGetters({})
  },
  created() {
    this.$store.commit('FINISH_LOADING');
    this.username = getStore('telephone') || '';
  },
  data() {
    return {
      username: '',
      errmsg: '',
      errshow: false
    }
  },
  methods: {
    back() {
      this.$router.push('/login');
    },
    nextStep() {
      var re = /^[0-9]+.?[0-9]*$/;
      if (this.username == '') {
        this.errmsg = "手机号码不能为空";
        this.errshow = true;
        return false
      } else if (this.username.length < 11) {
        this.errmsg = "手机号码不能小于11位";
        this.errshow = true;
        return false
      } else if (!re.test(this.username)) {
        this.errmsg = "手机号码只能为纯数字"
        this.errshow = true;
        return false
      } else {
        this.errshow = false;
        const query = {
          loginCode: this.username,
          userTypeId: 0
        };
        setStore('telephone', this.username);
        setStore('authCode', '');
        this.$store.dispatch('existsByCode', query)
          .then(response => {
            if (response.code == 1) {
              alert(response.msg)

            } else {
              setStore('firstSend', true);   // 控制第一次进入页面， 倒计时样式
              this.$router.push('messageauthentication');
            }
          }, err => {
            if (err && err.exception && err.exception.indexOf('ZuulException')) {
              alert('服务器正忙，请稍后再试');
            } else {
              alert(err);
            }
          });
      }
      // if (this.$v.username.required && this.$v.username.mobile) {

      // } else {
      //   this.$v.username.$touch();

      // }
    }
  },
  validations: {
    username: {
      required,
      mobile() {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.username)) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  watch: {
    username(val) {
      return val;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'index.styl';

.fill-account-err {
  color: #fa1919;
  width: 300px;
  display: inline-block;
  text-align: left;
  padding-left: 25px;
  margin-top: -12px;
  font-size: 12px;
}
</style>
