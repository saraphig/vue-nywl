<template>
  <div class="base-title">
    建设维护中.....
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
 
  export default{
    name: 'home',
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        pageInfo: 'changePageInfo',
      })
    },
    created() {
    },
    methods: {
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
  .base-title{
  	min-height:300px;
  	font-size:36px;
  	text-align:center;
  	line-height:300px;
  	color:#888
  }
</style>
