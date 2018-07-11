<template>
  <div class="app clearfix" v-if="userInfo">
    <v-sidebar></v-sidebar>
    <div class="right-wrapper clearfix">
      <v-header></v-header>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import VTest from "@com/test";
  import VHeader from "../../components/header";
  import VSidebar from "../../components/sidebar";
  import ShButton from "@com/buttons/sh_button";
  import ShSilder from "@com/buttons/sh_silder";
  import ShEchart from "@com/sh_echart";

  export default {
    name: "enter",
    components: {
      VTest,
      VHeader,
      VSidebar,
      ShButton,
      ShSilder,
      ShEchart
    },
    computed: {
      ...mapGetters({
        userInfo: "getUserInfo"
      })
    },
    created() {
      // 获取用户信息
      this.getUserInfo();
    },
    methods: {
      getUserInfo(data) {
        // 获得用户信息
        this.$store.dispatch("fetchUserInfo", {}).then(
          data => {
            this.$store.commit("FETCH_USER_INFO", data);
            console.log(data);
          },
          err => {
            this.$store.commit("FETCH_USER_INFO", {});
            console.log("[fetchUserInfo] error:%c" + err, "color:red");
          }
        );
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app {
    min-width: 980px;
    height: 100%;
    background: #F6FAFA;
  }

  .right-wrapper {
    background: #F6FAFA;
  }

  @media screen and (min-width: 1700px) {
    .right-wrapper {
      margin-left: 350px;
    }
  }

  @media screen and (min-width: 1600px) and (max-width: 1699px) {
    .right-wrapper {
      margin-left: 330px;
    }
  }

  @media screen and  (min-width: 1499px) and (max-width: 1599px) {
    .right-wrapper {
      margin-left: 320px;
    }
  }

  @media screen and (min-width: 1400px) and (max-width: 1499px) {
    .right-wrapper {
      margin-left: 310px;
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1399px) {
    .right-wrapper {
      margin-left: 290px;
    }
  }

  @media screen and (max-width: 1199px) {
    .right-wrapper {
      margin-left: 280px;
    }
  }
</style>
