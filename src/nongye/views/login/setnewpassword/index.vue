<template>
  <div class="forget-password-bg">
    <div class="mp-header-button-group">
      <img class="back-btn"
        src="../../../assets/img/login/back.png"
        @click="back" />
      <p class="empty-space"></p>
    </div>
    <img class="forget-password-img"
      src="../../../assets/img/login/forget-password-step3.png" />
    <p class="forget-password-step1-text">设置新密码</p>
    <div class="forget-password-form">
      <div class="form-group"
        :class="{ 'form-group--error': $v.newPassword.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_mima"></i>
          <input class="form__input"
            v-model="newPassword"
            @input="$v.newPassword.$reset()"
            type="password"
            maxlength="12"
            name="set-new-password-new-password"
            placeholder="请输入6-12位密码">
        </label>
      </div>
      <span class="form-group__message"
        v-if="!$v.newPassword.required">请输入6-12位数密码</span>
      <span class="form-group__message"
        v-if="!$v.newPassword.minLength">
        请输入{{ $v.newPassword.$params.minLength.min }}到{{ $v.newPassword.$params.maxLength.max }}位数密码
      </span>
      <div class="form-group"
        :class="{ 'form-group--error': $v.repeatNewPassword.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_mima"></i>
          <input class="form__input"
            v-model="repeatNewPassword"
            @input="$v.repeatNewPassword.$reset()"
            type="password"
            maxlength="12"
            @keyup.enter="finish"
            name="set-new-password-repeat-password"
            placeholder="再次确认密码">
        </label>
      </div>
      <span class="form-group__message"
        v-if="!$v.repeatNewPassword.required">请输入确认密码</span>
      <span class="form-group__message"
        v-if="$v.repeatNewPassword.required && !$v.repeatNewPassword.sameAsPassword">两次输入密码不一致，请重新确认</span>
    </div>
    <button class="finish-button"
      @click="finish"
      name="set-new-password-finish-button">完成</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { getStore } from '@lib/js/mUtils';
import { hex_md5 } from '../md5';

Vue.use(Vuelidate);

export default {
  name: 'modifyPassword',
  computed: {
    ...mapGetters({})
  },
  created() {
    this.$store.commit('FINISH_LOADING');
  },
  data() {
    return {
      newPassword: '',
      repeatNewPassword: '',
    }
  },
  methods: {
    back() {
      this.$router.push('/messageauthentication');
    },
    finish() {
      if (this.$v.newPassword.required && this.$v.newPassword.minLength
        && this.$v.repeatNewPassword.sameAsPassword && this.$v.repeatNewPassword.required) {
        const body = {
          password: hex_md5(this.newPassword),
          telephone: getStore('telephone'),
          userTypeId: 0
        };
        this.$store.dispatch('setPassword', body)
          .then(response => {
            if (response) {
              alert('密码修改成功！');
              this.$router.push('/login');
            }
          }, err => alert(err));
      } else {
        this.$v.newPassword.$touch();
        this.$v.repeatNewPassword.$touch();
      }
    }
  },
  validations: {
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(12),
    },
    repeatNewPassword: {
      required,
      sameAsPassword: sameAs('newPassword')
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'index.styl';
</style>
