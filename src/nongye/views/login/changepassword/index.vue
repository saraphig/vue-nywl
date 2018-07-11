<template>
  <div class="change-password-bg">
    <div class="mp-header-button-group">
      <img class="back-btn"
        src="../../../assets/img/login/back.png"
        @click="back" v-if="!isFromfistBack"/>
      <a v-if="!isFromPersonalCenter"
        class="jump-btn-text"
        @click="jump">跳过</a>
      <p v-else
        class="empty-space"></p>
    </div>
    <img class="change-password-img"
      src="../../../assets/img/login/change-password.png" />
    <p class="change-password-text">修改密码</p>
    <div class="change-password-form">
      <!--<div v-show="!isFromPersonalCenter" class="form-group" :class="{ 'form-group&#45;&#45;error': $v.initialPassword.$error }">-->
      <!--<label>-->
      <!--<i class="iconfont icon-lock"></i>-->
      <!--<input-->
      <!--class="form__input"-->
      <!--v-model="initialPassword"-->
      <!--@input="$v.initialPassword.$touch()"-->
      <!--maxlength="12"-->
      <!--disabled-->
      <!--placeholder="请输入初始密码">-->
      <!--</label>-->
      <!--</div>-->
      <!--<span class="form-group__message" v-if="!$v.initialPassword.required">请输入初始密码</span>-->
      <div class="form-group"
        :class="{ 'form-group--error': $v.newPassword.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_mima"></i>
          <input class="form__input"
            v-model="newPassword"
            @input="$v.newPassword.$reset()"
            maxlength="12"
            type="password"
            name="change-password-new-password"
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
            name="change-password-repeat-password"
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
      name="change-password-finish-button">完成</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import { hex_md5 } from '../md5';

Vue.use(Vuelidate);

export default {
  name: 'modifyPassword',
  computed: {
    ...mapGetters({})
  },
  data() {
    return {
      initialPassword: '123456',
      newPassword: '',
      repeatNewPassword: '',
      isFromfistBack:this.$route.query.isFromfistBack || false,
      isFromPersonalCenter: this.$route.query.isFromPersonalCenter || false
    }
  },
  created() {
    this.$store.commit('FINISH_LOADING');
  },
  methods: {
    back() {
      this.newPassword = '';
      this.repeatNewPassword = '';
      this.$v.newPassword.$reset();
      this.$v.repeatNewPassword.$reset();
      this.$router.push(this.$route.params.backurl);

    },
    jump() {
      this.$router.push('/index');
    },
    finish() {
      if (this.$v.newPassword.required && this.$v.newPassword.minLength
        && this.$v.repeatNewPassword.sameAsPassword && this.$v.repeatNewPassword.required) {
        const body = {
          password: hex_md5(this.newPassword),
        };
        this.$store.dispatch('modifyPassword', body)
          .then(response => {
            if (response.msg === 'ok') {
              this.newPassword = '';
              this.repeatNewPassword = '';
              this.$v.newPassword.$reset();
              this.$v.repeatNewPassword.$reset();
              this.$router.push('/index');
              alert('修改成功');
            } else {
              alert(response.msg);
            }
          }, err => alert(err))
      } else {
        this.$v.newPassword.$touch();
        this.$v.repeatNewPassword.$touch();
      }
    }
  },
  validations: {
    initialPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(12),
    },
    repeatNewPassword: {
      required,
      sameAsPassword: sameAs('newPassword')
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'index.styl';
</style>
