<template>
  <div>
    <div class="form-left"></div>
    <div class="form-detail">

      <p class="welcome-chinese">欢迎使用</p>
      <p class="welcome-chinese">嗣衡智慧农业管理后台</p>

      <p class="welcome-english">Welcome to use</p>
      <p class="welcome-english">SIHENG intelligent agricultural management platform</p>

      <div class="form-group-username" :class="{ 'form-group--error': $v.username.$error }">
        <label>
          <i class="iconfont icon-shouji"></i>
          <input class="form__input" v-model="username" @input="$v.username.$reset()" placeholder="账户名"
                 name="login-username">
        </label>
      </div>
      <span class="form-group__message" v-if="!$v.username.required">请输入账户名</span>

      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label>
          <i class="iconfont icon-lock"></i>
          <input class="form__input" v-model="password" @input="$v.password.$reset()" type="password"
                 name="login-password"
                 placeholder="密码" @keyup.enter="login">
        </label>
      </div>
      <span class="form-group__message" v-if="!$v.password.required">请输入密码</span>
      <span class="form-group__message" v-if="!$v.password.minLength">
        密码不少于{{ $v.password.$params.minLength.min }}位
      </span>
      <p class="forget-password">
        <a class="forget-password-text" @click="forgetPassword" name="login-forget-password">忘记密码？</a>
      </p>
      <button class="login-button" @click="login" name="login-login-button">登录</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Vue from 'vue';
  import Vuelidate from 'vuelidate';
  import {required, minLength} from 'vuelidate/lib/validators';
  import { myCustomValidator } from '../validate';
  import { setStore, getStore } from '@lib/js/mUtils';
  import { hex_md5 } from '../md5';


  Vue.use(Vuelidate);

  export default{
    name: 'loginMain',
    computed: {
      ...mapGetters({
      })
    },
    created() {
      this.$store.commit('FINISH_LOADING');
      this.username = getStore('telephone') || '';
    },
    methods: {
      login() {
        if (this.username === '' || this.password === '' ||
          !this.$v.username.required || !this.$v.password.minLength) {
          this.$v.username.$touch();
          this.$v.password.$touch();
        } else if (this.$v.username.required && this.$v.password.minLength) {
          // TODO: 登录接口调试
          const body = {
            userCode: this.username,
            password: hex_md5(this.password),
            userTypeId: 1
          };
          setStore('telephone', this.username);  // 保存账户名到localStore
          this.$store.dispatch('login', body)
            .then(response => {
              setStore('api_token', response.result.token);
              this.$store.commit('FETCH_API_TOKEN', response.result.token);
              this.$store.commit('START_LOADING');
              if (response.result.isFirstLogin) {   // 判断第一次登录
                this.$router.push('/changepassword');
              } else {
                this.$router.push('/index');
                this.password = '';
                this.$v.password.$reset();
              }
            }, err => {
              alert(err)
            })
        }
      },
      forgetPassword() {
        this.$router.push('/fillaccount');
      },
    },
    data() {
      return {
        username: '',
        password: '',
      }
    },

    validations: {
      username: {
        // myCustomValidator, // 校验手机号码
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
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
