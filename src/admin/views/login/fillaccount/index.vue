<template>
  <div class="forget-password-bg">
    <div class="mp-header-button-group">
      <img class="back-btn" src="../../../assets/img/login/back.png" @click="back"/>
      <p class="empty-space"></p>
    </div>
    <img class="forget-password-img" src="../../../assets/img/login/forget-password-step1.png"/>
    <p class="forget-password-step1-text">填写账户</p>
    <div class="forget-password-form">
      <div class="form-group" :class="{ 'form-group--error': $v.username.$error }">
        <label>
          <i class="iconfont icon-shouji"></i>
          <input
            class="form__input"
            v-model="username"
            @input="$v.username.$reset()"
            @keyup.enter="nextStep"
            maxlength="11"
            name="fill-account-usernaem"
            placeholder="请输入账户名">
        </label>
      </div>
      <span class="form-group__message" v-if="!$v.username.required">请输入账户名</span>
      <span class="form-group__message" v-if="$v.username.required && !$v.username.mobilephone">
        请输入11位正确的手机账号</span>
      <p class="forget-password-step1-tip">注: 账户名为用户的11位手机号码</p>
    </div>
    <button class="next-step-button" @click="nextStep" name="fill-account-next-step">下一步</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import Vuelidate from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import { setStore, getStore } from '@lib/js/mUtils';
  import { mobilephone } from '../../../utils/regvalidator';

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
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      nextStep() {
        if (this.$v.username.required && this.$v.username.mobilephone) {
          const query = {
            loginCode: this.username,
            userTypeId: 1
          };
          setStore('telephone', this.username);
          setStore('authCode', '');
          this.$store.dispatch('existsByCode', query)
            .then(response => {
              setStore('firstSend', true);   // 控制第一次进入页面， 倒计时样式
              this.$router.push('messageauthentication');
            }, err => {
              if (err && err.exception && err.exception.indexOf('ZuulException')) {
                alert('服务器正忙，请稍后再试');
              } else {
                alert(err);
              }
            });
        } else {
          this.$v.username.$touch();
        }
      }
    },
    validations: {
      username: {
        required,
        mobilephone
      }
    },
    watch: {
      username (val) {
        return val;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
