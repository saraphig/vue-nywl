<template>
  <section class="page">
    {{ pageInfo }}
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    name: 'page1',
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "index.styl";
</style>
