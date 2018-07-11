<template>
  <div>
    <div class="form-left"></div>
    <div class="form-detail">

      <p class="welcome-chinese">欢迎使用</p>
      <p class="welcome-chinese">嗣衡智慧农业综合管理平台</p>

      <p class="welcome-english">Welcome to use the SIHENG Intelligent Agriculture</p>
      <p class="welcome-english">Comprehensive Management Platform</p>

      <div class="form-group-username"
        :class="{ 'form-group--error': $v.username.$error }">
        <label>
          <i class="iconfont icon-icon_denglu_shoujihao"></i>
          <input class="form__input"
            v-model="username"
            @input="$v.username.$reset()"
            placeholder="账号"
            name="login-username">
        </label>
      </div>
      <span class="form-group__message"
        v-if="!$v.username.required">
        <span>请输入账号</span>
      </span>

      <div class="form-group"
        :class="{ 'form-group--error': !$v.password.required }">
        <label>
          <i class="iconfont icon-icon_denglu_mima"></i>
          <input class="form__input"
            v-model="password"
            @input="$v.password.$reset()"
            type="password"
            name="login-password"
            placeholder="密码"
            @keyup.enter="login">
        </label>
      </div>
      <span class="form-group__message"
        v-show="passwordnull"
        v-if="!$v.password.required">
        <span>请输入密码</span>
      </span>
      <span class="form-group__messagew"
        v-show="passwordmin"
        v-if="!$v.password.minLength">
        <span>密码不少于{{ $v.password.$params.minLength.min }}位</span>
      </span>
      <p class="forget-password">
        <a class="forget-password-text"
          @click="forgetPassword"
          name="login-forget-password">忘记密码？</a>
      </p>
      <span class="usererr"
        v-show="usererr">
        <span>{{errmsg}}</span>
      </span>
      <button class="login-button"
        @click="login"
        name="login-login-button">登录</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { myCustomValidator } from '../validate';
import { setStore, getStore } from '@lib/js/mUtils';
import { hex_md5 } from '../md5';


Vue.use(Vuelidate);

export default {
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
      localStorage.setItem('currentIndex', 0);
      if (this.password == '') {
        this.passwordnull = true;
        this.usererr = false;
      } else {
        this.passwordnull = false;
      }
      if (!this.$v.password.minLength) {
        this.passwordmin = true;
        this.usererr = false;
      } else {
        this.passwordmin = false;
      }
      if (this.username === '' || this.password === '' ||
        !this.$v.username.required || !this.$v.password.minLength) {
        this.$v.username.$touch();
        this.$v.password.$touch();
      } else if (this.$v.username.required && this.$v.password.minLength) {
        // TODO: 登录接口调试
        const body = {
          userCode: this.username,
          password: hex_md5(this.password),
          userTypeId: 0,
          clientId: 'ny-web'
        };
        setStore('telephone', this.username);  // 保存账户名到localStore
        this.$store.dispatch('login', body)
          .then(response => {
            // 请求成功
            if (response.code == 0) {
              this.usererr = false;
              setStore('api_token', response.result.token);
              this.$store.commit('FETCH_API_TOKEN', response.result.token);
              this.$store.commit('START_LOADING');
              if (response.result.isFirstLogin) {   // 判断第一次登录
                this.$router.push({path:'/changepassword',query:{isFromfistBack: true}});
              } else {
                setTimeout(() => {
                  this.$store.commit('FETCH_CHECKED_TOKEN', true);
                  this.$router.push('/index');
                  // reset
                  this.$v.password.$reset();
                });
              }
            } else {
              this.errmsg = response.msg;
              this.usererr = true;
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
      usererr: false,
      passwordnull: false,
      errmsg: '',
      passwordmin: false
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
    username(val) {
      return val;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'index.styl';
</style>
