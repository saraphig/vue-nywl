<template>
  <div class="login-bg">
    <img class="logo" src="../../assets/img/login/SH-logo.png"/>
    <div class="form-bg">
      <router-view />
    </div>
    <div class="login-footer">
      <!--<span>联系客服: </span>-->
      <!--<span class="contact-number">1234-5678</span>-->
      <p class="copyright-message">
        Copyright 2018 SIHENG Technology. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "login",
    computed: {
      ...mapGetters({})
    },
    components: {},
    created() {
    },
    methods: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import "index.styl";
</style>
