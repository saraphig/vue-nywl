<template>
  <div class="app clearfix"
    v-if="userInfo">
    <!-- <v-header></v-header> -->
    <v-sidebar @leftSize="changeSize"></v-sidebar>
    <div class="right-wrapper clearfix"
      :style="{'margin-left':leftSize?'250px':'72px'}">
      <div class="wrapper">
        <v-rightheader></v-rightheader>
        <router-view :key='userKey'></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VTest from "@com/test";
import VHeader from "../../components/header";
import VSidebar from "../../components/sidebar";
import VRightheader from "../../components/right-header";
import ShButton from "@com/sh-ui/components/sh-button";
import ShSilder from "@com/buttons/sh_silder";
import ShEchart from "@com/sh_echart";

export default {
  name: "enter",
  data() {
    return {
      leftSize: true
    }
  },
  components: {
    VTest,
    VHeader,
    VSidebar,
    ShButton,
    ShSilder,
    ShEchart,
    VRightheader
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      userKey: 'getUserKey',
    })
  },
  created() {
    // 获取用户信息
    this.getUserInfo();

  },
  methods: {

    changeSize(size) {
      this.leftSize = size;
    },
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
  margin-left: 250px;
  padding-top: 0px;
}
</style>
