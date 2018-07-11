<template>
    <div class="app">
        <v-loading :show="loading"></v-loading>
        <div class="app-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import VLoading from "./components/loading";
import { setFontSize } from '@lib/js/mUtils';

export default {
    components: {
        VLoading
    },
    computed: {
        ...mapGetters({
            loading: "getLoading"
        }),
        player() {
            return this.$refs.videoPlayer.player;
        }
    },
    created() {
    },
    mounted() {
        setFontSize(document, window);
    },
    methods: {
        onPlayerPlay(player) {
            alert("play");
        },
        onPlayerPause(player) {
            alert("pause");
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
body {
    margin: 0;
    background: #EFEFF4;
    font-family: 'pingfang SC', 'Microsoft YaHei', '微软雅黑', 'helvetica', 'arial', 'verdana', 'tahoma', 'sans-serif';

    .clearfix:after {
        content: '.';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    input, select, textarea {
        outline: none;
    }
}
</style>
