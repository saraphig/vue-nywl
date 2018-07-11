<template>
  <div class="forget-password-bg">
    <div class="mp-header-button-group">
      <img class="back-btn"
        src="../../../assets/img/login/back.png"
        @click="back" />
      <p class="empty-space"></p>
    </div>
    <img class="forget-password-img"
      src="../../../assets/img/login/forget-password-step2.png" />
    <p class="forget-password-step1-text">账户验证</p>
    <div class="forget-password-form">
      <div class="form-group"
        :class="{ 'form-group--error': $v.authCode.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_shoujihao"></i>
          <input class="form__input"
            v-model="authCode"
            @input="$v.authCode.$reset()"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            maxlength="4"
            @keyup.enter="nextStep"
            name="meaasge-authentication-auth-code"
            placeholder="请输入验证码">
        </label>
        <div :class="!this.sendAuthCode ? 'forget-password-auth-code' : 'forget-password-auth-code-active'">
          <span v-show="sendAuthCode"
            class="forget-password-auth-code-text"
            @click="getAuthCode"
            name="meaasge-authentication-get-auth-code">获取验证码</span>
          <span v-show="!sendAuthCode"
            class="forget-password-auth-code-text">
            重新获取
            <span>({{auth_time}}S)</span>
          </span>
        </div>
      </div>
      <span class="form-group__message"
        v-if="!$v.authCode.required">请输入验证码</span>
      <!-- <p class="forget-password-step1-tip">四位验证码已发送至{{username}}</p> -->
    </div>
    <button class="next-step-button"
      style="margin-top: 70px;"
      @click="nextStep"
      name="meaasge-authentication-next-step">下一步</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { setStore, getStore } from '@lib/js/mUtils';

Vue.use(Vuelidate);

export default {
  name: 'modifyPassword',
  computed: {
    ...mapGetters({})
  },
  created() {
    if (getStore('firstSend') === 'true') {
      this.getAuthCode();
    }
    this.$store.commit('FINISH_LOADING');
  },
  data() {
    return {
      authCode: getStore('authCode') || '',
      sendAuthCode: true,  /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      username: this.formatUserName(getStore('telephone') || ''),
    }
  },
  methods: {
    back() {
      this.$router.push('/fillaccount');
    },
    nextStep() {
      if (this.authCode === '') {
        this.$v.authCode.$touch();
      } else if (this.$v.authCode.required) {
        const body = {
          idcard: this.authCode,
          telephone: getStore('telephone') || '',
          userTypeId: 0
        };
        setStore('authCode', this.authCode);
        this.$store.dispatch('verification', body)
          .then(response => {
            if (response.code == 1) {
              alert(response.msg)
            } else {
              if (response) {
                this.$router.push('setnewpassword');
              }
            }
          }, err => alert(err))
      }
    },
    getAuthCode: function () {
      this.sendAuthCode = false;
      this.auth_time = 60;
      if (getStore('telephone') !== null && getStore('telephone') !== '') {
        const query = {
          loginCode: getStore('telephone'),
          userTypeId: 0
        };
        this.$store.dispatch('sendVerificationCode', query)
          .then(response => {
          }, err => alert(err));
      }
      const auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
      setStore('firstSend', false);  // 控制第一次进入页面， 倒计时样式
    },
    formatUserName(val) {
      if (val === undefined || val === null) {
        return 'xxx-xxxx-xxxx';
      }
      const reg = /^(\d{3})(\d{4})(\d{4})$/;
      const matches = reg.exec(val);
      return matches[1] + ' ' + matches[2] + ' ' + matches[3];
    }
  },
  validations: {
    authCode: {
      required
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'index.styl';
</style>
