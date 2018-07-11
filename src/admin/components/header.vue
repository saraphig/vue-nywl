<template>
  <header class="header">
    <div class="header-wrap">
      <h1><img src="" alt=""> </h1>
      <!-- <span class="notice">
        <i class="iconfont icon-tixingtianchong"></i>
        <i class="iconfont icon-dian"></i>
      </span> -->
    </div>
  </header>
</template>

<script>
    export default{
      name: 'v-header',
      methods: {
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header {
    .header-wrap {
      position: relative;
      padding: 22px 60px;
      border-bottom: 2px solid #f0f0f0;
      overflow: hidden;

      h1 {
        margin: 0;
        float: left;
        width: 146px;
        height: 24px;
        background: url(adminLogo) no-repeat;
        background-size:100% 100%;
      }
      .notice {
        position: absolute;
        top: 22px;
        right: 81px;
        :first-child {
          font-size: 20px;
          color: #b0b1b4;
        }
        :nth-child(2){
          position: absolute;
          top: -8px;
          right: -10px;
          color: #ff5560;
        }
      }
    }
  }
</style>
