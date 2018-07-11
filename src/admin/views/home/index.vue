<template>
  <section class="home">
    {{ homeInfo }}
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{

    name: 'home',
    computed: {
      ...mapGetters({
        homeInfo: 'getHomeInfo',
      })
    },
    created() {
    },
    methods: {
      testGet() {
        // 测试get
        this.$store.dispatch('fetchTestGet', {test:1}).then((data) => {
          //
        }, (error) => {
          //
        });
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl";
</style>
