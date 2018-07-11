<template>
  <section class="page">
    {{ pageInfo }}
   
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
 
  export default{
    name: 'home',
     
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
</style>
